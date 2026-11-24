"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  MailOpen,
  MapPin,
  Shirt,
  Sparkles,
  XCircle,
} from "lucide-react";
import { buildGoogleCalendarUrl, EVENT_CONFIG } from "@/config/event";
import ContinuousConfetti from "./ContinuousConfetti";
import CountdownTimer from "./CountdownTimer";
import RsvpSection from "./RsvpSection";

interface InvitationClientProps {
  guestName?: string;
}

const TIMELINE_COLOR_MAP = {
  blue: {
    badge:
      "border-[#00D4FF]/70 bg-[#00D4FF]/15 text-[#7DE8FF] shadow-[0_0_18px_rgba(0,212,255,0.4)]",
    dot: "bg-[#00D4FF] shadow-[0_0_14px_rgba(0,212,255,0.9)]",
    card: "neon-card-blue",
  },
  purple: {
    badge:
      "border-[#A855F7]/70 bg-[#A855F7]/20 text-[#E9D5FF] shadow-[0_0_18px_rgba(168,85,247,0.45)]",
    dot: "bg-[#A855F7] shadow-[0_0_14px_rgba(168,85,247,0.9)]",
    card: "neon-card-purple",
  },
  red: {
    badge:
      "border-[#FF2A5F]/70 bg-[#FF2A5F]/15 text-[#FF85A5] shadow-[0_0_18px_rgba(255,42,95,0.45)]",
    dot: "bg-[#FF2A5F] shadow-[0_0_14px_rgba(255,42,95,0.9)]",
    card: "neon-card-red",
  },
};

const NEON_CONFETTI_COLORS = [
  "#00D4FF",
  "#A855F7",
  "#FF2A5F",
  "#38BDF8",
  "#EC4899",
];

