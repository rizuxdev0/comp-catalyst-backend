import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TrainingCatalogItem, Skill, Certification,
  EmployeeSkill, EmployeeCertification,
  DevelopmentPlan, TrainingEvaluation,
} from './entities/training-catalog.entity';

@Injectable()
export class TrainingCatalogService {
  constructor(
    @InjectRepository(TrainingCatalogItem) private catalogRepo: Repository<TrainingCatalogItem>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    @InjectRepository(Certification) private certRepo: Repository<Certification>,
    @InjectRepository(EmployeeSkill) private empSkillRepo: Repository<EmployeeSkill>,
    @InjectRepository(EmployeeCertification) private empCertRepo: Repository<EmployeeCertification>,
    @InjectRepository(DevelopmentPlan) private devPlanRepo: Repository<DevelopmentPlan>,
    @InjectRepository(TrainingEvaluation) private evalRepo: Repository<TrainingEvaluation>,
  ) {}

  // ======= CATALOG =======
  findAllCatalog() { return this.catalogRepo.find({ order: { name: 'ASC' } }); }
  createCatalog(data: Partial<TrainingCatalogItem>) { return this.catalogRepo.save(this.catalogRepo.create(data)); }
  updateCatalog(id: string, data: Partial<TrainingCatalogItem>) { return this.catalogRepo.update(id, data).then(() => this.catalogRepo.findOneBy({ id })); }
  deleteCatalog(id: string) { return this.catalogRepo.delete(id); }

  // ======= SKILLS =======
  findAllSkills() { return this.skillRepo.find({ order: { name: 'ASC' } }); }
  createSkill(data: Partial<Skill>) { return this.skillRepo.save(this.skillRepo.create(data)); }
  updateSkill(id: string, data: Partial<Skill>) { return this.skillRepo.update(id, data).then(() => this.skillRepo.findOneBy({ id })); }
  deleteSkill(id: string) { return this.skillRepo.delete(id); }

  // ======= CERTIFICATIONS =======
  findAllCertifications() { return this.certRepo.find({ order: { name: 'ASC' } }); }
  createCertification(data: Partial<Certification>) { return this.certRepo.save(this.certRepo.create(data)); }
  updateCertification(id: string, data: Partial<Certification>) { return this.certRepo.update(id, data).then(() => this.certRepo.findOneBy({ id })); }
  deleteCertification(id: string) { return this.certRepo.delete(id); }

  // ======= EMPLOYEE SKILLS =======
  findAllEmployeeSkills() { return this.empSkillRepo.find(); }
  createEmployeeSkill(data: Partial<EmployeeSkill>) { return this.empSkillRepo.save(this.empSkillRepo.create(data)); }

  // ======= EMPLOYEE CERTIFICATIONS =======
  findAllEmployeeCertifications() { return this.empCertRepo.find(); }
  createEmployeeCertification(data: Partial<EmployeeCertification>) { return this.empCertRepo.save(this.empCertRepo.create(data)); }

  // ======= DEVELOPMENT PLANS =======
  findAllDevelopmentPlans() { return this.devPlanRepo.find({ order: { created_at: 'DESC' } }); }
  createDevelopmentPlan(data: Partial<DevelopmentPlan>) { return this.devPlanRepo.save(this.devPlanRepo.create(data)); }

  // ======= TRAINING EVALUATIONS =======
  findAllTrainingEvaluations() { return this.evalRepo.find(); }
  createTrainingEvaluation(data: Partial<TrainingEvaluation>) { return this.evalRepo.save(this.evalRepo.create(data)); }
}
