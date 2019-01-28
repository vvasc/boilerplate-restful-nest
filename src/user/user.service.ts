import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async create(userModel: UserModel) {
    const hash = bcrypt.hashSync(userModel.password, 10);
    const user = {
      email: userModel.email,
      password: `${hash}`,
    };
    const userFounded = await this.findByEmail(user.email);
    if (userFounded === false) {
      const createdUser = this.UserRepository.create(user);
      return await this.UserRepository.save(createdUser);
    } else {
      return new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Este e-mail já está cadastrado',
      }, 403);
    }
  }

  async findAll() {
    return this.UserRepository.find();
  }

  async findByEmail(email: string) {
    const userFounded = await this.UserRepository.createQueryBuilder()
      .where('User.email = :email')
      .setParameter('email', email)
      .getOne();
    if (userFounded) {
      return userFounded;
    } else {
      return false;
    }
  }

  async delete(id: string) {
    const user = await this.UserRepository.findByIds([id]);
    this.UserRepository.remove(user);
  }
}
