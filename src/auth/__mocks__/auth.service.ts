import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserModel } from 'src/user/user.model';

import { JwtPayload } from '../jwt-payload.interface';


@Injectable()
export class AuthService {

  async createToken(emailAddress: string) {
    const user: JwtPayload = { email: emailAddress };
    const accessToken = 'accessToken';
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(validateUser: JwtPayload) {
    return {
      email: 'teste@gmail.com',
      password: bcrypt.hashSync('teste123', 10),
    };
  }

  async validateUserLogin(user: UserModel) {
    const userValidated = await this.validateUser({email: user.email} as JwtPayload);
    if (userValidated && bcrypt.compareSync(user.password, userValidated.password)) {
      return this.createToken(user.email);
    }
    return false;
  }
}
