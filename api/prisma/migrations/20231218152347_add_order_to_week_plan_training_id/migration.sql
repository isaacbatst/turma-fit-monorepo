/*
  Warnings:

  - The primary key for the `WeekPlanTraining` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "WeekPlanTraining" DROP CONSTRAINT "WeekPlanTraining_pkey",
ADD CONSTRAINT "WeekPlanTraining_pkey" PRIMARY KEY ("weekPlanId", "trainingId", "order");