export default function InvitationClient({ guestName }: InvitationClientProps) {
  const [opened, setOpened] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const { internGroup, event, rules, timeline, rsvpCopy } = EVENT_CONFIG;
  const calendarUrl = buildGoogleCalendarUrl();

  function handleOpenInvitation() {
    setOpened(true);
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: NEON_CONFETTI_COLORS,
    });
  }

  function fireCelebration() {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.65 },
      colors: NEON_CONFETTI_COLORS,
    });
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(
        `${event.venueName} - ${event.mapsUrl}`
      );
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  }

  // Opening Cover Screen
  if (!opened) {
    return (
      <>
        <ContinuousConfetti />
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
          <div className="hidden sm:block absolute top-12 left-12 neon-card-blue rounded-2xl px-4 py-2 font-hand text-xl font-bold text-[#7DE8FF] neon-text-blue animate-float">
            Save the Date!
          </div>
          <div className="hidden sm:block absolute bottom-14 right-14 neon-card-red rounded-2xl px-4 py-2 font-hand text-xl font-bold text-[#FF85A5] neon-text-red animate-float-alt">
            Play &amp; Good Vibes
          </div>
          <div className="hidden md:block absolute top-24 right-20 neon-card-purple rounded-full px-4 py-1.5 text-xs font-extrabold text-[#D8B4FE] rotate-6">
            #FarewellVintern
          </div>

          <div className="neon-card rounded-[2rem] max-w-lg w-full p-7 sm:p-10 text-center relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00D4FF]/60 bg-[#00D4FF]/15 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7DE8FF] shadow-[0_0_16px_rgba(0,212,255,0.3)]">
              <Sparkles className="h-3.5 w-3.5" />
              {event.badge}
            </div>

            <div className="mt-6">
              <p className="font-hand text-2xl sm:text-3xl font-bold text-[#FF4D7D] neon-text-red -rotate-2">
                You&apos;re Invited!
              </p>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-white">
                Farewell Party{" "}
                <span className="inline-block rounded-xl border border-[#00D4FF]/70 bg-gradient-to-r from-[#00D4FF]/25 via-[#A855F7]/30 to-[#FF2A5F]/25 px-3 py-0.5 text-[#7DE8FF] neon-text-blue shadow-[0_0_24px_rgba(0,212,255,0.35)] rotate-1 mt-1">
                  {internGroup.name}!
                </span>
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-[#A855F7]/60 bg-[#09061A]/80 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Undangan Spesial Untuk
              </p>
              <p className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-white neon-text-purple">
                {guestName ? guestName : `Teman-Teman ${event.hostTeam}`}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenInvitation}
              className="neon-btn-red mt-7 w-full inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-base sm:text-lg font-extrabold text-white cursor-pointer"
            >
              <MailOpen className="h-5 w-5" />
              Buka Undangan
            </button>

            <p className="mt-4 text-xs font-medium text-slate-400">
              {event.dateDisplay} • {event.venueName}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <ContinuousConfetti />

      {/* Floating Sticky Nav */}
      <header className="sticky top-3 z-40 px-4">
        <nav className="max-w-2xl mx-auto neon-card rounded-2xl px-3 py-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={fireCelebration}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#00D4FF]/60 bg-[#00D4FF]/15 px-3 py-1.5 text-xs sm:text-sm font-extrabold text-[#7DE8FF] shadow-[0_0_14px_rgba(0,212,255,0.3)] cursor-pointer hover:scale-105 transition-transform"
            title="Klik untuk confetti!"
          >
            Farewell {internGroup.name}
          </button>

          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-slate-200">
            <a
              href="#detail"
              className="rounded-lg px-2 py-1.5 hover:text-[#00D4FF] transition-colors"
            >
              Acara
            </a>
            <a
              href="#rules"
              className="rounded-lg px-2 py-1.5 hover:text-[#C084FC] transition-colors"
            >
              Info
            </a>
            <a
              href="#rundown"
              className="hidden sm:inline-block rounded-lg px-2 py-1.5 hover:text-[#FF4D7D] transition-colors"
            >
              Rundown
            </a>
            <a
              href="#rsvp"
              className="neon-btn-red rounded-xl px-3 py-1.5 font-extrabold text-white"
            >
              RSVP
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <section className="relative">
          <div className="neon-card rounded-[2rem] p-6 sm:p-10 md:p-12 overflow-hidden relative">
            {/* Subtle neon corner glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#A855F7]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#00D4FF]/20 blur-3xl" />

            <div className="max-w-2xl relative">
              {guestName && (
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2A5F]/50 bg-[#FF2A5F]/15 px-3.5 py-1 text-xs sm:text-sm font-bold text-slate-100 mb-4 shadow-[0_0_14px_rgba(255,42,95,0.25)]">
                  Hai <span className="text-[#FF85A5]">{guestName}</span>, kamu diundang!
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#00D4FF]/60 bg-[#00D4FF]/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7DE8FF] shadow-[0_0_16px_rgba(0,212,255,0.3)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {event.badge}
                </span>
                <span className="inline-flex items-center rounded-full border border-[#A855F7]/65 bg-[#A855F7]/20 text-[#E9D5FF] px-3.5 py-1 text-xs font-extrabold shadow-[0_0_16px_rgba(168,85,247,0.3)]">
                  {internGroup.subtitle}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
                {event.title}{" "}
                <span className="inline-block rounded-2xl border border-[#FF2A5F]/70 bg-gradient-to-r from-[#FF2A5F] via-[#A855F7] to-[#00D4FF] text-white px-3.5 py-0.5 -rotate-1 mt-1 shadow-[0_0_28px_rgba(255,42,95,0.5)]">
                  {internGroup.name}!
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                {event.subtitle}
              </p>

              {/* Quote box */}
              <div className="mt-6 rounded-2xl border border-[#A855F7]/45 bg-[#09061A]/85 p-4 sm:p-5 inline-block max-w-xl shadow-[0_0_20px_rgba(168,85,247,0.18)]">
                <p className="font-hand text-xl sm:text-2xl font-bold text-[#E9D5FF]">
                  &ldquo;{internGroup.quote}&rdquo;
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                  — {internGroup.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#rsvp"
                  className="neon-btn-red inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-extrabold text-white"
                >
                  Konfirmasi RSVP
                </a>
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn-blue inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm sm:text-base font-extrabold text-white"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Simpan ke Kalender
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="text-center space-y-6">
          <div>
            <p className="font-hand text-2xl sm:text-3xl font-bold text-[#FF4D7D] neon-text-red">
              Hitung Mundur Menuju Hari-H
            </p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white neon-text-purple">
              Jangan Sampai Kelewatan!
            </h2>
          </div>
          <CountdownTimer targetISO={event.dateISO} />
        </section>

        {/* EVENT DETAILS & MAPS SECTION */}
        <section id="detail" className="scroll-mt-24 space-y-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#00D4FF]/60 bg-[#00D4FF]/15 text-[#7DE8FF] px-4 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(0,212,255,0.3)]">
              Detail Acara &amp; Lokasi
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Catat Tanggal &amp; Tempatnya
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            {/* Info Cards */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="neon-card-blue rounded-3xl p-5 flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl border border-[#00D4FF]/65 bg-[#00D4FF]/15 text-[#00D4FF] flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.35)]">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#7DE8FF]">
                    Tanggal
                  </p>
                  <p className="font-display text-xl font-extrabold text-white mt-0.5">
                    {event.dateDisplay}
                  </p>
                </div>
              </div>

              <div className="neon-card-purple rounded-3xl p-5 flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl border border-[#A855F7]/65 bg-[#A855F7]/20 text-[#D8B4FE] flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.4)]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#D8B4FE]">
                    Waktu
                  </p>
                  <p className="font-display text-xl font-extrabold text-white mt-0.5">
                    {event.timeDisplay}
                  </p>
                </div>
              </div>

              <div className="neon-card-red rounded-3xl p-5 flex items-start gap-4 flex-1">
                <div className="h-12 w-12 shrink-0 rounded-2xl border border-[#FF2A5F]/65 bg-[#FF2A5F]/15 text-[#FF4D7D] flex items-center justify-center shadow-[0_0_16px_rgba(255,42,95,0.4)]">
                  <Shirt className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#FF85A5]">
                    Dress Code
                  </p>
                  <p className="font-display text-xl font-extrabold text-white mt-0.5">
                    {event.dressCode}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-300">
                    {event.dressCodeNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Venue & Google Maps Card */}
            <div className="md:col-span-7 neon-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-5">
              <div className="flex items-start gap-3.5">
                <div className="h-12 w-12 shrink-0 rounded-2xl border border-[#00D4FF]/65 bg-[#00D4FF]/15 text-[#00D4FF] flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.35)]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#7DE8FF]">
                    Lokasi Acara
                  </p>
                  <h3 className="font-display text-2xl font-extrabold text-white mt-0.5">
                    {event.venueName}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {event.venueAddress}
                  </p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="rounded-2xl border border-[#A855F7]/50 overflow-hidden bg-[#09061A] h-56 sm:h-64 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                <iframe
                  title={`Peta lokasi ${event.venueName}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    event.mapsEmbedQuery
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn-blue flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  Buka di Google Maps
                </a>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="neon-btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-100 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="h-4 w-4 text-[#00D4FF]" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Salin Lokasi
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DO'S & DON'TS AEROXSPACE SECTION */}
        <section id="rules" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full border border-[#A855F7]/65 bg-[#A855F7]/20 text-[#E9D5FF] px-4 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(168,85,247,0.3)]">
              Panduan Bermain
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Do&apos;s &amp; Don&apos;ts di AeroXSpace
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* DOs Card */}
            <div className="neon-card-blue rounded-3xl p-6 sm:p-7 flex flex-col">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#00D4FF]/70 bg-[#00D4FF]/15 text-[#7DE8FF] px-4 py-1.5 text-sm font-extrabold shadow-[0_0_18px_rgba(0,212,255,0.35)]">
                <CheckCircle2 className="h-4 w-4" />
                DOs
              </div>

              <ul className="mt-5 space-y-4">
                {rules.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-[#00D4FF]/70 bg-[#00D4FF]/20 text-[#7DE8FF] flex items-center justify-center">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      {item.text}
                      {item.highlight && (
                        <strong className="font-extrabold text-[#7DE8FF] neon-text-blue">
                          {item.highlight}
                        </strong>
                      )}
                      {item.suffix}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts Card */}
            <div className="neon-card-red rounded-3xl p-6 sm:p-7 flex flex-col">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#FF2A5F]/70 bg-[#FF2A5F]/15 text-[#FF85A5] px-4 py-1.5 text-sm font-extrabold shadow-[0_0_18px_rgba(255,42,95,0.35)]">
                <XCircle className="h-4 w-4" />
                DON&apos;Ts
              </div>

              <ul className="mt-5 space-y-4">
                {rules.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-[#FF2A5F]/70 bg-[#FF2A5F]/20 flex items-center justify-center">
                      <XCircle className="h-3 w-3 text-[#FF4D7D] stroke-[2.5]" />
                    </span>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      {item.text}
                      {item.highlight && (
                        <strong className="font-extrabold text-[#FF85A5] neon-text-red">
                          {item.highlight}
                        </strong>
                      )}
                      {item.suffix}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="rundown" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full border border-[#A855F7]/65 bg-[#A855F7]/20 text-[#E9D5FF] px-4 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(168,85,247,0.3)]">
              Timeline
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight neon-text-purple">
              {timeline.heading}
            </h2>
            <p className="mt-2 font-hand text-2xl sm:text-3xl font-bold text-[#7DE8FF] neon-text-blue">
              {timeline.subheading}
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative pl-7 sm:pl-9 space-y-5">
            {/* Glowing vertical timeline line */}
            <div
              aria-hidden="true"
              className="absolute left-2.5 sm:left-3.5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00D4FF] via-[#A855F7] to-[#FF2A5F] shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            />

            {timeline.items.map((item) => {
              const style = TIMELINE_COLOR_MAP[item.color];
              return (
                <div key={item.time + item.title} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[25px] sm:-left-[29px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-[#070514] ${style.dot}`}
                  />
                  <div
                    className={`${style.card} rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 hover:-translate-y-0.5 transition-transform`}
                  >
                    <span
                      className={`self-start sm:self-auto shrink-0 rounded-xl border px-3.5 py-1.5 font-display text-sm sm:text-base font-extrabold tabular-nums ${style.badge}`}
                    >
                      {item.time}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RSVP SECTION */}
        <section id="rsvp" className="scroll-mt-24 space-y-7">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block rounded-full border border-[#FF2A5F]/65 bg-[#FF2A5F]/15 text-[#FF85A5] px-4 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(255,42,95,0.3)]">
              RSVP
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight neon-text-red">
              {rsvpCopy.heading}
            </h2>
            <p className="font-hand text-2xl sm:text-3xl font-bold text-[#7DE8FF] neon-text-blue">
              {rsvpCopy.lead}
            </p>
            <div className="space-y-1.5 text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
              <p>{rsvpCopy.description1}</p>
              <p>{rsvpCopy.description2}</p>
            </div>
          </div>

          <RsvpSection
            defaultName={guestName}
            groupName={internGroup.name}
          />

          <p className="text-center font-hand text-2xl sm:text-3xl font-bold text-[#FF85A5] neon-text-red max-w-xl mx-auto pt-2">
            {rsvpCopy.closing}
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 px-4 text-center">
        <div className="max-w-md mx-auto neon-card rounded-2xl px-5 py-4">
          <p className="font-hand text-2xl font-bold text-[#FF4D7D] neon-text-red">
            See you there!
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-300">
            Dibuat dengan penuh kenangan oleh {event.hostTeam} untuk{" "}
            {internGroup.subtitle}
          </p>
        </div>
      </footer>
    </div>
  );
}
