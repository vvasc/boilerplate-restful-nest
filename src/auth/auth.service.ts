import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async createToken(emailAddress: string) {
    const user: JwtPayload = { email: emailAddress };
    const accessToken = await this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(validateUser: JwtPayload) {
    return await this.userService.findByEmail(validateUser.email);
  }

  async validateUserLogin(user: UserModel) {
    const userValidated = await this.validateUser({email: user.email} as JwtPayload);
    if (userValidated && bcrypt.compareSync(user.password, userValidated.password)) {
      return this.createToken(user.email);
    }
    return false;
  }
}
