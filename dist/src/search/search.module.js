"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
const employee_entity_1 = require("../employees/entities/employee.entity");
const contract_entity_1 = require("../contracts/entities/contract.entity");
const hr_document_entity_1 = require("../employees/entities/hr-document.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const job_posting_entity_1 = require("../recruitment/entities/job-posting.entity");
const talent_pool_entity_1 = require("../recruitment/entities/talent-pool.entity");
const training_catalog_entity_1 = require("../trainings/entities/training-catalog.entity");
const vehicle_entity_1 = require("../fleet/entities/vehicle.entity");
const position_entity_1 = require("../positions/entities/position.entity");
const leave_request_entity_1 = require("../leaves/entities/leave-request.entity");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                employee_entity_1.Employee,
                contract_entity_1.Contract,
                hr_document_entity_1.HRDocument,
                department_entity_1.Department,
                job_posting_entity_1.JobPosting,
                talent_pool_entity_1.TalentPool,
                training_catalog_entity_1.TrainingCatalogItem,
                vehicle_entity_1.Vehicle,
                position_entity_1.Position,
                leave_request_entity_1.LeaveRequest,
            ]),
        ],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map