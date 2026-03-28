import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Employee } from '../employees/entities/employee.entity';
import { Contract } from '../contracts/entities/contract.entity';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { Department } from '../departments/entities/department.entity';
import { JobPosting } from '../recruitment/entities/job-posting.entity';
import { TalentPool } from '../recruitment/entities/talent-pool.entity';
import { TrainingCatalogItem } from '../trainings/entities/training-catalog.entity';
import { Vehicle } from '../fleet/entities/vehicle.entity';
import { Position } from '../positions/entities/position.entity';
import { LeaveRequest } from '../leaves/entities/leave-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Contract,
      HRDocument,
      Department,
      JobPosting,
      TalentPool,
      TrainingCatalogItem,
      Vehicle,
      Position,
      LeaveRequest,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

