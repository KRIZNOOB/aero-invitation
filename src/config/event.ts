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
    editionLabel: "with Vintern Edition",
    subtitle: "Viskal Intern Batch #2",
  },

  // === DETAIL ACARA ===
  event: {
    coverIntro: "You're Invited,",
    coverTitle: "Viskal Outing!",
    coverExclusivelyFor: "EXCLUSIVELY FOR",
    coverDefaultGuest: "Viskal Peeps!",
    coverCta: "Ready?!",
    hostTeam: "Viskal Team",
    // Hero Mission Copy
    heroTitle: "Viskal Peeps!",
    heroHighlight: "Your Mission Awaits!",
    heroParagraphs: [
      "You have a special mission to complete! Your mission is to enjoy every second, collect as many laughs and unforgettable memories as possible. Also please keep the good vibes going until you're completely out of energy!",
      "The goal? Leave with tired feet, happy hearts, and absolutely no energy left!",
    ],
    heroClosingQuestion: "Are you ready to take on the challenge?!",
    // Format ISO dengan timezone WITA (+08:00) untuk live countdown
    dateISO: "2026-12-02T10:00:00+08:00",
    endISO: "2026-12-02T16:00:00+08:00",
    dateDisplay: "Wednesday, December 2, 2026",
    timeDisplay: "10:00 – 16:00 WITA",
    dressCode: "Comfortable / Sportswear",
    dressCodeNote:
      "Wear comfortable clothes or sportswear so you can move freely while playing!",
    venueName: "AeroXSpace Adventure",
    venueAddress: "Jl. Bypass Ngurah Rai No.999, Sanur, Denpasar Selatan, Bali",
    mapsUrl: "https://maps.app.goo.gl/o88gqEnHQW51PWAs8",
    mapsEmbedQuery: "AeroXSpace Adventure Bali",
  },

  // === DO'S & DON'TS AEROXSPACE (Tetap Bahasa Indonesia) ===
  rules: {
    badge: "QUICK BRIEFING",
    heading: "Do's & Don'ts",
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
        title: "Have some fun & start the mission",
        color: "purple",
      },
      {
        time: "16.00",
        title: "Time to Head Home",
        color: "red",
      },
    ] as RundownItem[],
  },

  // === COPYWRITING RSVP & CLOSING MESSAGE ===
  rsvpCopy: {
    heading: "SAVE YOUR SPOT!",
    lead: "We'd love to have you there!",
    description1:
      "Before we get everything ready, let us know if you're joining us.",
    description2Line1: "Whether it's a YES or a NO,",
    description2Line2:
      "Please fill out the RSVP form below so we can prepare everything accordingly.",
    closingLine1: "Because every goodbye deserves a little celebration.",
    closingLine2: "See you there!",
    farewellMessage1:
      "May this outing be filled with happiness, laughter, and moments that bring us closer together. We hope everyone goes home with a happy heart and memories that will always have a special place in their Viskal journey.",
    farewellMessage2:
      "Because the best part of Viskal isn't just the work we do, but also the people we share the journey with!",
    regardsLabel: "Regards,",
    regardsName: "Kinan",
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
    text: `Viskal Outing! (${EVENT_CONFIG.internGroup.editionLabel})`,
    dates: `${start}/${end}`,
    details: `${EVENT_CONFIG.event.heroParagraphs[0]}\n\nDress Code: ${EVENT_CONFIG.event.dressCode}`,
    location: `${EVENT_CONFIG.event.venueName} (${EVENT_CONFIG.event.mapsUrl})`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
