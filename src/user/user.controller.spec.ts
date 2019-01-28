jest.mock('./user.service.ts');
import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          UserService,
        ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('create()', () => {
    it('should return a new user', async () => {
      const userModel = {
        email: 'teste@gmail.com',
        password: '123teste',
      };
      const result = {
        email: 'teste@gmail.com',
        password: expect.anything(),
      };

      expect(await userController.create(userModel)).toMatchObject(result);
    });
  });
  describe('create()', () => {
    it('should return a new user', async () => {
      const userModel = {
        email: 'teste123@gmail.com',
        password: '123teste',
      };
      const result = {
        error: 'Este e-mail já está cadastrado',
        status: 403,
      };
      expect(await userController.create(userModel)).toMatchObject(result);
    });
  });
});
