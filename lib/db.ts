import prisma from "./prisma";
import { toMidnightUTC } from "./dates";

interface EntryData {
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

export async function createEntry(
  userId: string,
  data: EntryData,
  date?: Date,
) {
  const entryDate = date ?? toMidnightUTC(new Date());
  return prisma.energyEntry.create({
    data: { ...data, userId, date: entryDate },
  });
}

export async function getAllEntries(userId: string, month?: string) {
  const where: { userId: string; date?: { gte: Date; lt: Date } } = { userId };
  if (month) {
    const [year, mon] = month.split("-").map(Number);
    const start = new Date(Date.UTC(year, mon - 1, 1));
    const end = new Date(Date.UTC(year, mon, 1));
    where.date = { gte: start, lt: end };
  }
  return prisma.energyEntry.findMany({
    where,
    orderBy: { date: "desc" },
  });
}

export async function getTodayEntry(userId: string) {
  const today = toMidnightUTC(new Date());
  return prisma.energyEntry.findUnique({
    where: { userId_date: { userId, date: today } },
  });
}

export async function getEntryByDate(userId: string, date: Date) {
  return prisma.energyEntry.findUnique({
    where: { userId_date: { userId, date } },
  });
}

export async function updateEntryById(
  userId: string,
  id: number,
  data: EntryData,
) {
  return prisma.energyEntry.update({
    where: { id, userId },
    data,
  });
}

export async function updateTodayEntry(userId: string, data: EntryData) {
  const entry = await getTodayEntry(userId);
  if (!entry) return null;
  return updateEntryById(userId, entry.id, data);
}

// --- Journal ---

export async function createJournalEntry(
  userId: string,
  data: { successVision: string },
  date?: Date,
) {
  const entryDate = date ?? toMidnightUTC(new Date());
  return prisma.journalEntry.create({
    data: { ...data, userId, date: entryDate },
  });
}

export async function getTodayJournalEntry(userId: string) {
  const today = toMidnightUTC(new Date());
  return prisma.journalEntry.findUnique({
    where: { userId_date: { userId, date: today } },
  });
}

export async function getAllJournalEntries(userId: string, month?: string) {
  const where: { userId: string; date?: { gte: Date; lt: Date } } = { userId };
  if (month) {
    const [year, mon] = month.split("-").map(Number);
    const start = new Date(Date.UTC(year, mon - 1, 1));
    const end = new Date(Date.UTC(year, mon, 1));
    where.date = { gte: start, lt: end };
  }
  return prisma.journalEntry.findMany({
    where,
    orderBy: { date: "desc" },
  });
}

export async function getJournalEntryByDate(userId: string, date: Date) {
  return prisma.journalEntry.findUnique({
    where: { userId_date: { userId, date } },
  });
}

export async function updateJournalEntryById(
  userId: string,
  id: number,
  data: {
    successVision?: string;
    achieved?: boolean | null;
    achievedNote?: string | null;
    performanceScore?: number | null;
    improvementNote?: string | null;
  },
) {
  return prisma.journalEntry.update({
    where: { id, userId },
    data,
  });
}
