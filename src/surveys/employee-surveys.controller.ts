import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeSurveysService } from './employee-surveys.service';

@ApiTags('employee-surveys')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class EmployeeSurveysController {
  constructor(private readonly svc: EmployeeSurveysService) {}

  // ======= SURVEYS =======
  @Get('employee-surveys')
  @ApiOperation({ summary: 'List employee surveys' })
  getSurveys() { return this.svc.findAllSurveys(); }

  @Post('employee-surveys')
  createSurvey(@Body() data: any) { return this.svc.createSurvey(data); }

  @Patch('employee-surveys/:id')
  updateSurvey(@Param('id') id: string, @Body() data: any) { return this.svc.updateSurvey(id, data); }

  // ======= SUGGESTION BOX =======
  @Get('suggestion-box')
  getSuggestions() { return this.svc.findAllSuggestions(); }

  @Post('suggestion-box')
  createSuggestion(@Body() data: any) { return this.svc.createSuggestion(data); }

  @Patch('suggestion-box/:id')
  updateSuggestion(@Param('id') id: string, @Body() data: any) { return this.svc.updateSuggestion(id, data); }

  // ======= VOTES =======
  @Post('suggestion-votes')
  vote(@Body() data: { suggestion_id: string; user_id?: string; vote_type: string }, @Req() req: any) {
    const userId = data.user_id || req.user.id || req.user.userId;
    return this.svc.voteOnSuggestion(data.suggestion_id, userId, data.vote_type);
  }

  // ======= RESPONSES =======
  @Get('survey-responses')
  getResponses() { return this.svc.findAllResponses(); }

  @Post('survey-responses')
  createResponse(@Body() data: any) { return this.svc.createResponse(data); }
}
