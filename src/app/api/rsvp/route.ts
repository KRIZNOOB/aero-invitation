import { NextResponse } from "next/server";
import { addRsvp, AttendanceStatus, getRsvps } from "@/lib/rsvp-store";

const VALID_STATUSES: AttendanceStatus[] = ["hadir", "tidak_hadir"];

export async function GET() {
  const entries = await getRsvps();
  return NextResponse.json({ total: entries.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const status = body.status as AttendanceStatus;
    const note =
      typeof body.note === "string" ? body.note.trim().slice(0, 280) : "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Nama wajib diisi minimal 2 karakter ya!" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Status kehadiran tidak valid." },
        { status: 400 }
      );
    }

    if (status === "tidak_hadir" && note.length < 3) {
      return NextResponse.json(
        { error: "Alasan tidak hadir wajib diisi ya!" },
        { status: 400 }
      );
    }

    const entry = await addRsvp({
      name: name.slice(0, 80),
      status,
      note,
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan RSVP. Coba lagi sebentar ya!" },
      { status: 500 }
    );
  }
}
