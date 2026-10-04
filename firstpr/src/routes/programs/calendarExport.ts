export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string; // YYYYMMDD
  endDate: string;   // YYYYMMDD
  url?: string;
  category?: string;
}

export const CALENDAR_EVENTS_2026: CalendarEvent[] = [
  {
    title: "GSoC 2026: Mentoring Orgs Announced",
    description: "Google announces official 2026 mentoring organizations. Begin repository reconnaissance and reach out in public channels immediately.",
    startDate: "20260226",
    endDate: "20260227",
    url: "https://summerofcode.withgoogle.com",
    category: "GSoC"
  },
  {
    title: "ESoC 2026: European Summer of Code Project Batches Open",
    description: "European Summer of Code opens project listings across applied AI, edge computing, and decentralized open source hubs.",
    startDate: "20260301",
    endDate: "20260302",
    url: "https://www.esoc.dev",
    category: "ESoC"
  },
  {
    title: "GSoC 2026: Contributor Proposals Open",
    description: "Contributor proposal submission period begins. Submit draft proposals to organization mentors for feedback.",
    startDate: "20260317",
    endDate: "20260318",
    url: "https://summerofcode.withgoogle.com",
    category: "GSoC"
  },
  {
    title: "GSoC 2026: Contributor Proposals Deadline (18:00 UTC)",
    description: "Final deadline to submit GSoC 2026 contributor proposals. No late submissions accepted.",
    startDate: "20260407",
    endDate: "20260408",
    url: "https://summerofcode.withgoogle.com",
    category: "GSoC"
  },
  {
    title: "ESoC 2026: Applications & Hub Matching Deadline",
    description: "Final deadline to submit proposals and complete initial contribution requirements for European Summer of Code.",
    startDate: "20260425",
    endDate: "20260426",
    url: "https://www.esoc.dev",
    category: "ESoC"
  },
  {
    title: "GSoC 2026: Accepted Contributors Announced",
    description: "Google announces selected contributors. Community bonding period begins with mentors.",
    startDate: "20260508",
    endDate: "20260509",
    url: "https://summerofcode.withgoogle.com",
    category: "GSoC"
  },
  {
    title: "ESoC & GSoC 2026: Coding Period Officially Begins",
    description: "Official summer coding period begins. First milestones kick off across all projects.",
    startDate: "20260525",
    endDate: "20260526",
    url: "https://www.esoc.dev",
    category: "Kickoff"
  },
  {
    title: "LFX Mentorship 2026: Summer Cohort Applications Open",
    description: "Linux Foundation opens applications for CNCF, Linux Kernel, OpenSSF, and Hyperledger Summer 2026 terms.",
    startDate: "20260415",
    endDate: "20260416",
    url: "https://mentorship.lfx.linuxfoundation.org",
    category: "LFX"
  },
  {
    title: "GSoC & ESoC 2026: Midterm Milestone Evaluations",
    description: "Mentors and contributors submit midterm evaluations. First stipend installments released upon passing.",
    startDate: "20260713",
    endDate: "20260718",
    url: "https://summerofcode.withgoogle.com",
    category: "Evaluations"
  },
  {
    title: "GSoC 2026: Final Work Product Submissions",
    description: "Final code, documentation, and evaluation submissions due for standard 12-week GSoC contributors.",
    startDate: "20260824",
    endDate: "20260831",
    url: "https://summerofcode.withgoogle.com",
    category: "GSoC"
  },
  {
    title: "Outreachy: December 2026 Cohort Applications Open",
    description: "Outreachy opens initial essay applications for the winter internship cycle.",
    startDate: "20260810",
    endDate: "20260811",
    url: "https://www.outreachy.org",
    category: "Outreachy"
  },
  {
    title: "Hacktoberfest 2026: Worldwide Launch",
    description: "Global celebration of open source begins. Submit 4 quality pull requests across participating repositories.",
    startDate: "20261001",
    endDate: "20261101",
    url: "https://hacktoberfest.com",
    category: "Event"
  },
  {
    title: "24 Pull Requests: Holiday Season Kickoff",
    description: "Submit 24 pull requests between Dec 1 and Dec 24 to give back to open source software.",
    startDate: "20261201",
    endDate: "20261225",
    url: "https://24pullrequests.com",
    category: "Event"
  }
];

export function generateAndDownloadIcs(): void {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FirstPR//Open Source Programs & Planner 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Open Source Programs 2026 (FirstPR)",
    "X-WR-TIMEZONE:UTC"
  ];

  const nowStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  CALENDAR_EVENTS_2026.forEach((ev, index) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:firstpr-oss-2026-${index}@firstpr.dev`);
    lines.push(`DTSTAMP:${nowStamp}`);
    lines.push(`DTSTART;VALUE=DATE:${ev.startDate}`);
    lines.push(`DTEND;VALUE=DATE:${ev.endDate}`);
    lines.push(`SUMMARY:${escapeIcs(ev.title)}`);
    lines.push(`DESCRIPTION:${escapeIcs(ev.description)}`);
    if (ev.url) {
      lines.push(`URL:${ev.url}`);
    }
    if (ev.category) {
      lines.push(`CATEGORIES:${ev.category}`);
    }
    lines.push("STATUS:CONFIRMED");
    lines.push("TRANSP:TRANSPARENT");
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");

  const icsContent = lines.join("\r\n");
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", "firstpr-open-source-deadlines-2026.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

function escapeIcs(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
