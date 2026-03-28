import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { ContractsModule } from './contracts/contracts.module';
import { LeavesModule } from './leaves/leaves.module';
import { SettingsModule } from './settings/settings.module';
import { PayrollModule } from './payroll/payroll.module';
import { AuditModule } from './audit/audit.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ExpensesModule } from './expenses/expenses.module';
import { HolidaysModule } from './holidays/holidays.module';
import { FleetModule } from './fleet/fleet.module';
// Nouveaux modules
import { CommunicationsModule } from './communications/communications.module';
import { DisciplinaryModule } from './disciplinary/disciplinary.module';
import { AccidentsModule } from './accidents/accidents.module';
import { MedicalModule } from './medical/medical.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { CareerModule } from './career/career.module';
import { DeparturesModule } from './departures/departures.module';
import { SurveysModule } from './surveys/surveys.module';
import { BenefitsModule } from './benefits/benefits.module';
import { StorageModule } from './storage/storage.module';
import { BanksModule } from './banks/banks.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TrashModule } from './common/trash.module';
import { MailModule } from './mail/mail.module';
import { PositionsModule } from './positions/positions.module';
import { HolidayPlanModule } from './holiday-plan/holiday-plan.module';
import { HolidayPlan } from './holiday-plan/entities/holiday-plan.entity';
import { HrDocumentsModule } from './hr-documents/hr-documents.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: config.get<string>('NODE_ENV') === 'development',
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    // Modules existants
    UsersModule,
    AuthModule,
    DepartmentsModule,
    EmployeesModule,
    ContractsModule,
    LeavesModule,
    SettingsModule,
    PayrollModule,
    AuditModule,
    NotificationsModule,
    PaymentsModule,
    RecruitmentModule,
    ApprovalsModule,
    TrainingsModule,
    ExpensesModule,
    HolidaysModule,
    FleetModule,
    // Nouveaux modules
    CommunicationsModule,
    DisciplinaryModule,
    AccidentsModule,
    MedicalModule,
    OnboardingModule,
    EvaluationsModule,
    CareerModule,
    DeparturesModule,
    SurveysModule,
    BenefitsModule,
    StorageModule,
    BanksModule,
    CurrenciesModule,
    TrashModule,
    MailModule,
    PositionsModule,
    HolidayPlanModule,
    HrDocumentsModule,
    SearchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

