import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Pets } from './entities/pets.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private petsRepository: Repository<Pets>,
  ) {}

  async create(pets: Pets): Promise<Pets> {
    return this.petsRepository.save(pets);
  }

  async findAll(): Promise<Pets[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pets | null> {
    const options: FindOneOptions<Pets> = { where: { id } };
    return this.petsRepository.findOne(options);
  }

  async update(id: number, pets: Pets): Promise<Pets | null> {
    await this.petsRepository.update(id, pets);
    const options: FindOneOptions<Pets> = { where: { id } };
    return this.petsRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.petsRepository.delete(id);
  }
}
