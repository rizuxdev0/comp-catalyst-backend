import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentService } from './establishments.service';
import { EstablishmentController } from './establishments.controller';
import { CompanySettings } from '../settings/entities/company-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment, CompanySettings])],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
