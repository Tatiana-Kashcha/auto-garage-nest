import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const user = await this.usersService.findOne(parsedId);

    if (!user) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() pets: User,
  ): Promise<User | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const userUpdated = await this.usersService.update(parsedId, pets);

    if (!userUpdated) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return userUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
