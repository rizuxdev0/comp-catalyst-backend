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
    findAllRecords(month?: string, startDate?: string, endDate?: string, employeeId?: string, departmentId?: string, status?: string): Promise<import("./entities/attendance-record.entity").AttendanceRecord[]>;
    createRecord(body: any): Promise<import("./entities/attendance-record.entity").AttendanceRecord>;
    updateRecord(id: string, body: any): Promise<import("./entities/attendance-record.entity").AttendanceRecord>;
    deleteRecord(id: string): Promise<{
        success: boolean;
    }>;
}
