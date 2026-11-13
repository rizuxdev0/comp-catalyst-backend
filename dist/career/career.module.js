"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const career_history_entity_1 = require("./entities/career-history.entity");
const career_service_1 = require("./career.service");
const career_controller_1 = require("./career.controller");
const audit_module_1 = require("../audit/audit.module");
let CareerModule = class CareerModule {
};
exports.CareerModule = CareerModule;
exports.CareerModule = CareerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([career_history_entity_1.CareerHistory]),
            audit_module_1.AuditModule
        ],
        controllers: [career_controller_1.CareerController],
        providers: [career_service_1.CareerService],
        exports: [career_service_1.CareerService],
    })
], CareerModule);
//# sourceMappingURL=career.module.js.map