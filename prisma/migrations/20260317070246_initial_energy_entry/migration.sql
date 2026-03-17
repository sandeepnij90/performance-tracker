-- CreateTable
CREATE TABLE "EnergyEntry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mentalEnergy" INTEGER NOT NULL,
    "mentalNote" TEXT,
    "physicalEnergy" INTEGER NOT NULL,
    "physicalNote" TEXT,

    CONSTRAINT "EnergyEntry_pkey" PRIMARY KEY ("id")
);
