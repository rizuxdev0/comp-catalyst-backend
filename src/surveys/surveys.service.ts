import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey, SurveyResponse } from './entities/survey.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepo: Repository<Survey>,
    @InjectRepository(SurveyResponse)
    private responseRepo: Repository<SurveyResponse>,
  ) {}

  findAll(): Promise<Survey[]> {
    return this.surveyRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string): Promise<Survey> {
    const item = await this.surveyRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Sondage non trouvé');
    return item;
  }

  create(data: Partial<Survey>): Promise<Survey> {
    return this.surveyRepo.save(this.surveyRepo.create(data));
  }

  async update(id: string, data: Partial<Survey>): Promise<Survey> {
    await this.surveyRepo.update(id, data);
    return this.findOne(id);
  }

  async activate(id: string): Promise<Survey> {
    await this.surveyRepo.update(id, { status: 'active' });
    return this.findOne(id);
  }

  async close(id: string): Promise<Survey> {
    await this.surveyRepo.update(id, { status: 'closed' });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.surveyRepo.delete(id);
  }

  // Responses
  getResponses(surveyId: string): Promise<SurveyResponse[]> {
    return this.responseRepo.find({ where: { survey_id: surveyId } });
  }

  submitResponse(surveyId: string, data: Partial<SurveyResponse>): Promise<SurveyResponse> {
    return this.responseRepo.save(
      this.responseRepo.create({ ...data, survey_id: surveyId }),
    );
  }

  async getStats(surveyId: string) {
    const responses = await this.responseRepo.find({ where: { survey_id: surveyId } });
    const survey = await this.findOne(surveyId);
    return { survey, total_responses: responses.length, responses };
  }
}
