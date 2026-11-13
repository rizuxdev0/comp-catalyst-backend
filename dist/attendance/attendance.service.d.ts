import { Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance-record.entity';
export declare class AttendanceService {
    private attendanceRepo;
    constructor(attendanceRepo: Repository<AttendanceRecord>);
    getAttendanceSummary(employeeId: string, month: number, year: number, contractHours: number, baseSalary: number): Promise<{
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
    findAllRecords(query: {
        month?: string;
        startDate?: string;
        endDate?: string;
        employeeId?: string;
        departmentId?: string;
        status?: string;
    }): Promise<AttendanceRecord[]>;
    createRecord(data: any): Promise<AttendanceRecord>;
    updateRecord(id: string, data: any): Promise<AttendanceRecord>;
    deleteRecord(id: string): Promise<{
        success: boolean;
    }>;
}
