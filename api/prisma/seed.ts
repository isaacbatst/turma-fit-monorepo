import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: await argon2.hash('senha-FORTE@032'),
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
