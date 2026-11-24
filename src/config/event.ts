export interface RundownItem {
  time: string;
  title: string;
  description: string;
  color: "pink" | "yellow" | "mint" | "sky";
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
    dateISO: "2026-12-02T15:00:00+08:00",
    endISO: "2026-12-02T19:00:00+08:00",
    dateDisplay: "Rabu, 2 Desember 2026",
    timeDisplay: "15.00 – 19.00 WITA",
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

  // === RUNDOWN SINGKAT ===
  rundown: [
    {
      time: "15.00",
      title: "Kumpul & Registrasi",
      description:
        "Absen bareng di AeroXSpace, persiapan perlengkapan, dan pemanasan sebelum main.",
      color: "yellow",
    },
    {
      time: "15.30",
      title: "Playtime di AeroXSpace",
      description:
        "Seru-seruan nyobain berbagai wahana bareng Vintern dan seluruh tim.",
      color: "pink",
    },
    {
      time: "17.30",
      title: "Istirahat, Ngobrol & Speech Singkat",
      description:
        "Kesan pesan, nostalgia momen magang, dan penyerahan kenang-kenangan untuk Vintern.",
      color: "mint",
    },
    {
      time: "18.30",
      title: "Foto Bareng & Closing",
      description:
        "Abadikan momen terakhir bareng Viskal Intern Batch #2 sebelum pulang!",
      color: "sky",
    },
  ] as RundownItem[],
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
