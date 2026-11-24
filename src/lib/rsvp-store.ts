import { promises as fs } from "fs";
import path from "path";

export type AttendanceStatus = "hadir" | "tidak_hadir";

export interface RsvpEntry {
  id: string;
  name: string;
  status: AttendanceStatus;
  note: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function getRsvps(): Promise<RsvpEntry[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addRsvp(
  input: Omit<RsvpEntry, "id" | "createdAt">
): Promise<RsvpEntry> {
  const existing = await getRsvps();
  const entry: RsvpEntry = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [entry, ...existing];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return entry;
}
