import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashBinItem } from './entities/trash-bin.entity';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrashBinItem])],
  controllers: [TrashController],
  providers: [TrashService],
  exports: [TrashService],
})
export class TrashModule {}
