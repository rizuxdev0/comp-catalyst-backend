import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';
import { JobApplication } from './entities/job-application.entity';
import { TalentPool } from './entities/talent-pool.entity';
import { CandidateEvaluation } from './entities/candidate-evaluation.entity';
import { Interview } from './entities/interview.entity';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    JobPosting, JobApplication, TalentPool, CandidateEvaluation, Interview
  ])],
  controllers: [RecruitmentController, InterviewsController],
  providers: [RecruitmentService, InterviewsService],
  exports: [RecruitmentService, InterviewsService],
})
export class RecruitmentModule {}
