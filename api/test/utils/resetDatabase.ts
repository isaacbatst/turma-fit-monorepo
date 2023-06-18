import { PrismaService } from '../../src/modules/core/DataSource/prisma.service';

export const resetDatabase = (prisma: PrismaService) => {
  return prisma.$transaction([
    prisma.adminSession.deleteMany(),
    prisma.admin.deleteMany(),
  ]);
};
