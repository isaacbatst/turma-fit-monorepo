import { Test, TestingModule } from '@nestjs/testing';
import { ID_GENERATOR, MUSCLE_REPOSITORY } from '@/constants/tokens';
import { IdGeneratorFake } from '@/modules/core/IdGenerator/IdGeneratorFake';
import { MusclesRepositoryMemory } from './repositories/muscles.repository.memory';
import { MusclesService } from './muscles.service';

describe('MusclesService', () => {
  let service: MusclesService;
  let repository: MusclesRepositoryMemory;
  let idGenerator: IdGeneratorFake;

  beforeEach(async () => {
    repository = new MusclesRepositoryMemory();
    idGenerator = new IdGeneratorFake();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusclesService,
        { provide: MUSCLE_REPOSITORY, useValue: repository },
        { provide: ID_GENERATOR, useValue: idGenerator },
      ],
    }).compile();

    service = module.get<MusclesService>(MusclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should persist created muscle', async () => {
      await service.create({ name: 'biceps' });
      expect(repository.items.length).toBe(1);
      expect(repository.items[0].name).toBe('biceps');
    });
  });

  describe('findAll', () => {
    it('should return all muscles', async () => {
      await service.create({ name: 'biceps' });
      await service.create({ name: 'triceps' });
      const muscles = await service.findAll();
      expect(muscles.length).toBe(2);
      expect(muscles[0].name).toBe('biceps');
      expect(muscles[1].name).toBe('triceps');
    });
  });

  describe('update', () => {
    it('should update muscle', async () => {
      await service.create({ name: 'biceps' });
      await service.update('fake-id', { name: 'triceps' });
      expect(repository.items[0].name).toBe('triceps');
    });
  });

  describe('remove', () => {
    it('should remove muscle', async () => {
      await service.create({ name: 'biceps' });
      await service.remove('fake-id');
      expect(repository.items.length).toBe(0);
    });
  });
});
