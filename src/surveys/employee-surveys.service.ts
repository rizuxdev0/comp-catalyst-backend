import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey, SurveyResponse } from './entities/survey.entity';
import { EmployeeSurvey, SuggestionBoxItem, SuggestionVote, SurveyResponseEntity } from './entities/employee-survey.entity';

@Injectable()
export class EmployeeSurveysService {
  constructor(
    @InjectRepository(EmployeeSurvey) private surveyRepo: Repository<EmployeeSurvey>,
    @InjectRepository(SuggestionBoxItem) private suggestionRepo: Repository<SuggestionBoxItem>,
    @InjectRepository(SuggestionVote) private voteRepo: Repository<SuggestionVote>,
    @InjectRepository(SurveyResponseEntity) private responseRepo: Repository<SurveyResponseEntity>,
  ) {}

  // ======= SURVEYS =======
  findAllSurveys() { return this.surveyRepo.find({ order: { created_at: 'DESC' } }); }
  createSurvey(data: Partial<EmployeeSurvey>) { return this.surveyRepo.save(this.surveyRepo.create(data)); }
  async updateSurvey(id: string, data: Partial<EmployeeSurvey>) {
    await this.surveyRepo.update(id, data);
    return this.surveyRepo.findOneBy({ id });
  }

  // ======= SUGGESTION BOX =======
  findAllSuggestions() { return this.suggestionRepo.find({ order: { votes_count: 'DESC' } }); }
  createSuggestion(data: Partial<SuggestionBoxItem>) { return this.suggestionRepo.save(this.suggestionRepo.create(data)); }
  async updateSuggestion(id: string, data: Partial<SuggestionBoxItem>) {
    await this.suggestionRepo.update(id, data);
    return this.suggestionRepo.findOneBy({ id });
  }

  // ======= VOTES =======
  async voteOnSuggestion(suggestion_id: string, user_id: string, vote_type: string) {
    const existing = await this.voteRepo.findOneBy({ suggestion_id, user_id });
    if (existing) {
      if (existing.vote_type === vote_type) {
        // Remove vote
        await this.voteRepo.delete(existing.id);
        const diff = vote_type === 'up' ? -1 : 1;
        await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
        return { message: 'Vote removed' };
      } else {
        // Change vote
        await this.voteRepo.update(existing.id, { vote_type });
        const diff = vote_type === 'up' ? 2 : -2;
        await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
        return { message: 'Vote changed' };
      }
    } else {
      // New vote
      await this.voteRepo.save(this.voteRepo.create({ suggestion_id, user_id, vote_type }));
      const diff = vote_type === 'up' ? 1 : -1;
      await this.suggestionRepo.increment({ id: suggestion_id }, 'votes_count', diff);
      return { message: 'Vote added' };
    }
  }

  // ======= RESPONSES =======
  findAllResponses() { return this.responseRepo.find(); }
  createResponse(data: Partial<SurveyResponseEntity>) { return this.responseRepo.save(this.responseRepo.create(data)); }
}
