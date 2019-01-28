import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  create(userModel: UserModel): Observable<any> {
    const hash = bcrypt.hashSync(userModel.password, 10);
    const user = {
      email: userModel.email,
      password: `${hash}`,
    };
    const createdUser = this.UserRepository.create(user);
    return from(this.UserRepository.save(createdUser));
  }

  findAll(): Observable<User[]> {
    return from(this.UserRepository.find());
  }

  findByEmail(email: string): Observable<User> {
    const userFounded = this.UserRepository.createQueryBuilder()
      .where('User.email = :email')
      .setParameter('email', email)
      .getOne();
    return from(userFounded);
  }

  delete(id: string): Observable<any> {
    return from(this.UserRepository.findByIds([id])).pipe(
      map((user) => this.UserRepository.remove(user)),
    );
  }
}
