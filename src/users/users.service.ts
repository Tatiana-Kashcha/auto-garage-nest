import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);

    console.log(savedUser);

    const { id, email, name } = savedUser;
    return { id, email, name };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();

    return users.map(({ id, email, name }) => ({
      id,
      email,
      name,
    }));
  }

  async findOne(id: number): Promise<UserResponseDto | null> {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.usersRepository.findOne(options);

    if (!user) {
      return null;
    }
    const { id: userId, name, email } = user;
    return { id: userId, name, email };
  }

  async update(
    id: number,
    user: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    await this.usersRepository.update(id, user);
    const options: FindOneOptions<User> = { where: { id } };
    const userUpdated = await this.usersRepository.findOne(options);

    console.log(userUpdated);

    if (!userUpdated) {
      return null;
    }
    const { id: userId, name, email } = userUpdated;
    return { id: userId, name, email };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
