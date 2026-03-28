"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingCatalogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const training_catalog_entity_1 = require("./entities/training-catalog.entity");
let TrainingCatalogService = class TrainingCatalogService {
    constructor(catalogRepo, skillRepo, certRepo, empSkillRepo, empCertRepo, devPlanRepo, evalRepo) {
        this.catalogRepo = catalogRepo;
        this.skillRepo = skillRepo;
        this.certRepo = certRepo;
        this.empSkillRepo = empSkillRepo;
        this.empCertRepo = empCertRepo;
        this.devPlanRepo = devPlanRepo;
        this.evalRepo = evalRepo;
    }
    findAllCatalog() { return this.catalogRepo.find({ order: { name: 'ASC' } }); }
    createCatalog(data) { return this.catalogRepo.save(this.catalogRepo.create(data)); }
    updateCatalog(id, data) { return this.catalogRepo.update(id, data).then(() => this.catalogRepo.findOneBy({ id })); }
    deleteCatalog(id) { return this.catalogRepo.delete(id); }
    findAllSkills() { return this.skillRepo.find({ order: { name: 'ASC' } }); }
    createSkill(data) { return this.skillRepo.save(this.skillRepo.create(data)); }
    updateSkill(id, data) { return this.skillRepo.update(id, data).then(() => this.skillRepo.findOneBy({ id })); }
    deleteSkill(id) { return this.skillRepo.delete(id); }
    findAllCertifications() { return this.certRepo.find({ order: { name: 'ASC' } }); }
    createCertification(data) { return this.certRepo.save(this.certRepo.create(data)); }
    updateCertification(id, data) { return this.certRepo.update(id, data).then(() => this.certRepo.findOneBy({ id })); }
    deleteCertification(id) { return this.certRepo.delete(id); }
    findAllEmployeeSkills() { return this.empSkillRepo.find(); }
    createEmployeeSkill(data) { return this.empSkillRepo.save(this.empSkillRepo.create(data)); }
    findAllEmployeeCertifications() { return this.empCertRepo.find(); }
    createEmployeeCertification(data) { return this.empCertRepo.save(this.empCertRepo.create(data)); }
    findAllDevelopmentPlans() { return this.devPlanRepo.find({ order: { created_at: 'DESC' } }); }
    createDevelopmentPlan(data) { return this.devPlanRepo.save(this.devPlanRepo.create(data)); }
    findAllTrainingEvaluations() { return this.evalRepo.find(); }
    createTrainingEvaluation(data) { return this.evalRepo.save(this.evalRepo.create(data)); }
};
exports.TrainingCatalogService = TrainingCatalogService;
exports.TrainingCatalogService = TrainingCatalogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.TrainingCatalogItem)),
    __param(1, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.Certification)),
    __param(3, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.EmployeeSkill)),
    __param(4, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.EmployeeCertification)),
    __param(5, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.DevelopmentPlan)),
    __param(6, (0, typeorm_1.InjectRepository)(training_catalog_entity_1.TrainingEvaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TrainingCatalogService);
//# sourceMappingURL=training-catalog.service.js.map