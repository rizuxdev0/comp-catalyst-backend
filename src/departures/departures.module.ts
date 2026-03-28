import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departure } from './entities/departure.entity';
import { DeparturesService } from './departures.service';
import { DeparturesController } from './departures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Departure])],
  controllers: [DeparturesController],
  providers: [DeparturesService],
  exports: [DeparturesService],
})
export class DeparturesModule {}
