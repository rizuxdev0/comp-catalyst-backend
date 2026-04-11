import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AttendanceRecord } from './entities/attendance-record.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepo: Repository<AttendanceRecord>,
  ) {}

  async getAttendanceSummary(employeeId: string, month: number, year: number, contractHours: number, baseSalary: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await this.attendanceRepo.find({
      where: {
        employeeId,
        date: Between(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        ),
      },
    });

    const workingDaysInMonth = 22; // Approximation par défaut (à peaufiner)
    const theoreticalHours = (contractHours / 5) * workingDaysInMonth; // Heures hebdo / 5 * jrs ouvrés
    
    let presentDays = 0;
    let absentDays = 0;
    let unjustifiedAbsentDays = 0;
    let lateDays = 0;
    let totalHoursWorked = 0;

    records.forEach(r => {
      const status = (r.status || 'absent').toLowerCase();
      if (status === 'present' || status === 'remote') {
        presentDays++;
      } else if (status === 'half_day') {
        presentDays += 0.5;
        unjustifiedAbsentDays += 0.5;
      } else if (status === 'absent') {
        absentDays++;
        unjustifiedAbsentDays++;
      } else if (status === 'late') {
        presentDays++;
        lateDays++;
      }
      totalHoursWorked += Number(r.hoursWorked || 0);
    });

    const missingHours = Math.max(0, theoreticalHours - totalHoursWorked);
    const overtimeHoursRaw = Math.max(0, totalHoursWorked - theoreticalHours);

    // Ventilation heures locales Togo (selon config: 40h standard)
    // 41-48h => +20%, 49-56h => +40%, >56h => +50%
    const weeklyContract = contractHours || 40;
    const weeklyToMonthlyRatio = 4.33; // semaines moyennes par mois
    
    const monthlyThreshold1 = 48 * weeklyToMonthlyRatio; 
    const monthlyThreshold2 = 56 * weeklyToMonthlyRatio;

    let tier1Hours = 0; // <= 48
    let tier2Hours = 0; // <= 56
    let tier3Hours = 0; // > 56

    if (totalHoursWorked > theoreticalHours) {
      if (totalHoursWorked <= monthlyThreshold1) {
        tier1Hours = totalHoursWorked - theoreticalHours;
      } else if (totalHoursWorked <= monthlyThreshold2) {
        tier1Hours = monthlyThreshold1 - theoreticalHours;
        tier2Hours = totalHoursWorked - monthlyThreshold1;
      } else {
        tier1Hours = monthlyThreshold1 - theoreticalHours;
        tier2Hours = monthlyThreshold2 - monthlyThreshold1;
        tier3Hours = totalHoursWorked - monthlyThreshold2;
      }
    }

    const hourlyRate = baseSalary / (weeklyContract * weeklyToMonthlyRatio);
    // Taux majorations togolaises : x1.25, x1.50, x2.00 (valeurs par défaut)
    const overtimeAmount = 
      (tier1Hours * hourlyRate * 1.25) +
      (tier2Hours * hourlyRate * 1.50) +
      (tier3Hours * hourlyRate * 2.00);

    const deductionPerDay = baseSalary / 30;
    const estimatedAbsenceDeduction = unjustifiedAbsentDays * deductionPerDay;

    return {
      presentDays,
      unjustifiedAbsentDays,
      lateDays,
      totalHoursWorked,
      theoreticalHours,
      missingHours,
      overtimeHours: overtimeHoursRaw,
      overtimeBreakdown: [
        { label: 'Majorées 20-25%', hours: tier1Hours },
        { label: 'Majorées 40-50%', hours: tier2Hours },
        { label: 'Majorées 50-100%', hours: tier3Hours },
      ].filter(t => t.hours > 0),
      estimatedOvertimeAmount: Math.round(overtimeAmount),
      estimatedAbsenceDeduction: Math.round(estimatedAbsenceDeduction),
      workingDaysInMonth,
    };
  }
}
