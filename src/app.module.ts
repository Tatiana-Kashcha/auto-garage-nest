import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from './vehicles/entities/vehicle.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Pets } from './pets/entities/pets.entity';
import { PetsModule } from './pets/pets.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { logger } from './common/middleware/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'garage.sqlite',
      entities: [Vehicle, Pets, User],
      synchronize: true,
    }),
    VehiclesModule,
    PetsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UsersController);
  }
}
