import { Controller, Get, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('summary')
  getSummary(
    @Query('employeeId') employeeId: string,
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('contractHours') contractHours: string,
    @Query('baseSalary') baseSalary: string,
  ) {
    return this.attendanceService.getAttendanceSummary(
      employeeId,
      parseInt(month, 10),
      parseInt(year, 10),
      parseFloat(contractHours || '40'),
      parseFloat(baseSalary || '0'),
    );
  }
}
