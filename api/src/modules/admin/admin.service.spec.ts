import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  ENCRYPTER,
  ID_GENERATOR,
  TOKEN_GENERATOR,
} from '../../constants/tokens';
import { EncrypterFake } from '../core/Encrypter/EncrypterFake';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { TokenGeneratorFake } from '../core/TokenGenerator/TokenGeneratorFake';
import { AdminService } from './admin.service';
import { AdminRepositoryMemory } from './repositories/admin.repository.memory';
import { AdminSessionRepositoryMemory } from './repositories/admin.session.repository.memory';
import { AdminSession } from './entities/admin.session.entity';
import { Admin } from './entities/admin.entity';

describe('AdminService', () => {
  let service: AdminService;
  let repository: AdminRepositoryMemory;
  let idGenerator: IdGeneratorFake;
  let encrypter: EncrypterFake;
  let tokenGenerator: TokenGeneratorFake;
  let sessionRepository: AdminSessionRepositoryMemory;

  beforeEach(async () => {
    sessionRepository = new AdminSessionRepositoryMemory();
    repository = new AdminRepositoryMemory(sessionRepository);
    idGenerator = new IdGeneratorFake();
    encrypter = new EncrypterFake();
    tokenGenerator = new TokenGeneratorFake();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: ADMIN_REPOSITORY,
          useValue: repository,
        },
        {
          provide: ADMIN_SESSION_REPOSITORY,
          useValue: sessionRepository,
        },
        {
          provide: ID_GENERATOR,
          useValue: idGenerator,
        },
        {
          provide: ENCRYPTER,
          useValue: encrypter,
        },
        {
          provide: TOKEN_GENERATOR,
          useValue: tokenGenerator,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return created id', async () => {
      const { id } = await service.create({
        name: 'admin',
        password: 'password',
        email: 'email@example.com',
      });
      expect(id).toBe('fake-id');
    });

    it('should persist admin', async () => {
      const { id } = await service.create({
        name: 'admin',
        password: 'password',
        email: 'email@example.com',
      });

      expect(repository.items).toContainEqual({
        id,
        name: 'admin',
        password: 'hash',
        email: 'email@example.com',
      });
    });
  });

  describe('findByEmail', () => {
    it('should return admin', async () => {
      const { id } = await service.create({
        name: 'admin',
        password: 'password',
        email: 'email@example.com',
      });

      const admin = await service.findByEmail('email@example.com');
      expect(admin).toEqual({
        id,
        name: 'admin',
        password: 'hash',
        email: 'email@example.com',
      });
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await service.create({
        name: 'admin',
        password: 'password',
        email: 'email@example.com',
      });
    });
    it('should return token', async () => {
      const { token } = await service.login({
        email: 'email@example.com',
        password: 'password',
      });

      expect(token).toBe('fake-token');
    });

    it('should persist session', async () => {
      const { token } = await service.login({
        email: 'email@example.com',
        password: 'password',
      });
      expect(sessionRepository.items).toHaveLength(1);
      expect(sessionRepository.items[0].getToken()).toBe(token);
    });

    it('should throw with invalid email', async () => {
      await expect(() => {
        return service.login({
          email: 'invalid-email',
          password: 'password',
        });
      }).rejects.toThrow(UnauthorizedException);
    });

    it('should throw with invalid password', async () => {
      encrypter.isCorrect = false;
      await expect(() => {
        return service.login({
          email: 'email@example.com',
          password: 'invalid-password',
        });
      }).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateSessionToken', () => {
    it('should return true with valid token', async () => {
      await sessionRepository.create(
        new AdminSession({
          createdAt: new Date(),
          expiresIn: 1000 * 60,
          token: 'valid-token',
          userId: 'fake-id',
        }),
      );
      await repository.create(
        new Admin({
          email: 'email@example.com',
          id: 'fake-id',
          name: 'admin',
          password: 'hash',
        }),
      );
      const isValid = await service.validateSessionToken('valid-token');
      expect(isValid).toBeTruthy();
    });

    it('should return false with unexistent token', async () => {
      const isValid = await service.validateSessionToken('unexistent-token');
      expect(isValid).toBeFalsy();
    });

    it('should return false with expired token', async () => {
      await sessionRepository.create(
        new AdminSession({
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          expiresIn: 0,
          token: 'expired-token',
          userId: 'fake-id',
        }),
      );
      await repository.create(
        new Admin({
          email: 'email@example.com',
          id: 'fake-id',
          name: 'admin',
          password: 'hash',
        }),
      );
      const isValid = await service.validateSessionToken(
        'expired-token',
        new Date('2020-01-02T00:00:00.000Z'),
      );
      expect(isValid).toBeFalsy();
    });
  });
});
