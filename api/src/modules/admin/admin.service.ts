import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  ENCRYPTER,
  ID_GENERATOR,
  TOKEN_GENERATOR,
} from '../../constants/tokens';
import { AdminRepository } from './repositories/admin.repository';
import { IdGenerator } from '../core/IdGenerator/IdGenerator';
import { Admin } from './entities/admin.entity';
import { Encrypter } from '../core/Encrypter/Encrypter';
import { TokenGenerator } from '../core/TokenGenerator/TokenGenerator';
import { AdminSessionRepository } from './repositories/admin.session.repository';
import { AdminSession } from './entities/admin.session.entity';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
    @Inject(ADMIN_REPOSITORY) private readonly repository: AdminRepository,
    @Inject(ADMIN_SESSION_REPOSITORY)
    private readonly sessionRepository: AdminSessionRepository,
    @Inject(ENCRYPTER) private readonly encrypter: Encrypter,
    @Inject(TOKEN_GENERATOR) private readonly tokenGenerator: TokenGenerator,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const id = this.idGenerator.generate();
    const hash = await this.encrypter.encrypt(createAdminDto.password);
    const admin = new Admin({
      email: createAdminDto.email,
      name: createAdminDto.name,
      id,
      password: hash,
    });
    await this.repository.create(admin);
    return {
      id,
    };
  }

  async findByEmail(email: string) {
    const admin = await this.repository.findByEmail(email);
    if (!admin) throw new NotFoundException();
    return admin;
  }

  async login(params: { email: string; password: string }) {
    const admin = await this.repository.findByEmail(params.email);
    if (!admin) throw new UnauthorizedException();
    const isPasswordCorrect = await this.encrypter.compare(
      params.password,
      admin.getPassword(),
    );
    if (!isPasswordCorrect) throw new UnauthorizedException();
    const token = this.tokenGenerator.generate();
    const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
    const session = new AdminSession({
      createdAt: new Date(),
      expiresIn: oneWeekMs,
      token,
    });
    await this.sessionRepository.create(session);
    return {
      token,
    };
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
