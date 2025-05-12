import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.usersRepository.findOne(options);
  }

  async update(id: number, user: User): Promise<User | null> {
    await this.usersRepository.update(id, user);
    const options: FindOneOptions<User> = { where: { id } };
    return this.usersRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
