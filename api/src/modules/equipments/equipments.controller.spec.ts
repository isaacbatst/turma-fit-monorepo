import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { EQUIPMENT_REPOSITORY, ID_GENERATOR } from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { EquipmentsRepositoryMemory } from './repositories/equipments.repository.memory';

describe('EquipmentsController', () => {
  let controller: EquipmentsController;
  let repository: EquipmentsRepositoryMemory;
  let idGenerator: IdGeneratorFake;
  beforeEach(async () => {
    repository = new EquipmentsRepositoryMemory();
    idGenerator = new IdGeneratorFake();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentsController],
      providers: [
        EquipmentsService,
        { provide: EQUIPMENT_REPOSITORY, useValue: repository },
        { provide: ID_GENERATOR, useValue: idGenerator },
      ],
    }).compile();

    controller = module.get<EquipmentsController>(EquipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created equipment', async () => {
    const response = await controller.create({ name: 'Barra' });
    expect(response.id).toBe('fake-id');
    expect(response.name).toBe('Barra');
  });
});
