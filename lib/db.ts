import prisma from "./prisma";

interface Entry {
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

export async function createEntry(userId: string, data: Entry) {
  return prisma.energyEntry.create({ data: { ...data, userId } });
}

export async function getAllEntries(userId: string) {
  return prisma.energyEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateTodayEntry(userId: string, data: Entry) {
  const entry = await getTodayEntry(userId);
  if (!entry) return null;

  return prisma.energyEntry.update({
    where: { id: entry.id },
    data,
  });
}

export async function getTodayEntry(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.energyEntry.findFirst({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}
