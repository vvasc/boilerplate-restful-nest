import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModel } from '../user/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userModel: UserModel) {
    return await this.authService.validateUserLogin(userModel);
  }
}
