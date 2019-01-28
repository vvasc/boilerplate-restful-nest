jest.mock('./bike.service.ts');
import { Test } from '@nestjs/testing';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';

describe('BikeController', () => {
  let bikeController: BikeController;
  let bikeService: BikeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [BikeController],
        providers: [
          BikeService,
        ],
    }).compile();

    bikeService = module.get<BikeService>(BikeService);
    bikeController = module.get<BikeController>(BikeController);
  });

  describe('create()', () => {
    it('should return a new bike', async () => {
      const bikeModel = {
        id: 1,
        modelo: 's-works',
        descricao: 'teste',
      };
      const result = {
        id: 1,
        modelo: 's-works',
        descricao: 'teste',
      };

      expect(await bikeController.create(bikeModel)).toMatchObject(result);
    });
  });
  describe('findAll()', () => {
    it('should return an array of bikes', async () => {
      const result = [
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
      expect(await bikeController.findAll()).toMatchObject(result);
    });
  });
});
