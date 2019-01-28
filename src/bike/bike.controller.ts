import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BikeService } from './bike.service';
import { BikeModel } from './bike.model';

@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() bikeModel: BikeModel) {
    return await this.bikeService.create(bikeModel);
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return await this.bikeService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('findByModelo')
  async find(@Body() bikeModel: BikeModel) {
    return await this.bikeService.findByModelo(bikeModel.modelo);
  }

  @UseGuards(AuthGuard())
  @Delete()
  async deleteOne(@Body() bikeID: any) {
    return await this.bikeService.delete(bikeID);
  }
}
