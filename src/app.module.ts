import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { BikeModule } from './bike/bike.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    BikeModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
