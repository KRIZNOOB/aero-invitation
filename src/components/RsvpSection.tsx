"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, PartyPopper, Send, XCircle } from "lucide-react";
import type { AttendanceStatus } from "@/lib/rsvp-store";

interface RsvpSectionProps {
  defaultName?: string;
  groupName: string;
}

const STATUS_OPTIONS: {
  value: AttendanceStatus;
  label: string;
  activeClass: string;
}[] = [
    {
      value: "hadir",
      label: "Hadir",
      activeClass:
        "bg-[#00D4FF]/20 border-[#00D4FF] text-[#7DE8FF] shadow-[0_0_20px_rgba(0,212,255,0.45)]",
    },
    {
      value: "tidak_hadir",
      label: "Tidak Hadir",
      activeClass:
        "bg-[#FF2A5F]/20 border-[#FF2A5F] text-[#FF85A5] shadow-[0_0_20px_rgba(255,42,95,0.45)]",
    },
  ];

export default function RsvpSection({
  defaultName = "",
  groupName,
}: RsvpSectionProps) {
  const [name, setName] = useState(defaultName);
  const [status, setStatus] = useState<AttendanceStatus>("hadir");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (status === "tidak_hadir" && note.trim().length < 3) {
      setError("Alasan tidak hadir wajib diisi ya!");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status, note }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan, coba lagi ya!");
        return;
      }

      setSubmitted(true);
      setNote("");

      if (status === "hadir") {
        confetti({
          particleCount: 95,
          spread: 75,
          origin: { y: 0.7 },
          colors: ["#00D4FF", "#A855F7", "#FF2A5F", "#38BDF8", "#EC4899"],
        });
      }
    } catch {
      setError("Koneksi terputus. Coba kirim ulang sebentar lagi ya!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="neon-card-purple rounded-3xl p-6 sm:p-8">
        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00D4FF]/60 bg-[#00D4FF]/15 text-[#00D4FF] shadow-[0_0_24px_rgba(0,212,255,0.45)]">
              <PartyPopper className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white neon-text-blue">
              Your RSVP is Confirmed!
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
              Thank you so much, <span className="font-bold text-white">{name}</span>!{" "}
              {status === "hadir"
                ? "See you at Viskal Outing at AeroXSpace Adventure!"
                : `We'll miss you at Viskal Outing at AeroXSpace Adventure, and thanks for letting us know!`}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="neon-btn-blue inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer"
            >
              Submit Another RSVP
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-sm font-bold text-slate-200 mb-1.5"
              >
                Nama Panggilan *
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi / Dinda"
                className="w-full rounded-xl border border-[#A855F7]/45 bg-[#09061A]/90 px-4 py-3 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_16px_rgba(0,212,255,0.35)] transition-all"
              />
            </div>

            <div>
              <span className="block text-sm font-bold text-slate-200 mb-2">
                Konfirmasi Kehadiran *
              </span>
              <div className="grid grid-cols-2 gap-3">
                {STATUS_OPTIONS.map((opt) => {
                  const isActive = status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStatus(opt.value)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all cursor-pointer ${isActive
                          ? `${opt.activeClass} -translate-y-0.5`
                          : "border-white/15 bg-[#09061A]/70 text-slate-300 hover:border-[#A855F7]/60"
                        }`}
                    >
                      {opt.value === "hadir" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-note"
                className="block text-sm font-bold text-slate-200 mb-1.5"
              >
                {status === "tidak_hadir" ? (
                  <>Catatan / Alasan Tidak Hadir *</>
                ) : (
                  <>
                    Catatan{" "}
                    <span className="font-normal text-slate-400">
                      (Opsional)
                    </span>
                  </>
                )}
              </label>
              <textarea
                id="rsvp-note"
                rows={3}
                maxLength={280}
                required={status === "tidak_hadir"}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={
                  status === "tidak_hadir"
                    ? "Tuliskan alasan belum bisa hadir..."
                    : "Tambahkan catatan jika diperlukan..."
                }
                className="w-full rounded-xl border border-[#A855F7]/45 bg-[#09061A]/90 px-4 py-3 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_16px_rgba(0,212,255,0.35)] transition-all resize-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-[#FF2A5F]/70 bg-[#FF2A5F]/15 px-4 py-2.5 text-sm font-bold text-[#FF85A5] shadow-[0_0_16px_rgba(255,42,95,0.25)]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="neon-btn-red w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-extrabold text-white disabled:opacity-60 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Mengirim RSVP..." : "Kirim Konfirmasi RSVP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
