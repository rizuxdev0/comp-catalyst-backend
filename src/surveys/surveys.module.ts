import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey, SurveyResponse } from './entities/survey.entity';
import { EmployeeSurvey, SuggestionBoxItem, SuggestionVote, SurveyResponseEntity } from './entities/employee-survey.entity';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { EmployeeSurveysService } from './employee-surveys.service';
import { EmployeeSurveysController } from './employee-surveys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Survey, SurveyResponse,
    EmployeeSurvey, SuggestionBoxItem, SuggestionVote, SurveyResponseEntity
  ])],
  controllers: [SurveysController, EmployeeSurveysController],
  providers: [SurveysService, EmployeeSurveysService],
  exports: [SurveysService, EmployeeSurveysService],
})
export class SurveysModule {}
