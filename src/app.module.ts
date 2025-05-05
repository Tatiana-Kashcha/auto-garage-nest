import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'garage.sqlite',
      entities: [Vehicle],
      synchronize: true,
    }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
