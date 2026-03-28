import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FleetService } from './fleet.service';
import { FleetController } from './fleet.controller';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
    ]),
  ],
  providers: [FleetService],
  controllers: [FleetController],
  exports: [FleetService],
})
export class FleetModule {}
