import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class FleetService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['currentEmployee'] });
  }

  async findOne(id: string): Promise<Vehicle> {
    const v = await this.vehicleRepository.findOne({ where: { id }, relations: ['currentEmployee'] });
    if (!v) throw new NotFoundException('Vehicle not found');
    return v;
  }

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const v = this.vehicleRepository.create(data);
    return this.vehicleRepository.save(v);
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    await this.vehicleRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }

  async assignToEmployee(id: string, employeeId: string): Promise<Vehicle> {
    await this.vehicleRepository.update(id, {
      currentEmployeeId: employeeId,
      status: 'assigned',
      assignmentDate: new Date(),
    });
    return this.findOne(id);
  }

  async unassign(id: string): Promise<Vehicle> {
    await this.vehicleRepository.update(id, {
      currentEmployeeId: null,
      status: 'available',
      assignmentDate: null,
    });
    return this.findOne(id);
  }
}
