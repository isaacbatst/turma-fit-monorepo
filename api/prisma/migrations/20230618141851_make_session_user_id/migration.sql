/*
  Warnings:

  - Made the column `userId` on table `AdminSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdminSession" ALTER COLUMN "userId" SET NOT NULL;
