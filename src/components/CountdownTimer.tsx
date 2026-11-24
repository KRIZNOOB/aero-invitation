"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetISO: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(targetISO: string): TimeLeft {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

const BOX_STYLES = [
  { card: "neon-card-blue", value: "text-[#00D4FF] neon-text-blue" },
  { card: "neon-card-purple", value: "text-[#C084FC] neon-text-purple" },
  { card: "neon-card-red", value: "text-[#FF4D7D] neon-text-red" },
  { card: "neon-card-blue", value: "text-[#38BDF8] neon-text-blue" },
];

export default function CountdownTimer({ targetISO }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetISO));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetISO));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  if (!timeLeft) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
          <div
            key={label}
            className={`${BOX_STYLES[idx].card} rounded-2xl p-4 sm:p-5 text-center`}
          >
            <div
              className={`font-display text-4xl sm:text-5xl font-extrabold tabular-nums ${BOX_STYLES[idx].value}`}
            >
              --
            </div>
            <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="neon-card-purple rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#00D4FF] neon-text-blue">
          Mission Starts Now!
        </p>
        <p className="mt-2 font-medium text-slate-300">
          See you at AeroXSpace — bring your best energy!
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
      {units.map((unit, idx) => (
        <div
          key={unit.label}
          className={`${BOX_STYLES[idx].card} rounded-2xl p-4 sm:p-5 text-center transition-transform hover:scale-105`}
        >
          <div
            className={`font-display text-4xl sm:text-5xl font-extrabold tabular-nums leading-none ${BOX_STYLES[idx].value}`}
          >
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
