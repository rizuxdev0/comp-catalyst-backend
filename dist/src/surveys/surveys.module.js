"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveysModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("./entities/survey.entity");
const employee_survey_entity_1 = require("./entities/employee-survey.entity");
const surveys_service_1 = require("./surveys.service");
const surveys_controller_1 = require("./surveys.controller");
const employee_surveys_service_1 = require("./employee-surveys.service");
const employee_surveys_controller_1 = require("./employee-surveys.controller");
let SurveysModule = class SurveysModule {
};
exports.SurveysModule = SurveysModule;
exports.SurveysModule = SurveysModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                survey_entity_1.Survey, survey_entity_1.SurveyResponse,
                employee_survey_entity_1.EmployeeSurvey, employee_survey_entity_1.SuggestionBoxItem, employee_survey_entity_1.SuggestionVote, employee_survey_entity_1.SurveyResponseEntity
            ])],
        controllers: [surveys_controller_1.SurveysController, employee_surveys_controller_1.EmployeeSurveysController],
        providers: [surveys_service_1.SurveysService, employee_surveys_service_1.EmployeeSurveysService],
        exports: [surveys_service_1.SurveysService, employee_surveys_service_1.EmployeeSurveysService],
    })
], SurveysModule);
//# sourceMappingURL=surveys.module.js.map