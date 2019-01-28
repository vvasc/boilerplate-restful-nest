import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { BikeController } from './bike.controller';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bike]),
    AuthModule,
  ],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
