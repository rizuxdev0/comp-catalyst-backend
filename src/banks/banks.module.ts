import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  providers: [BanksService],
  controllers: [BanksController],
  exports: [BanksService],
})
export class BanksModule {}
