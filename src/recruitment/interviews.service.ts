import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './entities/interview.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview) private interviewsRepo: Repository<Interview>,
  ) {}

  findAll() { return this.interviewsRepo.find({ order: { scheduled_date: 'DESC' } }); }
  
  create(data: Partial<Interview>) { return this.interviewsRepo.save(this.interviewsRepo.create(data)); }
  
  async update(id: string, data: Partial<Interview>) {
    await this.interviewsRepo.update(id, data);
    return this.interviewsRepo.findOneBy({ id });
  }

  delete(id: string) { return this.interviewsRepo.delete(id); }
}
