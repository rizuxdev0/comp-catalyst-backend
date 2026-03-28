import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting, RecruitmentStatus } from './entities/job-posting.entity';
import { JobApplication, ApplicationStatus } from './entities/job-application.entity';
import { TalentPool } from './entities/talent-pool.entity';
import { CandidateEvaluation } from './entities/candidate-evaluation.entity';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(JobPosting)
    private postingRepository: Repository<JobPosting>,
    @InjectRepository(JobApplication)
    private applicationRepository: Repository<JobApplication>,
    @InjectRepository(TalentPool)
    private talentPoolRepository: Repository<TalentPool>,
    @InjectRepository(CandidateEvaluation)
    private evaluationRepository: Repository<CandidateEvaluation>,
    private eventEmitter: EventEmitter2,
  ) {}

  // Postings
  async findAllPostings(): Promise<JobPosting[]> {
    return this.postingRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOnePosting(id: string): Promise<JobPosting> {
    const posting = await this.postingRepository.findOne({ where: { id }, relations: ['applications'] });
    if (!posting) throw new NotFoundException('Job posting not found');
    return posting;
  }

  async createPosting(data: Partial<JobPosting>): Promise<JobPosting> {
    const posting = this.postingRepository.create(data);
    const saved = await this.postingRepository.save(posting);
    this.eventEmitter.emit('audit.log', {
      action: 'RECRUITMENT_POST_CREATE',
      entityType: 'job_posting',
      entityId: saved.id,
      entityName: saved.title,
      newValues: saved,
    });
    return saved;
  }

  async updatePosting(id: string, updates: Partial<JobPosting>): Promise<JobPosting> {
    await this.findOnePosting(id);
    await this.postingRepository.update(id, updates);
    return this.findOnePosting(id);
  }

  async removePosting(id: string): Promise<void> {
    const posting = await this.findOnePosting(id);
    await this.postingRepository.delete(id);
    this.eventEmitter.emit('audit.log', {
      action: 'RECRUITMENT_POST_DELETE',
      entityType: 'job_posting',
      entityId: id,
      entityName: posting.title,
    });
  }

  // Applications
  async findAllApplications(): Promise<JobApplication[]> {
    return this.applicationRepository.find({ relations: ['jobPosting'], order: { createdAt: 'DESC' } });
  }

  async findApplicationsByPosting(postingId: string): Promise<JobApplication[]> {
    return this.applicationRepository.find({ where: { jobPostingId: postingId }, order: { createdAt: 'DESC' } });
  }

  async findOneApplication(id: string): Promise<JobApplication> {
    const app = await this.applicationRepository.findOne({ where: { id }, relations: ['jobPosting'] });
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async createApplication(data: Partial<JobApplication>): Promise<JobApplication> {
    const app = this.applicationRepository.create(data);
    const saved = await this.applicationRepository.save(app);
    return this.findOneApplication(saved.id);
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<JobApplication> {
    const app = await this.findOneApplication(id);
    await this.applicationRepository.update(id, { status, notes: notes || app.notes });
    
    const updated = await this.findOneApplication(id);

    // Mock sending notification (in real system, would use a mail service)
    this.eventEmitter.emit('notification.send', {
      recipientEmail: updated.candidateEmail,
      recipientName: updated.candidateName,
      type: `recruitment_${status}`,
      details: { jobTitle: updated.jobPosting.title },
    });

    return updated;
  }

  // Talent Pool
  async findAllTalent(): Promise<TalentPool[]> {
    return this.talentPoolRepository.find({ order: { rating: 'DESC' } });
  }

  async findOneTalent(id: string): Promise<TalentPool> {
    const entry = await this.talentPoolRepository.findOne({ where: { id } });
    if (!entry) throw new NotFoundException('Talent profile not found');
    return entry;
  }

  async createTalent(data: Partial<TalentPool>): Promise<TalentPool> {
    const entry = this.talentPoolRepository.create(data);
    return this.talentPoolRepository.save(entry);
  }

  async updateTalent(id: string, updates: Partial<TalentPool>): Promise<TalentPool> {
    await this.findOneTalent(id);
    await this.talentPoolRepository.update(id, updates);
    return this.findOneTalent(id);
  }

  async removeTalent(id: string): Promise<void> {
    await this.findOneTalent(id);
    await this.talentPoolRepository.delete(id);
  }

  // Evaluations
  async createEvaluation(data: Partial<CandidateEvaluation>): Promise<CandidateEvaluation> {
    const evaluation = this.evaluationRepository.create(data);
    const saved = await this.evaluationRepository.save(evaluation);
    
    // Update Application average score
    const appId = evaluation.applicationId;
    const evals = await this.evaluationRepository.find({ where: { applicationId: appId } });
    const avgScore = evals.reduce((sum, e) => sum + e.overallScore, 0) / evals.length;
    
    await this.applicationRepository.update(appId, { score: Math.round(avgScore * 10) / 10 });
    
    return saved;
  }

  async findAllEvaluations(): Promise<CandidateEvaluation[]> {
    return this.evaluationRepository.find({ order: { evaluatedAt: 'DESC' } });
  }

  // AI Analysis Mock
  async analyzeCV(text: string, title?: string): Promise<any> {
    // Artificial delay to simulate processing
    await new Promise(r => setTimeout(r, 1500));
    
    // Naive mock extraction
    const hasEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    const hasPhone = text.match(/(\+?[0-9\s.-]{8,})/gi);
    
    return {
      analysis: {
        candidate_name: 'Candidat Extrait',
        candidate_email: hasEmail ? hasEmail[0] : 'email@exemple.com',
        candidate_phone: hasPhone ? hasPhone[0] : '0600000000',
        current_position: 'Développeur Fullstack',
        experience_years: 5,
        skills: ['JavaScript', 'React', 'NestJS', 'TypeORM', 'PostgreSQL'],
        compatibility_score: 85,
        compatibility_details: {
          strengths: ['Expérience pertinente', 'Compétences techniques alignées'],
          gaps: ['Anglais à confirmer'],
        },
        profile_summary: 'Profil très prometteur correspondant aux critères de l\'offre.',
        recommended_tags: ['senior', 'remote', 'valeur sûre'],
        overall_rating: 4,
      }
    };
  }
}
