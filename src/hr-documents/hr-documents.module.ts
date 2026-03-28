import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrDocumentsController } from './hr-documents.controller';
import { HrDocumentsService } from './hr-documents.service';
import { HRDocument } from '../employees/entities/hr-document.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HRDocument, DocumentSignature]),
    AuditModule
  ],
  controllers: [HrDocumentsController],
  providers: [HrDocumentsService],
  exports: [HrDocumentsService],
})
export class HrDocumentsModule {}
