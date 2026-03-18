-- Add date column as nullable first
ALTER TABLE "EnergyEntry" ADD COLUMN "date" TIMESTAMP(3);

-- Backfill: set date to midnight UTC of existing createdAt
UPDATE "EnergyEntry"
SET "date" = DATE_TRUNC('day', "createdAt" AT TIME ZONE 'UTC');

-- Make date NOT NULL
ALTER TABLE "EnergyEntry" ALTER COLUMN "date" SET NOT NULL;

-- Drop old index on createdAt
DROP INDEX IF EXISTS "EnergyEntry_userId_createdAt_idx";

-- Add unique constraint
CREATE UNIQUE INDEX "EnergyEntry_userId_date_key" ON "EnergyEntry"("userId", "date");

-- Create new index on date
CREATE INDEX "EnergyEntry_userId_date_idx" ON "EnergyEntry"("userId", "date");
