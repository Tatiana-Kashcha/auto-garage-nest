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
import { PetsService } from './pets.service';
import { Pets } from './entities/pets.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petServise: PetsService) {}

  @Post()
  async create(@Body() pets: Pets): Promise<Pets> {
    return this.petServise.create(pets);
  }

  @Get()
  async findAll(): Promise<Pets[]> {
    return this.petServise.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pets | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const pets = await this.petServise.findOne(parsedId);

    if (!pets) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return pets;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() pets: Pets,
  ): Promise<Pets | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const petsUpdated = await this.petServise.update(parsedId, pets);

    if (!petsUpdated) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return petsUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.petServise.remove(+id);
  }
}
