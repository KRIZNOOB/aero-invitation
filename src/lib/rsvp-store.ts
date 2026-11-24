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

function formatWitaTimestamp(isoDate: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(isoDate));
}

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

async function saveToGoogleSheets(
  webhookUrl: string,
  entry: RsvpEntry
): Promise<void> {
  const payload = {
    timestamp: formatWitaTimestamp(entry.createdAt),
    name: entry.name,
    status: entry.status === "hadir" ? "Hadir" : "Tidak Hadir",
    note: entry.note || "-",
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook responded with ${response.status}`);
  }

  const text = await response.text();
  try {
    const json = JSON.parse(text);
    if (json && json.ok === false) {
      throw new Error(json.error || "Google Sheets returned an error");
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("Google Sheets")) {
      throw err;
    }
    // Apps Script sometimes returns plain text/HTML on redirect; HTTP 2xx is success
  }
}

export async function addRsvp(
  input: Omit<RsvpEntry, "id" | "createdAt">
): Promise<RsvpEntry> {
  const entry: RsvpEntry = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (webhookUrl) {
    await saveToGoogleSheets(webhookUrl, entry);
    return entry;
  }

  // Local development fallback when GOOGLE_SHEETS_WEBHOOK_URL is not configured
  if (process.env.VERCEL) {
    throw new Error(
      "GOOGLE_SHEETS_WEBHOOK_URL belum dikonfigurasi di Vercel Environment Variables."
    );
  }

  const existing = await getRsvps();
  const updated = [entry, ...existing];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return entry;
}
