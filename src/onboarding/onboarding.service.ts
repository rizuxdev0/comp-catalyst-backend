import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingChecklist, OnboardingTask } from './entities/onboarding.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingChecklist)
    private checklistRepo: Repository<OnboardingChecklist>,
    @InjectRepository(OnboardingTask)
    private taskRepo: Repository<OnboardingTask>,
  ) {}

  // ── Checklists ──
  findAllChecklists(): Promise<OnboardingChecklist[]> {
    return this.checklistRepo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async findChecklist(id: string): Promise<OnboardingChecklist> {
    const item = await this.checklistRepo.findOne({ where: { id }, relations: ['employee'] });
    if (!item) throw new NotFoundException('Checklist non trouvée');
    return item;
  }

  findByEmployee(employeeId: string): Promise<OnboardingChecklist[]> {
    return this.checklistRepo.find({ where: { employee_id: employeeId }, relations: ['employee'] });
  }

  createChecklist(data: Partial<OnboardingChecklist>): Promise<OnboardingChecklist> {
    return this.checklistRepo.save(this.checklistRepo.create(data));
  }

  async updateChecklist(id: string, data: Partial<OnboardingChecklist>): Promise<OnboardingChecklist> {
    await this.checklistRepo.update(id, data);
    return this.findChecklist(id);
  }

  async removeChecklist(id: string): Promise<void> {
    await this.checklistRepo.delete(id);
  }

  // ── Tasks ──
  findAllTasks(): Promise<OnboardingTask[]> {
    return this.taskRepo.find({ order: { sort_order: 'ASC' } });
  }

  findTasksByChecklist(checklistId: string): Promise<OnboardingTask[]> {
    return this.taskRepo.find({
      where: { checklist_id: checklistId },
      order: { sort_order: 'ASC' },
    });
  }

  // ── Employee Onboarding ──
  findAllEmployeeOnboarding(): Promise<OnboardingChecklist[]> {
    return this.checklistRepo.find({ order: { created_at: 'DESC' }, relations: ['employee'] });
  }

  async startOnboarding(data: { employee_id: string; title?: string }): Promise<OnboardingChecklist> {
    const checklist = this.checklistRepo.create({
      employee_id: data.employee_id,
      title: data.title || 'Onboarding',
      status: 'in_progress',
      progress_percentage: 0,
    });
    return this.checklistRepo.save(checklist);
  }

  createTask(data: Partial<OnboardingTask>): Promise<OnboardingTask> {
    return this.taskRepo.save(this.taskRepo.create(data));
  }

  async completeTask(id: string, userId: string): Promise<OnboardingTask> {
    await this.taskRepo.update(id, {
      is_completed: true,
      completed_at: new Date(),
      completed_by: userId,
    });
    const task = await this.taskRepo.findOne({ where: { id } });
    // Recalculate checklist progress
    const allTasks = await this.taskRepo.find({ where: { checklist_id: task.checklist_id } });
    const done = allTasks.filter(t => t.is_completed).length;
    const progress = Math.round((done / allTasks.length) * 100);
    const checklistStatus = progress === 100 ? 'completed' : 'in_progress';
    await this.checklistRepo.update(task.checklist_id, {
      progress_percentage: progress,
      status: checklistStatus,
    });
    return task;
  }

  async updateTask(id: string, data: Partial<OnboardingTask>): Promise<OnboardingTask> {
    await this.taskRepo.update(id, data);
    return this.taskRepo.findOne({ where: { id } });
  }

  async removeTask(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
