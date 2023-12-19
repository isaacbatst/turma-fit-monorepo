/*
  Warnings:

  - The primary key for the `WeekPlanTraining` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[weekPlanId,trainingId,order]` on the table `WeekPlanTraining` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `WeekPlanTraining` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "WeekPlanTraining" DROP CONSTRAINT "WeekPlanTraining_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "WeekPlanTraining_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeekPlanTraining_weekPlanId_trainingId_order_key" ON "WeekPlanTraining"("weekPlanId", "trainingId", "order");
