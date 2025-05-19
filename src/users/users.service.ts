import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(newUser);
      const { id, email, name } = savedUser;
      return { id, email, name };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
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
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email is already in use by another user');
      }
    }

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    await this.usersRepository.update(id, {
      ...updateUserDto,
      password: hashedPassword,
    });

    const options: FindOneOptions<User> = { where: { id } };
    const userUpdated = await this.usersRepository.findOne(options);

    if (!userUpdated) {
      return null;
    }
    const { id: userId, name, email } = userUpdated;
    return { id: userId, name, email };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // для перевірки хешування паролів
  async testHash(): Promise<void> {
    const passwords = ['abc123', 'abc123', 'abc123'];

    for (const pw of passwords) {
      const hash = await bcrypt.hash(pw, 10);
      console.log(hash);
    }
  }
}
