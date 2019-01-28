import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userModel: UserModel) {
    this.userService.create(userModel);
  }

  @Get()
  findAll(): Observable<any> {
    return this.userService.findAll();
  }

  @Get('findByEmail')
  find(@Body() userEmail: any): any {
    return this.userService.findByEmail(userEmail.email);
  }

  @Delete()
  deleteOne(@Body() userID: any): Observable<any> {
    return this.userService.delete(userID);
  }
}
