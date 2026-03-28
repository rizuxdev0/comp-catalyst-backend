import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TrainingCatalogService } from './training-catalog.service';

@ApiTags('training-catalog')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class TrainingCatalogController {
  constructor(private readonly svc: TrainingCatalogService) {}

  // ======= CATALOG =======
  @Get('training-catalog')
  @ApiOperation({ summary: 'List training catalog' })
  getCatalog() { return this.svc.findAllCatalog(); }

  @Post('training-catalog')
  createCatalog(@Body() data: any) { return this.svc.createCatalog(data); }

  @Patch('training-catalog/:id')
  updateCatalog(@Param('id') id: string, @Body() data: any) { return this.svc.updateCatalog(id, data); }

  @Delete('training-catalog/:id')
  deleteCatalog(@Param('id') id: string) { return this.svc.deleteCatalog(id); }

  // ======= SKILLS =======
  @Get('skills')
  getSkills() { return this.svc.findAllSkills(); }

  @Post('skills')
  createSkill(@Body() data: any) { return this.svc.createSkill(data); }

  @Patch('skills/:id')
  updateSkill(@Param('id') id: string, @Body() data: any) { return this.svc.updateSkill(id, data); }

  @Delete('skills/:id')
  deleteSkill(@Param('id') id: string) { return this.svc.deleteSkill(id); }

  // ======= CERTIFICATIONS =======
  @Get('certifications')
  getCertifications() { return this.svc.findAllCertifications(); }

  @Post('certifications')
  createCertification(@Body() data: any) { return this.svc.createCertification(data); }

  @Patch('certifications/:id')
  updateCertification(@Param('id') id: string, @Body() data: any) { return this.svc.updateCertification(id, data); }

  @Delete('certifications/:id')
  deleteCertification(@Param('id') id: string) { return this.svc.deleteCertification(id); }

  // ======= EMPLOYEE SKILLS =======
  @Get('employee-skills')
  getEmployeeSkills() { return this.svc.findAllEmployeeSkills(); }

  @Post('employee-skills')
  createEmployeeSkill(@Body() data: any) { return this.svc.createEmployeeSkill(data); }

  // ======= EMPLOYEE CERTIFICATIONS =======
  @Get('employee-certifications')
  getEmployeeCertifications() { return this.svc.findAllEmployeeCertifications(); }

  @Post('employee-certifications')
  createEmployeeCertification(@Body() data: any) { return this.svc.createEmployeeCertification(data); }

  // ======= DEVELOPMENT PLANS =======
  @Get('development-plans')
  getDevelopmentPlans() { return this.svc.findAllDevelopmentPlans(); }

  @Post('development-plans')
  createDevelopmentPlan(@Body() data: any) { return this.svc.createDevelopmentPlan(data); }

  // ======= TRAINING EVALUATIONS =======
  @Get('training-evaluations')
  getTrainingEvaluations() { return this.svc.findAllTrainingEvaluations(); }

  @Post('training-evaluations')
  createTrainingEvaluation(@Body() data: any) { return this.svc.createTrainingEvaluation(data); }
}
