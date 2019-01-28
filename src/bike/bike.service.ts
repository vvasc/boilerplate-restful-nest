import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bike } from './bike.entity';
import { BikeModel } from './bike.model';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly BikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Bike[]> {
    return await this.BikeRepository.find();
  }

  async create(bikeModel: BikeModel) {
    const createdBike = this.BikeRepository.create(bikeModel);
    await this.BikeRepository.save(createdBike);
    return bikeModel;
  }

  async findByModelo(modelo: string) {
    return await this.BikeRepository.createQueryBuilder()
      .where('Bike.modelo like :modelo')
      .setParameter('modelo', modelo)
      .getOne();
  }

  async delete(id: string) {
    const bike = await this.BikeRepository.findByIds([id]);
    this.BikeRepository.remove(bike);
  }
}
