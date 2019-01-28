import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userModel: UserModel) {
    return await this.userService.create(userModel);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('findByEmail')
  async find(@Body() userEmail: any) {
    return await this.userService.findByEmail(userEmail.email);
  }

  @Delete()
  async deleteOne(@Body() userID: any) {
    return await this.userService.delete(userID);
  }
}
