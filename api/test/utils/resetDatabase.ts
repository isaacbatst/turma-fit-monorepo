import { PrismaService } from '../../src/modules/core/DataSource/prisma.service';
import { EncrypterArgon2 } from '../../src/modules/core/Encrypter/EncrypterArgon2';

const encrypter = new EncrypterArgon2();

export const resetDatabase = async (prisma: PrismaService) => {
  await prisma.$transaction([
    prisma.muscle.deleteMany(),
    prisma.admin.deleteMany(),
    prisma.adminSession.deleteMany(),
  ]);

  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: await encrypter.encrypt('senha-FORTE@032'),
      name: 'admin',
    },
  });
};
