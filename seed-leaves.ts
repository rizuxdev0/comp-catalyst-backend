import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { LeavesService } from './src/leaves/leaves.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeaveType } from './src/leaves/entities/leave-type.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const typeRepo = app.get(getRepositoryToken(LeaveType));

  const defaultTypes = [
    { code: 'PAID', name: 'Congés Payés', defaultDays: 25, isPaid: true, isActive: true },
    { code: 'SICK', name: 'Maladie', defaultDays: 0, isPaid: true, requiresJustification: true, isActive: true },
    { code: 'MATERNITY', name: 'Maternité', defaultDays: 90, isPaid: true, requiresJustification: true, isActive: true },
    { code: 'PATERNITY', name: 'Paternité', defaultDays: 10, isPaid: true, requiresJustification: true, isActive: true },
    { code: 'UNPAID', name: 'Sans Solde', defaultDays: 0, isPaid: false, isActive: true },
  ];

  console.log('🌱 Seeding leave types...');
  for (const type of defaultTypes) {
    const exists = await typeRepo.findOne({ where: { code: type.code } });
    if (!exists) {
      console.log(`Creating leave type: ${type.name}`);
      await typeRepo.save(typeRepo.create(type));
    } else {
      console.log(`Leave type ${type.code} already exists.`);
    }
  }
  
  console.log('✅ Seeding completed.');
  await app.close();
}

bootstrap().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
