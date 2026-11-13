"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const career_history_entity_1 = require("./entities/career-history.entity");
const hr_document_entity_1 = require("./entities/hr-document.entity");
const staff_delegate_entity_1 = require("./entities/staff-delegate.entity");
const employee_update_request_entity_1 = require("./entities/employee-update-request.entity");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const staff_delegates_service_1 = require("./staff-delegates.service");
const staff_delegates_controller_1 = require("./staff-delegates.controller");
const departments_module_1 = require("../departments/departments.module");
const hr_documents_module_1 = require("../hr-documents/hr-documents.module");
const audit_module_1 = require("../audit/audit.module");
const notifications_module_1 = require("../notifications/notifications.module");
const department_entity_1 = require("../departments/entities/department.entity");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                employee_entity_1.Employee,
                career_history_entity_1.CareerHistory,
                hr_document_entity_1.HRDocument,
                staff_delegate_entity_1.StaffDelegate,
                staff_delegate_entity_1.DelegateSetting,
                employee_update_request_entity_1.EmployeeUpdateRequest,
                department_entity_1.Department
            ]),
            (0, common_1.forwardRef)(() => departments_module_1.DepartmentsModule),
            (0, common_1.forwardRef)(() => hr_documents_module_1.HrDocumentsModule),
            audit_module_1.AuditModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [employees_controller_1.EmployeesController, staff_delegates_controller_1.StaffDelegatesController],
        providers: [employees_service_1.EmployeesService, staff_delegates_service_1.StaffDelegatesService],
        exports: [employees_service_1.EmployeesService, staff_delegates_service_1.StaffDelegatesService],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map