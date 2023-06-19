/*
  Warnings:

  - You are about to alter the column `expiresIn` on the `AdminSession` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "AdminSession" ALTER COLUMN "expiresIn" SET DATA TYPE INTEGER;
