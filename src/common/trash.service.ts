import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrashBinItem } from './entities/trash-bin.entity';

@Injectable()
export class TrashService {
  constructor(
    @InjectRepository(TrashBinItem) private trashRepo: Repository<TrashBinItem>,
  ) {}

  findAll() { return this.trashRepo.find({ where: { permanently_deleted: false }, order: { deleted_at: 'DESC' } }); }
  
  create(data: Partial<TrashBinItem>) { return this.trashRepo.save(this.trashRepo.create(data)); }
  
  async update(id: string, data: Partial<TrashBinItem>) {
    await this.trashRepo.update(id, data);
    return this.trashRepo.findOneBy({ id });
  }

  delete(id: string) { return this.trashRepo.delete(id); }
}
