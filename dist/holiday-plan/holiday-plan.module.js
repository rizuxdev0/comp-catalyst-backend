"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayPlanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const holiday_plan_entity_1 = require("./entities/holiday-plan.entity");
const holiday_plan_service_1 = require("./holiday-plan.service");
const holiday_plan_controller_1 = require("./holiday-plan.controller");
const employees_module_1 = require("../employees/employees.module");
const audit_module_1 = require("../audit/audit.module");
const employee_entity_1 = require("../employees/entities/employee.entity");
let HolidayPlanModule = class HolidayPlanModule {
};
exports.HolidayPlanModule = HolidayPlanModule;
exports.HolidayPlanModule = HolidayPlanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([holiday_plan_entity_1.HolidayPlan, employee_entity_1.Employee]),
            employees_module_1.EmployeesModule,
            audit_module_1.AuditModule
        ],
        controllers: [holiday_plan_controller_1.HolidayPlanController],
        providers: [holiday_plan_service_1.HolidayPlanService],
        exports: [holiday_plan_service_1.HolidayPlanService],
    })
], HolidayPlanModule);
//# sourceMappingURL=holiday-plan.module.js.map