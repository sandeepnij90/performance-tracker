import prisma from "./prisma";

interface Entry {
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

export async function createEntry(data: Entry) {
  return prisma.energyEntry.create({ data });
}

export async function getAllEntries() {
  return prisma.energyEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateTodayEntry(data: Entry) {
  const entry = await getTodayEntry();
  if (!entry) return null;

  return prisma.energyEntry.update({
    where: { id: entry.id },
    data,
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
