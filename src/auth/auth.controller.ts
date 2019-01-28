import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserModel } from 'src/user/user.model';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userModel: UserModel) {
    return await this.authService.validateUserLogin(userModel);
  }
}
