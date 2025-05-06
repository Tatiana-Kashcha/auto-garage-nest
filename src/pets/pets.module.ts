import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './entities/pets.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pets])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
