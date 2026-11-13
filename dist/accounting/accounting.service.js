"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accounting_mapping_entity_1 = require("./entities/accounting-mapping.entity");
const payslip_entity_1 = require("../payroll/entities/payslip.entity");
let AccountingService = class AccountingService {
    constructor(mappingRepository, payslipRepository) {
        this.mappingRepository = mappingRepository;
        this.payslipRepository = payslipRepository;
    }
    async onModuleInit() {
        const count = await this.mappingRepository.count();
        if (count === 0) {
            const defaults = [
                { rubricName: 'Salaire Brut', accountNumber: '641000', entryType: accounting_mapping_entity_1.AccountingEntryType.DEBIT },
                { rubricName: 'Cotisations Salariales', accountNumber: '431000', entryType: accounting_mapping_entity_1.AccountingEntryType.CREDIT },
                { rubricName: 'Cotisations Patronales', accountNumber: '645000', entryType: accounting_mapping_entity_1.AccountingEntryType.DEBIT },
                { rubricName: 'Net à Payer', accountNumber: '421000', entryType: accounting_mapping_entity_1.AccountingEntryType.CREDIT },
            ];
            await this.mappingRepository.save(defaults);
        }
    }
    async findAllMappings() {
        return this.mappingRepository.find({ order: { accountNumber: 'ASC' } });
    }
    async createMapping(data) {
        const mapping = this.mappingRepository.create(data);
        return this.mappingRepository.save(mapping);
    }
    async updateMapping(id, data) {
        await this.mappingRepository.update(id, data);
        return this.mappingRepository.findOne({ where: { id } });
    }
    async generateJournalEntries(month, year, establishmentId) {
        const where = { periodMonth: month, periodYear: year };
        if (establishmentId) {
            where.establishmentId = establishmentId;
        }
        const payslips = await this.payslipRepository.find({ where });
        if (payslips.length === 0)
            return [];
        const mappings = await this.findAllMappings();
        const totalsByRubric = {
            gross_salary: payslips.reduce((sum, p) => sum + Number(p.grossSalary), 0),
            net_salary: payslips.reduce((sum, p) => sum + Number(p.netSalary), 0),
            employee_contributions: payslips.reduce((sum, p) => sum + Number(p.totalDeductions), 0),
            employer_contributions: payslips.reduce((sum, p) => sum + Number(p.employerDetail?.reduce((s, d) => s + Number(d.amount), 0) || 0), 0),
        };
        const entries = [];
        for (const mapping of mappings) {
            const rubricKey = mapping.rubricName.toLowerCase().replace(/ /g, '_');
            const amount = totalsByRubric[rubricKey] || 0;
            if (amount > 0) {
                entries.push({
                    date: new Date(year, month, 0).toISOString().split('T')[0],
                    accountNumber: mapping.accountNumber,
                    accountName: mapping.accountName || mapping.rubricName,
                    debit: mapping.entryType === accounting_mapping_entity_1.AccountingEntryType.DEBIT ? amount : 0,
                    credit: mapping.entryType === accounting_mapping_entity_1.AccountingEntryType.CREDIT ? amount : 0,
                    label: `Paie ${month}/${year}${establishmentId ? ' (Est. ' + establishmentId.slice(0, 8) + ')' : ''} - ${mapping.rubricName}`,
                    reference: `PAY-${year}-${month}${establishmentId ? '-' + establishmentId.slice(0, 4) : ''}`,
                });
            }
        }
        return entries;
    }
    async getConsolidatedReport(month, year) {
        const payslips = await this.payslipRepository.find({
            where: { periodMonth: month, periodYear: year },
        });
        if (payslips.length === 0)
            return [];
        const breakdown = {};
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
    async exportToCSV(month, year, format = 'generic', establishmentId) {
        const entries = await this.generateJournalEntries(month, year, establishmentId);
        if (entries.length === 0)
            return '';
        let csvContent = '';
        if (format === 'sage') {
            csvContent = 'Journal;Date;CompteGeneral;Ref;Libelle;Debit;Credit\n';
            entries.forEach(e => {
                csvContent += `OD;${e.date.replace(/-/g, '')};${e.accountNumber};${e.reference};${e.label};${e.debit.toFixed(2)};${e.credit.toFixed(2)}\n`;
            });
        }
        else {
            csvContent = 'Date,Compte,Libelle,Reference,Debit,Credit\n';
            entries.forEach(e => {
                csvContent += `${e.date},${e.accountNumber},"${e.label}",${e.reference},${e.debit},${e.credit}\n`;
            });
        }
        return csvContent;
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accounting_mapping_entity_1.AccountingMapping)),
    __param(1, (0, typeorm_1.InjectRepository)(payslip_entity_1.PaySlip)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map