import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserModel } from '../user.model';

@Injectable()
export class UserService {
  async create(userModel: UserModel) {
    const hash = bcrypt.hashSync(userModel.password, 10);
    const user = {
      email: userModel.email,
      password: `${hash}`,
    };
    const userFounded = await this.findByEmail(user.email);
    if (userFounded === false) {
      return  {
        email: 'teste@gmail.com',
        password: user.password,
      };
    } else {
      return new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Este e-mail já está cadastrado',
      }, 403).message;
    }
  }

  async findAll() {
    return jest.fn();
  }

  async findByEmail(email: string) {
    if (email !== 'teste@gmail.com') {
      return true;
    }
    return false;
  }

  async delete(id: string) {
    jest.fn();
  }
}
