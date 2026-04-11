import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    getSummary(employeeId: string, month: string, year: string, contractHours: string, baseSalary: string): Promise<{
        presentDays: number;
        unjustifiedAbsentDays: number;
        lateDays: number;
        totalHoursWorked: number;
        theoreticalHours: number;
        missingHours: number;
        overtimeHours: number;
        overtimeBreakdown: {
            label: string;
            hours: number;
        }[];
        estimatedOvertimeAmount: number;
        estimatedAbsenceDeduction: number;
        workingDaysInMonth: number;
    }>;
}
