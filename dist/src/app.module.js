"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const event_emitter_1 = require("@nestjs/event-emitter");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const departments_module_1 = require("./departments/departments.module");
const employees_module_1 = require("./employees/employees.module");
const contracts_module_1 = require("./contracts/contracts.module");
const leaves_module_1 = require("./leaves/leaves.module");
const settings_module_1 = require("./settings/settings.module");
const payroll_module_1 = require("./payroll/payroll.module");
const audit_module_1 = require("./audit/audit.module");
const notifications_module_1 = require("./notifications/notifications.module");
const payments_module_1 = require("./payments/payments.module");
const recruitment_module_1 = require("./recruitment/recruitment.module");
const approvals_module_1 = require("./approvals/approvals.module");
const trainings_module_1 = require("./trainings/trainings.module");
const expenses_module_1 = require("./expenses/expenses.module");
const holidays_module_1 = require("./holidays/holidays.module");
const fleet_module_1 = require("./fleet/fleet.module");
const communications_module_1 = require("./communications/communications.module");
const disciplinary_module_1 = require("./disciplinary/disciplinary.module");
const accidents_module_1 = require("./accidents/accidents.module");
const medical_module_1 = require("./medical/medical.module");
const onboarding_module_1 = require("./onboarding/onboarding.module");
const evaluations_module_1 = require("./evaluations/evaluations.module");
const career_module_1 = require("./career/career.module");
const departures_module_1 = require("./departures/departures.module");
const surveys_module_1 = require("./surveys/surveys.module");
const benefits_module_1 = require("./benefits/benefits.module");
const storage_module_1 = require("./storage/storage.module");
const banks_module_1 = require("./banks/banks.module");
const currencies_module_1 = require("./currencies/currencies.module");
const trash_module_1 = require("./common/trash.module");
const mail_module_1 = require("./mail/mail.module");
const positions_module_1 = require("./positions/positions.module");
const holiday_plan_module_1 = require("./holiday-plan/holiday-plan.module");
const hr_documents_module_1 = require("./hr-documents/hr-documents.module");
const search_module_1 = require("./search/search.module");
const announcements_module_1 = require("./announcements/announcements.module");
const attendance_module_1 = require("./attendance/attendance.module");
const accounting_module_1 = require("./accounting/accounting.module");
const establishments_module_1 = require("./establishments/establishments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DATABASE_HOST'),
                    port: config.get('DATABASE_PORT'),
                    username: config.get('DATABASE_USER'),
                    password: config.get('DATABASE_PASSWORD'),
                    database: config.get('DATABASE_NAME'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
                    synchronize: config.get('NODE_ENV') === 'development',
                    logging: config.get('NODE_ENV') === 'development',
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            departments_module_1.DepartmentsModule,
            employees_module_1.EmployeesModule,
            contracts_module_1.ContractsModule,
            leaves_module_1.LeavesModule,
            settings_module_1.SettingsModule,
            payroll_module_1.PayrollModule,
            audit_module_1.AuditModule,
            notifications_module_1.NotificationsModule,
            payments_module_1.PaymentsModule,
            recruitment_module_1.RecruitmentModule,
            approvals_module_1.ApprovalsModule,
            trainings_module_1.TrainingsModule,
            expenses_module_1.ExpensesModule,
            holidays_module_1.HolidaysModule,
            fleet_module_1.FleetModule,
            communications_module_1.CommunicationsModule,
            disciplinary_module_1.DisciplinaryModule,
            accidents_module_1.AccidentsModule,
            medical_module_1.MedicalModule,
            onboarding_module_1.OnboardingModule,
            evaluations_module_1.EvaluationsModule,
            career_module_1.CareerModule,
            departures_module_1.DeparturesModule,
            surveys_module_1.SurveysModule,
            benefits_module_1.BenefitsModule,
            storage_module_1.StorageModule,
            banks_module_1.BanksModule,
            currencies_module_1.CurrenciesModule,
            trash_module_1.TrashModule,
            mail_module_1.MailModule,
            positions_module_1.PositionsModule,
            holiday_plan_module_1.HolidayPlanModule,
            hr_documents_module_1.HrDocumentsModule,
            search_module_1.SearchModule,
            announcements_module_1.AnnouncementsModule,
            attendance_module_1.AttendanceModule,
            accounting_module_1.AccountingModule,
            establishments_module_1.EstablishmentModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map