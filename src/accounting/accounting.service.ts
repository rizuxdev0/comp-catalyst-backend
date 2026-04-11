import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountingMapping, AccountingEntryType } from './entities/accounting-mapping.entity';
import { PaySlip } from '../payroll/entities/payslip.entity';

@Injectable()
export class AccountingService implements OnModuleInit {
  constructor(
    @InjectRepository(AccountingMapping)
    private mappingRepository: Repository<AccountingMapping>,
    @InjectRepository(PaySlip)
    private payslipRepository: Repository<PaySlip>,
  ) {}

  async onModuleInit() {
    const count = await this.mappingRepository.count();
    if (count === 0) {
      const defaults = [
        { rubricName: 'Salaire Brut', accountNumber: '641000', entryType: AccountingEntryType.DEBIT },
        { rubricName: 'Cotisations Salariales', accountNumber: '431000', entryType: AccountingEntryType.CREDIT },
        { rubricName: 'Cotisations Patronales', accountNumber: '645000', entryType: AccountingEntryType.DEBIT },
        { rubricName: 'Net à Payer', accountNumber: '421000', entryType: AccountingEntryType.CREDIT },
      ];
      await this.mappingRepository.save(defaults);
    }
  }

  async findAllMappings() {
    return this.mappingRepository.find({ order: { accountNumber: 'ASC' } });
  }

  async createMapping(data: Partial<AccountingMapping>) {
    const mapping = this.mappingRepository.create(data);
    return this.mappingRepository.save(mapping);
  }

  async updateMapping(id: string, data: Partial<AccountingMapping>) {
    await this.mappingRepository.update(id, data);
    return this.mappingRepository.findOne({ where: { id } });
  }

  async generateJournalEntries(month: number, year: number, establishmentId?: string) {
    const where: any = { periodMonth: month, periodYear: year };
    if (establishmentId) {
      where.establishmentId = establishmentId;
    }

    const payslips = await this.payslipRepository.find({ where });
    if (payslips.length === 0) return [];

    const mappings = await this.findAllMappings();
    // ... rest of the logic
    const totalsByRubric = {
      gross_salary: payslips.reduce((sum, p) => sum + Number(p.grossSalary), 0),
      net_salary: payslips.reduce((sum, p) => sum + Number(p.netSalary), 0),
      employee_contributions: payslips.reduce((sum, p) => sum + Number(p.totalDeductions), 0),
      employer_contributions: payslips.reduce((sum, p) => sum + Number(p.employerDetail?.reduce((s, d) => s + Number(d.amount), 0) || 0), 0),
    };

    const entries: any[] = [];
    for (const mapping of mappings) {
      const rubricKey = mapping.rubricName.toLowerCase().replace(/ /g, '_');
      const amount = (totalsByRubric as any)[rubricKey] || 0;

      if (amount > 0) {
        entries.push({
          date: new Date(year, month, 0).toISOString().split('T')[0],
          accountNumber: mapping.accountNumber,
          accountName: mapping.accountName || mapping.rubricName,
          debit: mapping.entryType === AccountingEntryType.DEBIT ? amount : 0,
          credit: mapping.entryType === AccountingEntryType.CREDIT ? amount : 0,
          label: `Paie ${month}/${year}${establishmentId ? ' (Est. ' + establishmentId.slice(0, 8) + ')' : ''} - ${mapping.rubricName}`,
          reference: `PAY-${year}-${month}${establishmentId ? '-' + establishmentId.slice(0, 4) : ''}`,
        });
      }
    }

    return entries;
  }

  async getConsolidatedReport(month: number, year: number) {
    const payslips = await this.payslipRepository.find({
      where: { periodMonth: month, periodYear: year },
    });

    if (payslips.length === 0) return [];

    // Group by establishment
    const breakdown: any = {};
    
    for (const p of payslips) {
      const estId = p.establishmentId || 'global';
      if (!breakdown[estId]) {
        breakdown[estId] = {
          establishmentId: estId,
          grossSalary: 0,
          netSalary: 0,
          totalDeductions: 0,
          employerContributions: 0,
          count: 0
        };
      }
      
      breakdown[estId].grossSalary += Number(p.grossSalary);
      breakdown[estId].netSalary += Number(p.netSalary);
      breakdown[estId].totalDeductions += Number(p.totalDeductions);
      breakdown[estId].employerContributions += Number(p.employerDetail?.reduce((s, d) => s + Number(d.amount), 0) || 0);
      breakdown[estId].count += 1;
    }

    return Object.values(breakdown);
  }

  async exportToCSV(month: number, year: number, format: 'sage' | 'ebp' | 'generic' = 'generic', establishmentId?: string) {
    const entries = await this.generateJournalEntries(month, year, establishmentId);
    // ... rest same
    if (entries.length === 0) return '';

    let csvContent = '';
    
    if (format === 'sage') {
      csvContent = 'Journal;Date;CompteGeneral;Ref;Libelle;Debit;Credit\n';
      entries.forEach(e => {
        csvContent += `OD;${e.date.replace(/-/g, '')};${e.accountNumber};${e.reference};${e.label};${e.debit.toFixed(2)};${e.credit.toFixed(2)}\n`;
      });
    } else {
      csvContent = 'Date,Compte,Libelle,Reference,Debit,Credit\n';
      entries.forEach(e => {
        csvContent += `${e.date},${e.accountNumber},"${e.label}",${e.reference},${e.debit},${e.credit}\n`;
      });
    }

    return csvContent;
  }
}
