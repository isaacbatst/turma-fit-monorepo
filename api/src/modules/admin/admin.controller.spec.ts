import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  ENCRYPTER,
  ID_GENERATOR,
  TOKEN_GENERATOR,
} from '../../constants/tokens';
import { AdminRepositoryMemory } from './repositories/admin.repository.memory';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { EncrypterFake } from '../core/Encrypter/EncrypterFake';
import { TokenGeneratorFake } from '../core/TokenGenerator/TokenGeneratorFake';
import { AdminSessionRepositoryMemory } from './repositories/admin.session.repository.memory';
import { Response } from 'express';
import { DASHBOARD_AUTH_COOKIE } from '../../constants/cookies';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: ID_GENERATOR,
          useClass: IdGeneratorFake,
        },
        {
          provide: ADMIN_REPOSITORY,
          useClass: AdminRepositoryMemory,
        },
        {
          provide: ADMIN_SESSION_REPOSITORY,
          useClass: AdminSessionRepositoryMemory,
        },
        {
          provide: ENCRYPTER,
          useClass: EncrypterFake,
        },
        {
          provide: TOKEN_GENERATOR,
          useClass: TokenGeneratorFake,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created id', async () => {
    const { id } = await controller.create({
      name: 'admin',
      password: 'password',
      email: 'email@example.com',
    });

    expect(id).toBe('fake-id');
  });

  it('should return token', async () => {
    await controller.create({
      name: 'admin',
      password: 'password',
      email: 'email@example.com',
    });

    const res = {
      cookie: jest.fn(),
    } as unknown as Response;

    await controller.login(
      {
        email: 'email@example.com',
        password: 'password',
      },
      res,
    );

    expect(res.cookie).toHaveBeenCalledWith(
      DASHBOARD_AUTH_COOKIE,
      'fake-token',
      { httpOnly: true },
    );
  });
});
