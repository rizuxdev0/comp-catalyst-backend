"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeparturesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departure_entity_1 = require("./entities/departure.entity");
const departures_service_1 = require("./departures.service");
const departures_controller_1 = require("./departures.controller");
let DeparturesModule = class DeparturesModule {
};
exports.DeparturesModule = DeparturesModule;
exports.DeparturesModule = DeparturesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([departure_entity_1.Departure])],
        controllers: [departures_controller_1.DeparturesController],
        providers: [departures_service_1.DeparturesService],
        exports: [departures_service_1.DeparturesService],
    })
], DeparturesModule);
//# sourceMappingURL=departures.module.js.map