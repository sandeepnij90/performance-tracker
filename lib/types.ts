export interface EnergyEntry {
  id: number;
  date: string;
  createdAt: string;
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

export interface JournalEntry {
  id: number;
  date: string;
  createdAt: string;
  successVision: string;
  achieved: boolean | null;
  achievedNote: string | null;
  performanceScore: number | null;
  improvementNote: string | null;
}
