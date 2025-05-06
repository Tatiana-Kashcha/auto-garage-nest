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

    const vehicle = await this.petServise.findOne(parsedId);

    if (!vehicle) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return vehicle;
  }

  @Post()
  async create(@Body() vehicle: Pets): Promise<Pets> {
    return this.petServise.create(vehicle);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() vehicle: Pets,
  ): Promise<Pets | null> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const vehicleUpdated = await this.petServise.update(parsedId, vehicle);

    if (!vehicleUpdated) {
      throw new NotFoundException(`Pets with ID ${parsedId} not found`);
    }

    return vehicleUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.petServise.remove(+id);
  }
}
