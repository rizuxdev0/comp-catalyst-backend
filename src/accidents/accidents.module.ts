import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkAccident } from './entities/work-accident.entity';
import { AccidentsService } from './accidents.service';
import { AccidentsController } from './accidents.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkAccident])],
  controllers: [AccidentsController],
  providers: [AccidentsService],
  exports: [AccidentsService],
})
export class AccidentsModule {}
