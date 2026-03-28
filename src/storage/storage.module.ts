import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageController } from './storage.controller';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [StorageController],
})
export class StorageModule {}
