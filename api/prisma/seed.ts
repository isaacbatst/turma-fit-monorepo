import { PrismaClient } from '@prisma/client';
import { EncrypterArgon2 } from '../src/modules/core/Encrypter/EncrypterArgon2';

const prisma = new PrismaClient();
const encrypter = new EncrypterArgon2();

async function main() {
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: await encrypter.encrypt('senha-FORTE@032'),
      name: 'admin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
