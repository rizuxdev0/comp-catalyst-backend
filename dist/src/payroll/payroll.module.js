"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payslip_entity_1 = require("./entities/payslip.entity");
const premium_type_entity_1 = require("./entities/premium-type.entity");
const employee_premium_entity_1 = require("./entities/employee-premium.entity");
const salary_deduction_entity_1 = require("./entities/salary-deduction.entity");
const payroll_service_1 = require("./payroll.service");
const payroll_controller_1 = require("./payroll.controller");
const employees_module_1 = require("../employees/employees.module");
const employee_entity_1 = require("../employees/entities/employee.entity");
const audit_module_1 = require("../audit/audit.module");
const company_settings_entity_1 = require("../settings/entities/company-settings.entity");
let PayrollModule = class PayrollModule {
};
exports.PayrollModule = PayrollModule;
exports.PayrollModule = PayrollModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payslip_entity_1.PaySlip, employee_entity_1.Employee, premium_type_entity_1.PremiumType, employee_premium_entity_1.EmployeePremium, salary_deduction_entity_1.SalaryDeduction, company_settings_entity_1.CompanySettings]),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
            audit_module_1.AuditModule,
        ],
        controllers: [payroll_controller_1.PayrollController],
        providers: [payroll_service_1.PayrollService],
        exports: [payroll_service_1.PayrollService],
    })
], PayrollModule);
//# sourceMappingURL=payroll.module.js.map