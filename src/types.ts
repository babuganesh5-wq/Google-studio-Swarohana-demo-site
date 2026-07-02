export interface SyllabusItem {
  id: string;
  index: number;
  name: string;
  countText?: string; // e.g. "14", "9", "5"
  classCountText?: string; // e.g. "( 8 Class )"
  description: string;
  notation?: string; // Swara notation example
  details?: string[]; // Extra learning points
}

export interface SyllabusLevel {
  levelId: "level1" | "level2" | "level3";
  title: string; // e.g., "Carnatic Level 1"
  tamilTitle: string; // e.g., "கர்நாடக இசை நிலை 1"
  stage: "Basic" | "Intermediate" | "Advance";
  tamilStage: string;
  onlineDuration: string; // e.g. "6 to 9 months"
  onlineStudents: number; // e.g. 5
  groupDuration: string; // e.g. "9 to 12 months"
  groupStudents: string; // e.g. "8 to 10"
  items: SyllabusItem[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface ClassRegistration {
  id: string;
  studentName: string;
  studentAge: number;
  email: string;
  phone: string;
  selectedLevel: "level1" | "level2" | "level3";
  classType: "online" | "live_group";
  preferredTiming: string;
  musicalGoal?: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface ShrutiPitch {
  name: string; // e.g. "C (1 Kattai)"
  tamilName: string; // "C (1 கட்டை)"
  frequency: number; // Fundamental frequency in Hz, e.g. 130.81 (C3)
  label: string; // e.g. "C3"
}
