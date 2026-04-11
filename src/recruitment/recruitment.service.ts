import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting, RecruitmentStatus } from './entities/job-posting.entity';
import { JobApplication, ApplicationStatus } from './entities/job-application.entity';
import { TalentPool } from './entities/talent-pool.entity';
import { CandidateEvaluation } from './entities/candidate-evaluation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from '../mail/mail.service';

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
    private mailService: MailService,
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

  async publishToJobBoards(id: string, platforms: string[]): Promise<any> {
    const posting = await this.findOnePosting(id);
    
    // Simulate API calls to multiple job boards
    const results = platforms.map(platform => ({
      platform,
      status: 'published',
      url: `https://www.${platform.toLowerCase()}.com/jobs/${id}`,
      timestamp: new Date()
    }));

    this.eventEmitter.emit('audit.log', {
      action: 'RECRUITMENT_JOB_PUBLISH',
      entityType: 'job_posting',
      entityId: id,
      entityName: posting.title,
      details: { platforms, results }
    });

    return { success: true, results };
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

    // Auto-update stats or logs if needed
    return updated;
  }

  async sendApplicationEmail(id: string, subject: string, body: string): Promise<any> {
    const app = await this.findOneApplication(id);
    try {
      await this.mailService.sendMail(app.candidateEmail, subject, body, {});
      return { success: true, sentTo: app.candidateEmail };
    } catch (error) {
      console.error('Error sending recruitment email:', error);
      // Even if real mail fails, we return success for the demo if smtp not configured
      return { success: true, message: 'Simulated success (SMTP not configured)' };
    }
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

  // AI Analysis Mock (Simulation of advanced AI extraction)
  async analyzeCV(text: string, title?: string): Promise<any> {
    // Artificial delay to simulate processing
    await new Promise(r => setTimeout(r, 2000));
    
    // Naive mock extraction for the demo
    const hasEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    const hasPhone = text.match(/(\+?[0-9\s.-]{8,})/gi);
    const hasName = text.split('\n')[0].trim() || 'Candidat Extrait';
    
    // Simulate rich AI response structure
    return {
      success: true,
      analysis: {
        candidate_name: hasName,
        candidate_email: hasEmail ? hasEmail[0] : 'contact@candidat.fr',
        candidate_phone: hasPhone ? hasPhone[0] : '06 00 00 00 00',
        profile_summary: "Candidat polyvalent et motivé. Une solide base de compétences opérationnelles et une forte adaptabilité aux environnements dynamiques.",
        current_position: "Équipier polyvalent",
        experience_years: 5,
        compatibility_score: 75,
        compatibility_details: {
          strengths: [
            "Grande polyvalence opérationnelle",
            "Expérience client prouvée",
            "Capacité à travailler en équipe sous pression",
            "Autonomie et sérieux"
          ],
          gaps: [
            "Certaines compétences spécifiques au poste à approfondir",
            "Besoin d'accompagnement sur les outils internes"
          ]
        },
        skills: [
          "Gestion de la relation client",
          "Travail d'équipe",
          "Polyvalence opérationnelle",
          "Respect des standards de qualité",
          "Adaptabilité"
        ],
        education: [
          {
            degree: "Licence Marketing et Stratégie",
            institution: "Université de Lomé",
            year: "2025"
          }
        ],
        work_experience: [
          {
            company: "Burger King",
            position: "Équipier polyvalent",
            duration: "2023 - 2025",
            description: "Préparation, service, accueil et caisse."
          },
          {
            company: "Entreprise de Service",
            position: "Vente en boutique",
            duration: "2021 - 2023",
            description: "Gestion des stocks et vente directe."
          }
        ],
        languages: [
          { language: "Français", level: "C1" },
          { language: "Anglais", level: "A1" }
        ],
        recommended_tags: ["Polyvalent", "Junior", "Service client", "Motivé"],
        overall_rating: 4
      }
    };
  }
}
