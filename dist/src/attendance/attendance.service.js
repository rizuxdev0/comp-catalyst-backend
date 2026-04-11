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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_record_entity_1 = require("./entities/attendance-record.entity");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }
    async getAttendanceSummary(employeeId, month, year, contractHours, baseSalary) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const records = await this.attendanceRepo.find({
            where: {
                employeeId,
                date: (0, typeorm_2.Between)(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]),
            },
        });
        const workingDaysInMonth = 22;
        const theoreticalHours = (contractHours / 5) * workingDaysInMonth;
        let presentDays = 0;
        let absentDays = 0;
        let unjustifiedAbsentDays = 0;
        let lateDays = 0;
        let totalHoursWorked = 0;
        records.forEach(r => {
            const status = (r.status || 'absent').toLowerCase();
            if (status === 'present' || status === 'remote') {
                presentDays++;
            }
            else if (status === 'half_day') {
                presentDays += 0.5;
                unjustifiedAbsentDays += 0.5;
            }
            else if (status === 'absent') {
                absentDays++;
                unjustifiedAbsentDays++;
            }
            else if (status === 'late') {
                presentDays++;
                lateDays++;
            }
            totalHoursWorked += Number(r.hoursWorked || 0);
        });
        const missingHours = Math.max(0, theoreticalHours - totalHoursWorked);
        const overtimeHoursRaw = Math.max(0, totalHoursWorked - theoreticalHours);
        const weeklyContract = contractHours || 40;
        const weeklyToMonthlyRatio = 4.33;
        const monthlyThreshold1 = 48 * weeklyToMonthlyRatio;
        const monthlyThreshold2 = 56 * weeklyToMonthlyRatio;
        let tier1Hours = 0;
        let tier2Hours = 0;
        let tier3Hours = 0;
        if (totalHoursWorked > theoreticalHours) {
            if (totalHoursWorked <= monthlyThreshold1) {
                tier1Hours = totalHoursWorked - theoreticalHours;
            }
            else if (totalHoursWorked <= monthlyThreshold2) {
                tier1Hours = monthlyThreshold1 - theoreticalHours;
                tier2Hours = totalHoursWorked - monthlyThreshold1;
            }
            else {
                tier1Hours = monthlyThreshold1 - theoreticalHours;
                tier2Hours = monthlyThreshold2 - monthlyThreshold1;
                tier3Hours = totalHoursWorked - monthlyThreshold2;
            }
        }
        const hourlyRate = baseSalary / (weeklyContract * weeklyToMonthlyRatio);
        const overtimeAmount = (tier1Hours * hourlyRate * 1.25) +
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_record_entity_1.AttendanceRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map