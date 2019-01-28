import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../bike.entity';
import { BikeModel } from '../bike.model';

@Injectable()
export class BikeService {

  async findAll(): Promise<Bike[]> {
    return [
      {
        id: 1,
        modelo: 's-works',
        descricao: 'teste',
      },
      {
        id: 2,
        modelo: 'trek',
        descricao: 'teste',
      },
    ];
  }

  async create(bikeModel: BikeModel) {
    return bikeModel;
  }

  async findByModelo(modelo: string) {
    jest.fn();
  }

  async delete(id: string) {
    jest.fn();
  }
}
