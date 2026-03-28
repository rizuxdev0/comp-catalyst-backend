import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAssistance } from './entities/medical-assistance.entity';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalAssistance])],
  controllers: [MedicalController],
  providers: [MedicalService],
  exports: [MedicalService],
})
export class MedicalModule {}
