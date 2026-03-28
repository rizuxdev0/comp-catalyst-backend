import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InterviewsService } from './interviews.service';

@ApiTags('interviews')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly svc: InterviewsService) {}

  @Get()
  @ApiOperation({ summary: 'List interviews' })
  getInterviews() { return this.svc.findAll(); }

  @Post()
  createInterview(@Body() data: any, @Req() req: any) { 
    const userId = req.user.id || req.user.userId;
    return this.svc.create({ ...data, created_by: userId }); 
  }

  @Patch(':id')
  updateInterview(@Param('id') id: string, @Body() data: any) { return this.svc.update(id, data); }

  @Delete(':id')
  deleteInterview(@Param('id') id: string) { return this.svc.delete(id); }
}
