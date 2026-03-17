import prisma from "./prisma";

export async function createEntry(data: {
  mentalEnergy: number;
  mentalNote?: string | null;
  physicalEnergy: number;
  physicalNote?: string | null;
}) {
  return prisma.energyEntry.create({ data });
}

export async function getAllEntries() {
  return prisma.energyEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTodayEntry() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.energyEntry.findFirst({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}
