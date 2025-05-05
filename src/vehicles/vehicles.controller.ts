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
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle | null> {
    // return this.vehiclesService.findOne(+id); // + перетворює id на число (варіант навчального коду)
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const vehicle = await this.vehiclesService.findOne(parsedId);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${parsedId} not found`);
    }

    return vehicle;
  }

  @Post()
  async create(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehiclesService.create(vehicle);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() vehicle: Vehicle,
  ): Promise<Vehicle | null> {
    // return this.vehiclesService.update(+id, vehicle); // + перетворює id на число (варіант навчального коду)
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    const vehicleUpdated = await this.vehiclesService.update(parsedId, vehicle);

    if (!vehicleUpdated) {
      throw new NotFoundException(`Vehicle with ID ${parsedId} not found`);
    }

    return vehicleUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.vehiclesService.remove(+id);
  }
}
