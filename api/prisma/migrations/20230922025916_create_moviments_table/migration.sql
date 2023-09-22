-- CreateTable
CREATE TABLE "Moviment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "muscleId" TEXT NOT NULL,

    CONSTRAINT "Moviment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moviment_name_key" ON "Moviment"("name");

-- AddForeignKey
ALTER TABLE "Moviment" ADD CONSTRAINT "Moviment_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
