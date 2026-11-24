export interface RundownItem {
  time: string;
  title: string;
  color: "blue" | "purple" | "red";
}

export interface RuleItem {
  text: string;
  highlight?: string;
  suffix?: string;
}

export const EVENT_CONFIG = {
  // === DETAIL KELOMPOK INTERN ===
  internGroup: {
    name: "Vintern",
    subtitle: "Viskal Intern Batch #2",
    quote:
      "Datang bawa laptop dan rasa penasaran, pulang bawa pengalaman, teman baru, dan cerita seru bareng tim.",
  },

  // === DETAIL ACARA ===
  event: {
    badge: "OFFICIAL FAREWELL PARTY",
    title: "See You on Top,",
    subtitle:
      "Waktunya kita melepas teman-teman Vintern sebelum melanjutkan petualangan baru! Yuk kumpul, seru-seruan di AeroXSpace, dan bikin kenangan terakhir yang berkesan.",
    hostTeam: "Tim Viskal",
    // Format ISO dengan timezone WITA (+08:00) untuk live countdown
    dateISO: "2026-12-02T10:00:00+08:00",
    endISO: "2026-12-02T16:00:00+08:00",
    dateDisplay: "Rabu, 2 Desember 2026",
    timeDisplay: "10.00 – 16.00 WITA",
    dressCode: "Pakaian Nyaman / Olahraga",
    dressCodeNote:
      "Gunakan pakaian yang nyaman atau pakaian olahraga agar lebih leluasa bergerak saat bermain!",
    venueName: "AeroXSpace Adventure",
    venueAddress: "Jl. Bypass Ngurah Rai No.999, Sanur, Denpasar Selatan, Bali",
    mapsUrl: "https://maps.app.goo.gl/o88gqEnHQW51PWAs8",
    mapsEmbedQuery: "AeroXSpace Adventure Bali",
  },

  // === DO'S & DON'TS AEROXSPACE ===
  rules: {
    dos: [
      {
        text: "Gunakan pakaian yang nyaman atau pakaian olahraga agar lebih leluasa bergerak.",
      },
      {
        text: "Pastikan kondisi tubuh dalam keadaan sehat dan fit sebelum bermain.",
      },
      {
        text: "Tinggi badan minimum untuk bermain di Main Play Area adalah ",
        highlight: "110 cm",
        suffix: ".",
      },
    ] as RuleItem[],
    donts: [
      {
        text: "Tidak diperkenankan bermain jika sedang mengalami cedera, hamil, dalam masa pemulihan setelah operasi, atau memiliki kondisi kesehatan tertentu yang berisiko saat beraktivitas.",
      },
      {
        text: "Berat badan maksimal untuk bermain adalah ",
        highlight: "120 kg",
        suffix: ".",
      },
      {
        text: "Beberapa wahana add-on memiliki batas berat maksimal ",
        highlight: "90 kg",
        suffix: ".",
      },
    ] as RuleItem[],
  },

  // === TIMELINE / RUNDOWN ===
  timeline: {
    heading: "WHAT'S THE DAY LOOKING LIKE?",
    subheading: "A little sneak peek of our day!",
    items: [
      {
        time: "10.00",
        title: "Meet Up & Prepare for the mission!",
        color: "blue",
      },
      {
        time: "10.30",
        title: "Ride, Play & Start the mission!!",
        color: "purple",
      },
      {
        time: "16.00",
        title: "Time to Head Home",
        color: "red",
      },
    ] as RundownItem[],
  },

  // === COPYWRITING RSVP ===
  rsvpCopy: {
    heading: "SAVE YOUR SPOT!",
    lead: "We'd love to have you there!",
    description1:
      "Before we get everything ready, let us know if you're joining us.",
    description2:
      "Whether it's a YES or a NO, please fill out the RSVP form below so we can prepare everything accordingly.",
    closing:
      "Because every goodbye deserves a little celebration. See you there!",
  },
};

export function buildGoogleCalendarUrl() {
  const start = new Date(EVENT_CONFIG.event.dateISO)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const end = new Date(EVENT_CONFIG.event.endISO)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Farewell Party ${EVENT_CONFIG.internGroup.subtitle}`,
    dates: `${start}/${end}`,
    details: `${EVENT_CONFIG.event.subtitle}\n\nDress Code: ${EVENT_CONFIG.event.dressCode}`,
    location: `${EVENT_CONFIG.event.venueName} (${EVENT_CONFIG.event.mapsUrl})`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
