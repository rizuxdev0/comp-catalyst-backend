import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentStatus } from './entities/job-posting.entity';
import { JobApplication, ApplicationStatus } from './entities/job-application.entity';
import { TalentPool } from './entities/talent-pool.entity';
import { CandidateEvaluation } from './entities/candidate-evaluation.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AppRole } from '../users/entities/user-role.entity';

@ApiTags('recruitment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  // Postings
  @Get('postings')
  @ApiOperation({ summary: 'Get all job postings' })
  async findAllPostings() {
    return this.recruitmentService.findAllPostings();
  }

  @Get('postings/:id')
  @ApiOperation({ summary: 'Get job posting by id' })
  async findOnePosting(@Param('id') id: string) {
    return this.recruitmentService.findOnePosting(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('postings')
  @ApiOperation({ summary: 'Create job posting' })
  async createPosting(@Body() data: any) {
    return this.recruitmentService.createPosting(data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('postings/:id')
  @ApiOperation({ summary: 'Update job posting' })
  async updatePosting(@Param('id') id: string, @Body() data: any) {
    return this.recruitmentService.updatePosting(id, data);
  }

  @Roles(AppRole.ADMIN)
  @Delete('postings/:id')
  @ApiOperation({ summary: 'Delete job posting' })
  async removePosting(@Param('id') id: string) {
    return this.recruitmentService.removePosting(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('postings/:id/publish')
  @ApiOperation({ summary: 'Publish job posting to job boards' })
  async publishToJobBoards(@Param('id') id: string, @Body('platforms') platforms: string[]) {
    return this.recruitmentService.publishToJobBoards(id, platforms || ['LinkedIn', 'Indeed']);
  }

  // Applications
  @Get('applications')
  @ApiOperation({ summary: 'Get all job applications' })
  async findAllApplications(@Query('postingId') postingId?: string) {
    if (postingId) return this.recruitmentService.findApplicationsByPosting(postingId);
    return this.recruitmentService.findAllApplications();
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get application by id' })
  async findOneApplication(@Param('id') id: string) {
    return this.recruitmentService.findOneApplication(id);
  }

  @Post('applications')
  @ApiOperation({ summary: 'Submit job application' })
  async createApplication(@Body() data: any) {
    return this.recruitmentService.createApplication(data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update job application status' })
  async updateApplicationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('notes') notes?: string,
  ) {
    return this.recruitmentService.updateApplicationStatus(id, status, notes);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('applications/:id/send-email')
  @ApiOperation({ summary: 'Send automated email to candidate' })
  async sendApplicationEmail(
    @Param('id') id: string,
    @Body('subject') subject: string,
    @Body('body') body: string,
  ) {
    return this.recruitmentService.sendApplicationEmail(id, subject, body);
  }

  // Talent Pool
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('talent-pool')
  @ApiOperation({ summary: 'Get all talent entries' })
  async findAllTalent() {
    return this.recruitmentService.findAllTalent();
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('talent-pool/:id')
  @ApiOperation({ summary: 'Get talent entry by id' })
  async findOneTalent(@Param('id') id: string) {
    return this.recruitmentService.findOneTalent(id);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('talent-pool')
  @ApiOperation({ summary: 'Create talent entry' })
  async createTalent(@Body() data: any) {
    return this.recruitmentService.createTalent(data);
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Patch('talent-pool/:id')
  @ApiOperation({ summary: 'Update talent entry' })
  async updateTalent(@Param('id') id: string, @Body() data: any) {
    return this.recruitmentService.updateTalent(id, data);
  }

  @Roles(AppRole.ADMIN)
  @Delete('talent-pool/:id')
  @ApiOperation({ summary: 'Delete talent entry' })
  async removeTalent(@Param('id') id: string) {
    return this.recruitmentService.removeTalent(id);
  }

  // Evaluations
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Get('evaluations')
  @ApiOperation({ summary: 'Get all evaluations' })
  async findAllEvaluations() {
    return this.recruitmentService.findAllEvaluations();
  }

  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('evaluations')
  @ApiOperation({ summary: 'Add candidate evaluation' })
  async createEvaluation(@Body() data: any) {
    return this.recruitmentService.createEvaluation(data);
  }

  // AI Analysis
  @Roles(AppRole.ADMIN, AppRole.MANAGER)
  @Post('analyze-cv')
  @ApiOperation({ summary: 'Analyze CV text using AI' })
  async analyzeCV(@Body('cvText') text: string, @Body('jobTitle') title?: string) {
    return this.recruitmentService.analyzeCV(text, title);
  }
}
