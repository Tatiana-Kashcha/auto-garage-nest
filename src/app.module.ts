import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Pets } from './pets/entities/pets.entity';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'garage.sqlite',
      entities: [Vehicle, Pets],
      synchronize: true,
    }),
    VehiclesModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
