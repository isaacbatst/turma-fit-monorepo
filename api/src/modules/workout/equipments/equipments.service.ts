import { Inject, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EQUIPMENT_REPOSITORY, ID_GENERATOR } from '@/constants/tokens';
import { EquipmentsRepository } from './repositories/equipments.repository';
import { Equipment } from './entities/equipment.entity';
import { IdGenerator } from '@/modules/core/IdGenerator/IdGenerator';

@Injectable()
export class EquipmentsService {
  constructor(
    @Inject(EQUIPMENT_REPOSITORY)
    private equipmentsRepository: EquipmentsRepository,
    @Inject(ID_GENERATOR)
    private idGenerator: IdGenerator,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    const id = this.idGenerator.generate();
    const equipment = new Equipment(id, createEquipmentDto.name);
    await this.equipmentsRepository.create(equipment);
    return equipment.toJSON();
  }

  async findAll() {
    const equipments = await this.equipmentsRepository.findAll();
    return equipments.map((equipment) => equipment.toJSON());
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    await this.equipmentsRepository.update(
      new Equipment(id, updateEquipmentDto.name),
    );
  }

  async remove(id: string) {
    await this.equipmentsRepository.remove(id);
  }
}
