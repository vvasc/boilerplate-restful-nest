import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppService } from './app.service';
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
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
