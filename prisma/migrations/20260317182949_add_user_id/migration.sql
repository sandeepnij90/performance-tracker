-- AlterTable
ALTER TABLE "EnergyEntry" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "EnergyEntry_userId_createdAt_idx" ON "EnergyEntry"("userId", "createdAt");
