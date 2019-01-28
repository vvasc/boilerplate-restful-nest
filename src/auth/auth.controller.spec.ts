jest.mock('./auth.service.ts');
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          AuthService,
        ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('login()', () => {
    it('should return a token', async () => {
      const userModel = {
        email: 'teste@gmail.com',
        password: 'teste123',
      };
      const result = {
        accessToken: 'accessToken',
        expiresIn: 3600,
      };

      expect(await authController.login(userModel)).toMatchObject(result);
    });
  });

  describe('login() senhaIncorreta', () => {
    it('should return a false', async () => {
      const userModel = {
        email: 'teste@gmail.com',
        password: 'senhaIncorreta',
      };
      const result = false;
      expect(await authController.login(userModel)).toBe(result);
    });
  });

});
