import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { Training } from './entities/training.entity';
import { TrainingEnrollment } from './entities/training-enrollment.entity';
import { TrainingBudget } from './entities/training-budget.entity';
import {
  TrainingCatalogItem, Skill, Certification,
  EmployeeSkill, EmployeeCertification,
  DevelopmentPlan, TrainingEvaluation,
} from './entities/training-catalog.entity';
import { TrainingCatalogController } from './training-catalog.controller';
import { TrainingCatalogService } from './training-catalog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Training,
      TrainingEnrollment,
      TrainingBudget,
      TrainingCatalogItem,
      Skill,
      Certification,
      EmployeeSkill,
      EmployeeCertification,
      DevelopmentPlan,
      TrainingEvaluation,
    ]),
  ],
  providers: [TrainingsService, TrainingCatalogService],
  controllers: [TrainingsController, TrainingCatalogController],
  exports: [TrainingsService, TrainingCatalogService],
})
export class TrainingsModule {}
