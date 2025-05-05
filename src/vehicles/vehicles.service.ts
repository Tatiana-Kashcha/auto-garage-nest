import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm'; // Import FindOneOptions
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle | null> {
    const options: FindOneOptions<Vehicle> = { where: { id } }; // Construct FindOneOptions
    return this.vehicleRepository.findOne(options);
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleRepository.save(vehicle);
  }

  async update(id: number, vehicle: Vehicle): Promise<Vehicle | null> {
    await this.vehicleRepository.update(id, vehicle);
    const options: FindOneOptions<Vehicle> = { where: { id } };
    return this.vehicleRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
