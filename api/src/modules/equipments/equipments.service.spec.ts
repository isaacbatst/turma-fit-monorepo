import { Test, TestingModule } from '@nestjs/testing';
import { EQUIPMENT_REPOSITORY, ID_GENERATOR } from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { EquipmentsService } from './equipments.service';
import { EquipmentsRepositoryMemory } from './repositories/equipments.repository.memory';

describe('EquipmentsService', () => {
  let service: EquipmentsService;
  let repository: EquipmentsRepositoryMemory;
  let idGenerator: IdGeneratorFake;

  beforeEach(async () => {
    repository = new EquipmentsRepositoryMemory();
    idGenerator = new IdGeneratorFake();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentsService,
        { provide: EQUIPMENT_REPOSITORY, useValue: repository },
        { provide: ID_GENERATOR, useValue: idGenerator },
      ],
    }).compile();

    service = module.get<EquipmentsService>(EquipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should persist created equipment', async () => {
      await service.create({ name: 'Barra' });
      expect(repository.items.length).toBe(1);
      expect(repository.items[0].name).toBe('Barra');
    });

    it('sohuld return created equipment', async () => {
      const equipment = await service.create({ name: 'Barra' });
      expect(equipment.id).toBe('fake-id');
      expect(equipment.name).toBe('Barra');
    });
  });

  describe('findAll', () => {
    it('should return all equipments', async () => {
      await service.create({ name: 'Barra' });
      await service.create({ name: 'Halteres' });
      const equipments = await service.findAll();
      expect(equipments.length).toBe(2);
      expect(equipments[0].name).toBe('Barra');
      expect(equipments[1].name).toBe('Halteres');
    });
  });

  describe('update', () => {
    it('should update equipment', async () => {
      await service.create({ name: 'Barra' });
      await service.update('fake-id', { name: 'Halteres' });
      expect(repository.items[0].name).toBe('Halteres');
    });
  });

  describe('remove', () => {
    it('should remove equipment', async () => {
      await service.create({ name: 'Barra' });
      await service.remove('fake-id');
      expect(repository.items.length).toBe(0);
    });
  });
});
