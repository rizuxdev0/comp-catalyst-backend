"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainings_service_1 = require("./trainings.service");
const trainings_controller_1 = require("./trainings.controller");
const training_entity_1 = require("./entities/training.entity");
const training_enrollment_entity_1 = require("./entities/training-enrollment.entity");
const training_budget_entity_1 = require("./entities/training-budget.entity");
const training_catalog_entity_1 = require("./entities/training-catalog.entity");
const training_catalog_controller_1 = require("./training-catalog.controller");
const training_catalog_service_1 = require("./training-catalog.service");
let TrainingsModule = class TrainingsModule {
};
exports.TrainingsModule = TrainingsModule;
exports.TrainingsModule = TrainingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                training_entity_1.Training,
                training_enrollment_entity_1.TrainingEnrollment,
                training_budget_entity_1.TrainingBudget,
                training_catalog_entity_1.TrainingCatalogItem,
                training_catalog_entity_1.Skill,
                training_catalog_entity_1.Certification,
                training_catalog_entity_1.EmployeeSkill,
                training_catalog_entity_1.EmployeeCertification,
                training_catalog_entity_1.DevelopmentPlan,
                training_catalog_entity_1.TrainingEvaluation,
            ]),
        ],
        providers: [trainings_service_1.TrainingsService, training_catalog_service_1.TrainingCatalogService],
        controllers: [trainings_controller_1.TrainingsController, training_catalog_controller_1.TrainingCatalogController],
        exports: [trainings_service_1.TrainingsService, training_catalog_service_1.TrainingCatalogService],
    })
], TrainingsModule);
//# sourceMappingURL=trainings.module.js.map