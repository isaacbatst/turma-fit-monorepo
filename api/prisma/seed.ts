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
  await prisma.equipment.createMany({
    data: [
      { name: 'Barra Reta' },
      { name: 'Barra W' },
      { name: 'Anilha' },
      { name: 'Halteres' },
      { name: 'Máquina' },
    ],
  });
  await Promise.all([
    prisma.muscle.create({
      data: {
        name: 'Bíceps',
        moviments: {
          createMany: {
            data: [{ name: 'Rosca Direta' }, { name: 'Rosca Alternada' }],
          },
        },
      },
    }),
    prisma.muscle.create({
      data: {
        name: 'Tríceps',
        moviments: {
          createMany: {
            data: [
              { name: 'Tríceps Testa' },
              { name: 'Tríceps Francês' },
              { name: 'Tríceps Coice' },
            ],
          },
        },
      },
    }),
    prisma.muscle.create({
      data: {
        name: 'Peitoral',
        moviments: {
          createMany: {
            data: [
              { name: 'Supino reto' },
              { name: 'Supino inclinado' },
              { name: 'Supino declinado' },
              { name: 'Crucifixo' },
              { name: 'Peck deck' },
            ],
          },
        },
      },
    }),
  ]);
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
