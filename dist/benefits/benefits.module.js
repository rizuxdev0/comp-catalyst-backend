"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_benefit_entity_1 = require("./entities/employee-benefit.entity");
const benefits_service_1 = require("./benefits.service");
const benefits_controller_1 = require("./benefits.controller");
let BenefitsModule = class BenefitsModule {
};
exports.BenefitsModule = BenefitsModule;
exports.BenefitsModule = BenefitsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_benefit_entity_1.EmployeeBenefit])],
        controllers: [benefits_controller_1.BenefitsController],
        providers: [benefits_service_1.BenefitsService],
        exports: [benefits_service_1.BenefitsService],
    })
], BenefitsModule);
//# sourceMappingURL=benefits.module.js.map