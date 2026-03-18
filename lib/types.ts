export interface EnergyEntry {
  id: number;
  date: string;
  createdAt: string;
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}
