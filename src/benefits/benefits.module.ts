import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBenefit } from './entities/employee-benefit.entity';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeBenefit])],
  controllers: [BenefitsController],
  providers: [BenefitsService],
  exports: [BenefitsService],
})
export class BenefitsModule {}
