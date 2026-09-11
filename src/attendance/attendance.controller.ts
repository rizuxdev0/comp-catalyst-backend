import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Obtenir le récapitulatif de présence d\'un employé' })
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

  @Get('records')
  @ApiOperation({ summary: 'Lister les enregistrements de présence' })
  findAllRecords(
    @Query('month') month?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('employeeId') employeeId?: string,
    @Query('departmentId') departmentId?: string,
    @Query('status') status?: string,
  ) {
    return this.attendanceService.findAllRecords({
      month,
      startDate,
      endDate,
      employeeId,
      departmentId,
      status,
    });
  }

  @Post('records')
  @ApiOperation({ summary: 'Créer un enregistrement de présence' })
  createRecord(@Body() body: any) {
    return this.attendanceService.createRecord(body);
  }

  @Patch('records/:id')
  @ApiOperation({ summary: 'Modifier un enregistrement de présence' })
  updateRecord(@Param('id') id: string, @Body() body: any) {
    return this.attendanceService.updateRecord(id, body);
  }

  @Delete('records/:id')
  @ApiOperation({ summary: 'Supprimer un enregistrement de présence' })
  deleteRecord(@Param('id') id: string) {
    return this.attendanceService.deleteRecord(id);
  }
}
