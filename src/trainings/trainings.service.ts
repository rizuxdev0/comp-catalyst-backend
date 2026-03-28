import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { TrainingEnrollment } from './entities/training-enrollment.entity';
import { TrainingBudget } from './entities/training-budget.entity';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    @InjectRepository(TrainingEnrollment)
    private enrollmentRepository: Repository<TrainingEnrollment>,
    @InjectRepository(TrainingBudget)
    private budgetRepository: Repository<TrainingBudget>,
  ) {}

  async findAllTrainings(): Promise<Training[]> {
    return this.trainingRepository.find({ order: { startDate: 'ASC' } });
  }

  async findOneTraining(id: string): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id }, relations: ['enrollments'] });
    if (!training) throw new NotFoundException('Training not found');
    return training;
  }

  async createTraining(data: Partial<Training>): Promise<Training> {
    const training = this.trainingRepository.create(data);
    return this.trainingRepository.save(training);
  }

  async updateTraining(id: string, data: any): Promise<Training> {
    await this.trainingRepository.update(id, data);
    return this.findOneTraining(id);
  }

  async findAllEnrollments(): Promise<TrainingEnrollment[]> {
    return this.enrollmentRepository.find({ order: { enrolledAt: 'DESC' }, relations: ['training', 'employee'] });
  }

  async enrollEmployees(trainingId: string, employeeIds: string[]): Promise<TrainingEnrollment[]> {
    const enrollments = employeeIds.map(employeeId => this.enrollmentRepository.create({
      trainingId,
      employeeId,
      status: 'enrolled',
      enrolledAt: new Date(),
    }));
    return this.enrollmentRepository.save(enrollments);
  }

  async completeEnrollment(id: string, certificationUrl?: string): Promise<TrainingEnrollment> {
    await this.enrollmentRepository.update(id, { 
      status: 'completed', 
      completedAt: new Date(),
      certificationUrl,
    });
    return this.enrollmentRepository.findOne({ where: { id } });
  }

  async cancelEnrollment(id: string): Promise<void> {
    await this.enrollmentRepository.delete(id);
  }

  async findBudgets(): Promise<TrainingBudget[]> {
    return this.budgetRepository.find({ order: { year: 'DESC' } });
  }
}
