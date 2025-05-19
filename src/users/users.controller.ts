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
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  // для перевірки хешування паролів
  @Get('hash')
  async testHash(): Promise<void> {
    return this.usersService.testHash();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const user = await this.usersService.findOne(parsedId);

    if (!user) {
      throw new NotFoundException(`User with ID ${parsedId} not found`);
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const userUpdated = await this.usersService.update(parsedId, user);

    if (!userUpdated) {
      throw new NotFoundException(`User with ID ${parsedId} not found`);
    }

    return userUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
