export type ProgramCategory = 
  | "Mentorship" 
  | "Internship" 
  | "Fellowship" 
  | "Documentation" 
  | "Event" 
  | "Research";

export type ProgramStatus = "Active" | "Upcoming" | "Year-Round" | "Discontinued";

export interface Program {
  id: string;
  name: string;
  shortName: string;
  organizer: string;
  category: ProgramCategory;
  focusArea: string;
  stipend: {
    amount: string;
    isPaid: boolean;
    currency: string;
    details: string;
  };
  eligibility: {
    target: string;
    requiresStudent: boolean;
    minAge?: number;
    regions: string;
    experienceLevel: "Beginner Friendly" | "Intermediate" | "All Levels";
  };
  timeline: {
    window: string;
    cohorts: string;
    applicationsOpen: string;
    applicationsClose: string;
    codingPeriod: string;
  };
  status: ProgramStatus;
  featured?: boolean;
  isEuropean?: boolean;
  website: string;
  docsUrl?: string;
  description: string;
  selectionTips: string[];
  notableOrgs: string[];
  techStack: string[];
  accentColor: "emerald" | "blue" | "purple" | "amber" | "cyan" | "rose";
}

export const EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT = {
  name: "European Summer of Code (ESoC)",
  badge: "European Flagship Initiative 🇪🇺",
  heroTagline: "Bridging Global Open Source Contributors with European Applied AI & Innovation Hubs",
  officialUrl: "https://www.esoc.dev",
  description: "Inspired by Google Summer of Code, ESoC is Europe's premier open source and applied AI mentorship program. Operating across decentralized regional hubs in France, Germany, Italy, and pan-European research centers, ESoC connects worldwide developers with mission-critical European open-source projects.",
  keyDifferentiators: [
    {
      title: "Strong Applied AI Focus",
      desc: "Unlike generalist programs, ESoC features cutting-edge tracks in open weights LLMs, computer vision, robotics, edge AI, and autonomous systems."
    },
    {
      title: "Decentralized European Hubs",
      desc: "Projects are curated by European universities, research institutions, and open-source foundations (e.g., German Center for Open Source AI, French Inria labs)."
    },
    {
      title: "Paid Developer Stipends",
      desc: "Participants receive competitive monthly stipends (typically €2,500 – €4,500 total depending on project scale and regional hub)."
    },
    {
      title: "Beginner-Friendly Onboarding",
      desc: "Explicitly open to newcomers to open source with structured 1:1 senior mentorship and real portfolio-grade deliverables."
    }
  ],
  applicationSteps: [
    "Register your contributor profile on esoc.dev",
    "Browse published project batches (released progressively in Spring)",
    "Join the project's public channel (Discord/Slack/Mailing list)",
    "Submit a preliminary contribution or proof-of-concept PR",
    "Submit project proposal directly to the host European hub"
  ]
};

export const ALL_OSS_PROGRAMS: Program[] = [
  {
    id: "esoc",
    name: "European Summer of Code",
    shortName: "ESoC",
    organizer: "European Open Source AI Consortium & Regional Hubs",
    category: "Mentorship",
    focusArea: "Applied AI, Open LLMs, Computer Vision & Edge Systems",
    stipend: {
      amount: "€2,500 - €4,500",
      isPaid: true,
      currency: "EUR",
      details: "Disbursed in milestone installments by host European hubs upon passing evaluations."
    },
    eligibility: {
      target: "Students, junior developers, and open source newcomers worldwide",
      requiresStudent: false,
      minAge: 18,
      regions: "Global (Decentralized European hubs)",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "May - August",
      cohorts: "Annual Summer Cohort",
      applicationsOpen: "March 2026",
      applicationsClose: "Late April 2026",
      codingPeriod: "June – August (12 weeks full-time or flexible)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: true,
    website: "https://www.esoc.dev",
    description: "Europe's flagship open source mentorship program focusing on applied AI, decentralized computing, and European digital sovereignty. Connects contributors worldwide with European research labs and open-source companies.",
    selectionTips: [
      "Select projects released in early batches to begin community interaction early.",
      "Submit a small bug fix or documentation enhancement in the project's GitHub repo prior to proposal review.",
      "Show practical experience with Python, PyTorch, Rust, or modern AI frameworks.",
      "Reach out to designated European hub project mentors in their community channels."
    ],
    notableOrgs: ["German Center of Open Source AI", "Inria France", "FBK Italy", "European Open Source Hubs"],
    techStack: ["Python", "PyTorch", "Rust", "Transformers", "C++", "FastAPI"],
    accentColor: "blue"
  },
  {
    id: "gsoc",
    name: "Google Summer of Code",
    shortName: "GSoC",
    organizer: "Google Open Source",
    category: "Mentorship",
    focusArea: "General Open Source (OS, Compilers, Web, Scientific Computing)",
    stipend: {
      amount: "$1,500 - $3,000+",
      isPaid: true,
      currency: "USD",
      details: "Country-adjusted Purchasing Power Parity (PPP). Small ($750-$1,500), Medium ($1,500-$3,000), Large ($3,000-$6,000)."
    },
    eligibility: {
      target: "Students and beginners to open source software development",
      requiresStudent: false,
      minAge: 18,
      regions: "Worldwide (except US-embargoed countries)",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "May - November",
      cohorts: "Annual Global Program",
      applicationsOpen: "March 2026",
      applicationsClose: "Early April 2026",
      codingPeriod: "May – August (Standard 12 wks) or extended up to 22 wks"
    },
    status: "Upcoming",
    featured: true,
    isEuropean: false,
    website: "https://summerofcode.withgoogle.com",
    docsUrl: "https://google.github.io/gsocguides/student/",
    description: "The global benchmark for open-source student mentorship since 2005. Pairs 1,000+ contributors every year with 175+ open-source organizations worldwide.",
    selectionTips: [
      "Target organizations announced in February; begin making PRs immediately before proposals open.",
      "Communicate on the org's official mailing list or chat (IRC/Slack/Zulip) to build mentor trust.",
      "Structure your proposal with weekly deliverables, unit test coverage, and a concrete risk mitigation plan.",
      "Never submit proposals without having merged at least 1-2 small PRs into the org first."
    ],
    notableOrgs: ["Linux Foundation", "KDE", "Blender", "Chromium", "Apache Software Foundation", "Python Software Foundation"],
    techStack: ["Python", "C/C++", "Rust", "Go", "TypeScript", "Java"],
    accentColor: "emerald"
  },
  {
    id: "lfx",
    name: "LFX Mentorship",
    shortName: "LFX",
    organizer: "The Linux Foundation",
    category: "Mentorship",
    focusArea: "Cloud Native (CNCF), Linux Kernel, Security & Infrastructure",
    stipend: {
      amount: "$1,300 - $3,000",
      isPaid: true,
      currency: "USD",
      details: "Standardized stipends based on mentee location ($1,300 for India/APAC; up to $3,000 in North America/Western Europe)."
    },
    eligibility: {
      target: "Anyone 18+ eligible to work in open source (Students & Professionals)",
      requiresStudent: false,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "Spring, Summer, Fall",
      cohorts: "3 Cohorts Annually",
      applicationsOpen: "Spring: Jan/Feb | Summer: Apr/May | Fall: Jul/Aug",
      applicationsClose: "Rolling by term",
      codingPeriod: "12 weeks full-time or 24 weeks part-time"
    },
    status: "Active",
    featured: true,
    isEuropean: false,
    website: "https://mentorship.lfx.linuxfoundation.org",
    description: "Direct mentorship on the infrastructure software that powers the internet, including Kubernetes, Linux Kernel, Envoy, PyTorch, and Hyperledger.",
    selectionTips: [
      "Review the specific prerequisite tasks posted on the LFX Mentorship portal for each project.",
      "Highlight production-level systems knowledge: Go, C, Rust, or Kubernetes client architecture.",
      "Keep applications focused on 1-2 projects per term where you have already engaged in community meetings.",
      "Apply immediately when term listings go live on the portal."
    ],
    notableOrgs: ["CNCF (Kubernetes, Envoy, Prometheus)", "OpenSSF", "Hyperledger", "PyTorch", "GraphQL Foundation"],
    techStack: ["Go", "Rust", "C", "C++", "Python", "Kubernetes"],
    accentColor: "purple"
  },
  {
    id: "outreachy",
    name: "Outreachy",
    shortName: "Outreachy",
    organizer: "Software Freedom Conservancy",
    category: "Internship",
    focusArea: "Diversity & Equity in Free & Open Source Software",
    stipend: {
      amount: "$7,000 + $500",
      isPaid: true,
      currency: "USD",
      details: "$7,000 USD stipend + $500 travel/career stipend for conference attendance."
    },
    eligibility: {
      target: "Individuals subject to systemic bias or underrepresented in the tech industry",
      requiresStudent: false,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "May-Aug & Dec-Mar",
      cohorts: "2 Cohorts Annually",
      applicationsOpen: "Jan (May cohort) & Aug (Dec cohort)",
      applicationsClose: "Early Feb & Early Sept",
      codingPeriod: "3 months 100% remote full-time"
    },
    status: "Upcoming",
    featured: true,
    isEuropean: false,
    website: "https://www.outreachy.org",
    description: "Paid, remote internships in open source for people subject to systemic bias and impacted by underrepresentation in technical communities.",
    selectionTips: [
      "Write thorough, genuine initial essay answers detailing your lived experience and background.",
      "The 4-week public contribution period is decisive: record every commit, issue, and code review on your Outreachy dashboard.",
      "Help other applicants in the community channel; mentors observe collaborative spirit."
    ],
    notableOrgs: ["Mozilla", "GNOME", "Fedora", "Wikimedia", "Tor Project", "Debian"],
    techStack: ["Python", "JavaScript", "Rust", "C", "Ruby", "Technical Writing"],
    accentColor: "rose"
  },
  {
    id: "mlh-fellowship",
    name: "MLH Fellowship",
    shortName: "MLH",
    organizer: "Major League Hacking & GitHub",
    category: "Fellowship",
    focusArea: "Open Source Software Engineering & Production Engineering",
    stipend: {
      amount: "$1,000 - $3,000",
      isPaid: true,
      currency: "USD",
      details: "Educational stipend awarded on a need-basis depending on geography and cohort track."
    },
    eligibility: {
      target: "Students and early-career developers",
      requiresStudent: false,
      minAge: 18,
      regions: "Global (Check regional cohort availability)",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "Spring, Summer, Fall",
      cohorts: "3 Batches Annually",
      applicationsOpen: "Rolling basis year-round",
      applicationsClose: "2-3 months before each term",
      codingPeriod: "12-week intensive pods"
    },
    status: "Active",
    featured: true,
    isEuropean: false,
    website: "https://fellowship.mlh.io",
    description: "12-week remote internship alternative where students work in small mentored 'pods' contributing to major open-source tools like React, Jest, and Flask.",
    selectionTips: [
      "Prepare a clean GitHub code sample that you wrote independently (you will be asked to walk through it in an interview).",
      "Demonstrate strong communication and teamwork skills in the behavioral interview round.",
      "Apply early as admissions are evaluated on a rolling basis."
    ],
    notableOrgs: ["Meta Open Source", "GitHub", "Solana", "AWS", "Shopify"],
    techStack: ["TypeScript", "Python", "React", "Rust", "Go"],
    accentColor: "cyan"
  },
  {
    id: "summer-of-bitcoin",
    name: "Summer of Bitcoin",
    shortName: "SoB",
    organizer: "Summer of Bitcoin Foundation",
    category: "Mentorship",
    focusArea: "Bitcoin Core, Lightning Network, Cryptography & Privacy",
    stipend: {
      amount: "$1,500 - $3,000+",
      isPaid: true,
      currency: "USD (or BTC)",
      details: "Performance-based stipend disbursed in fiat or Bitcoin upon completing midterm and final milestones."
    },
    eligibility: {
      target: "University and college students worldwide",
      requiresStudent: true,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "May - August",
      cohorts: "Annual Global Program",
      applicationsOpen: "January 2026",
      applicationsClose: "Late February 2026",
      codingPeriod: "May – August (12 weeks)"
    },
    status: "Upcoming",
    featured: true,
    isEuropean: false,
    website: "https://www.summerofbitcoin.org",
    description: "Global mentorship program introducing university students to Bitcoin open-source development, Lightning Network protocols, and cryptographic design.",
    selectionTips: [
      "Complete the initial coding challenge and Bitcoin protocol quiz accurately.",
      "Study Bitcoin Core developer documentation and understand UTXO models, script validation, and P2P networking.",
      "Review past accepted proposals on the Summer of Bitcoin website."
    ],
    notableOrgs: ["Bitcoin Core", "LDK (Lightning Dev Kit)", "BDK (Bitcoin Dev Kit)", "Fedimint", "Stratum V2"],
    techStack: ["C++", "Rust", "Python", "Cryptography"],
    accentColor: "amber"
  },
  {
    id: "gsod",
    name: "Google Season of Docs",
    shortName: "GSoD",
    organizer: "Google Open Source",
    category: "Documentation",
    focusArea: "Technical Documentation, API References, User Guides & Tutorials",
    stipend: {
      amount: "$5,000 - $15,000",
      isPaid: true,
      currency: "USD",
      details: "Direct grants disbursed by host organizations to professional and aspiring technical writers."
    },
    eligibility: {
      target: "Technical writers, documentation engineers, and technical communicators",
      requiresStudent: false,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "All Levels"
    },
    timeline: {
      window: "May - November",
      cohorts: "Annual Program",
      applicationsOpen: "Organizations: Feb | Writers: April",
      applicationsClose: "May 2026",
      codingPeriod: "May – November (Flexible schedule)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: false,
    website: "https://developers.google.com/season-of-docs",
    description: "Brings technical writers and open source organizations together to build world-class documentation, API guides, and interactive developer onboarding.",
    selectionTips: [
      "Prepare a technical writing portfolio with clear sample documentation, architectural overviews, or guides.",
      "Reach out directly to accepted organizations when their documentation proposals are published in April.",
      "Demonstrate proficiency in docs-as-code tools (Markdown, MDX, Sphinx, MkDocs, Docusaurus)."
    ],
    notableOrgs: ["NumFOCUS", "Qdrant", "Knative", "PostgreSQL Docs", "SymPy"],
    techStack: ["Markdown", "Docusaurus", "Sphinx", "OpenAPI", "Git"],
    accentColor: "emerald"
  },
  {
    id: "sok",
    name: "Season of KDE",
    shortName: "SoK",
    organizer: "KDE Community",
    category: "Mentorship",
    focusArea: "Desktop Environments, Linux GUI Apps, Plasma, Kirigami & Qt",
    stipend: {
      amount: "Certificate + Swag",
      isPaid: false,
      currency: "Non-monetary",
      details: "Official KDE Certificate, exclusive merchandise, and travel sponsorship opportunities for Akademy conference."
    },
    eligibility: {
      target: "Anyone worldwide passionate about open source desktop and applications",
      requiresStudent: false,
      regions: "Worldwide",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "January - April",
      cohorts: "Annual Winter/Spring Program",
      applicationsOpen: "December 2025",
      applicationsClose: "January 2026",
      codingPeriod: "January – April (12 weeks)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: true,
    website: "https://season.kde.org",
    description: "An outreach program hosted by the KDE community for anyone who wants to contribute to the KDE ecosystem (Plasma, Krita, Digikam, Okular) with dedicated 1:1 mentorship.",
    selectionTips: [
      "Set up the KDE development environment via kdesrc-build.",
      "Solve a junior job issue on KDE Invent (GitLab).",
      "Interact with KDE mentors on Matrix / Libera Chat."
    ],
    notableOrgs: ["KDE Community", "Krita", "Kate Editor", "Kdenlive"],
    techStack: ["C++", "Qt", "QML", "Kirigami", "CMake"],
    accentColor: "blue"
  },
  {
    id: "ospp",
    name: "Open Source Promotion Plan",
    shortName: "OSPP",
    organizer: "Institute of Software, Chinese Academy of Sciences (ISCAS)",
    category: "Mentorship",
    focusArea: "Core Systems, Linux Distros, AI, Distributed Databases & Tooling",
    stipend: {
      amount: "8,000 - 12,000 RMB",
      isPaid: true,
      currency: "RMB (~$1,100 - $1,700 USD)",
      details: "Disbursed based on task difficulty: Basic projects (8,000 RMB) or Advanced projects (12,000 RMB)."
    },
    eligibility: {
      target: "College and university students globally (undergraduate and graduate)",
      requiresStudent: true,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "June - September",
      cohorts: "Annual Summer Program",
      applicationsOpen: "May 2026",
      applicationsClose: "Early June 2026",
      codingPeriod: "July – September (12 weeks)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: false,
    website: "https://summer-ospp.ac.cn",
    description: "Summer 2026 international open source program organizing global university students to develop software modules for prominent open-source communities.",
    selectionTips: [
      "Submit detailed development schedules with architectural diagrams.",
      "Check out Chinese & international projects supporting English proposals (openEuler, OpenHarmony, Apache).",
      "Communicate with mentors on Gitee / GitHub issue trackers."
    ],
    notableOrgs: ["openEuler", "OpenHarmony", "PaddlePaddle", "TiDB", "Apache Dubbo"],
    techStack: ["C", "C++", "Rust", "Go", "Java", "Python"],
    accentColor: "amber"
  },
  {
    id: "osoc-be",
    name: "open Summer of code (Europe / Belgium)",
    shortName: "oSOC",
    organizer: "Open Knowledge Belgium",
    category: "Internship",
    focusArea: "Civic Tech, Open Data, Digital Public Goods & European Innovation",
    stipend: {
      amount: "€1,800 - €2,200",
      isPaid: true,
      currency: "EUR",
      details: "Paid student employment contract during the 4-week program in Belgium/Europe."
    },
    eligibility: {
      target: "Students studying in Europe / European universities",
      requiresStudent: true,
      regions: "Europe / Belgium",
      experienceLevel: "All Levels"
    },
    timeline: {
      window: "July (4 weeks intensive)",
      cohorts: "Annual Summer Cohort",
      applicationsOpen: "February 2026",
      applicationsClose: "May 2026",
      codingPeriod: "Entire month of July (Full-time team sprint)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: true,
    website: "https://osoc.be",
    description: "4-week intensive sprint in July where Belgian and European students build open innovation tools for non-profits, government agencies, and civic tech startups.",
    selectionTips: [
      "Emphasize multidisciplinary teamwork: developers, UI/UX designers, and open data specialists work together in pods.",
      "Demonstrate enthusiasm for civic tech and open government data.",
      "Portfolio with user-facing web applications makes a strong impression."
    ],
    notableOrgs: ["Open Knowledge Belgium", "Flemish Government", "European Civic Tech"],
    techStack: ["TypeScript", "Vue/React", "Python", "GIS / OpenStreetMap", "Node.js"],
    accentColor: "blue"
  },
  {
    id: "esa-socis",
    name: "ESA Summer of Code in Space",
    shortName: "SOCIS",
    organizer: "European Space Agency (ESA)",
    category: "Mentorship",
    focusArea: "Spaceflight Dynamics, Satellite Telemetry, Astronomy & Aerospace",
    stipend: {
      amount: "~€4,000",
      isPaid: true,
      currency: "EUR",
      details: "Disbursed by ESA to selected university students upon successful milestone evaluations."
    },
    eligibility: {
      target: "Students enrolled in universities in ESA member states",
      requiresStudent: true,
      regions: "ESA Member States (Europe & Associate Members)",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "Summer period",
      cohorts: "Annual / Biennial Program",
      applicationsOpen: "Spring 2026",
      applicationsClose: "May 2026",
      codingPeriod: "June – August (12 weeks)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: true,
    website: "https://sophia.estec.esa.int/socis/",
    description: "The European Space Agency's initiative pairing aerospace and computer science students with open-source space software and satellite operations tools.",
    selectionTips: [
      "Highlight background in numerical computing, orbital mechanics, or physics engines.",
      "Contribute early to aerospace open source repos (Orekit, Poliastro, GMAT).",
      "Ensure proof of enrollment in an ESA member state university."
    ],
    notableOrgs: ["European Space Agency", "Libre Space Foundation", "Orekit Project"],
    techStack: ["Python", "C++", "Java", "Fortran", "Rust"],
    accentColor: "cyan"
  },
  {
    id: "cern-openlab",
    name: "CERN Summer Student & Openlab Programme",
    shortName: "CERN Openlab",
    organizer: "CERN (European Organization for Nuclear Research)",
    category: "Research",
    focusArea: "Scientific Computing, Distributed Systems, High-Energy Physics & AI",
    stipend: {
      amount: "~90 CHF / day (~€2,800/mo)",
      isPaid: true,
      currency: "CHF",
      details: "Generous daily living allowance covering Geneva accommodation and meals, plus travel reimbursement."
    },
    eligibility: {
      target: "Bachelor and Master students in Computer Science, Engineering, Mathematics, or Physics",
      requiresStudent: true,
      minAge: 18,
      regions: "Global (CERN Member & Non-Member states)",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "June - August",
      cohorts: "Annual Summer Cohort",
      applicationsOpen: "December 2025",
      applicationsClose: "Late January 2026",
      codingPeriod: "8 to 9 weeks in Geneva, Switzerland (Summer)"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: true,
    website: "https://openlab.cern/summer-student-programme",
    description: "Work on cutting-edge distributed computing, AI accelerators, and open scientific data infrastructure supporting the Large Hadron Collider in Geneva.",
    selectionTips: [
      "Strong academic record in systems programming, high-performance computing, or machine learning.",
      "Submit two strong recommendation letters from professors or technical supervisors.",
      "Include a compelling motivation letter outlining your experience with distributed systems."
    ],
    notableOrgs: ["CERN", "Worldwide LHC Computing Grid", "ROOT Project"],
    techStack: ["C++", "Python", "Linux Kernel", "Distributed Computing", "CUDA"],
    accentColor: "purple"
  },
  {
    id: "hyperledger-mentorship",
    name: "Hyperledger Mentorship Program",
    shortName: "Hyperledger",
    organizer: "Hyperledger Foundation & Linux Foundation",
    category: "Mentorship",
    focusArea: "Enterprise Blockchain, DLT, Cryptographic Identity & Supply Chain",
    stipend: {
      amount: "$1,300 - $3,000",
      isPaid: true,
      currency: "USD",
      details: "Stipend matched to mentee location, managed through the Linux Foundation mentorship framework."
    },
    eligibility: {
      target: "Students and professionals passionate about enterprise blockchain",
      requiresStudent: false,
      minAge: 18,
      regions: "Worldwide",
      experienceLevel: "Intermediate"
    },
    timeline: {
      window: "June - November",
      cohorts: "Annual Summer/Fall Program",
      applicationsOpen: "March 2026",
      applicationsClose: "Early April 2026",
      codingPeriod: "June – November"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: false,
    website: "https://wiki.hyperledger.org/display/INTERN",
    description: "Hands-on technical mentorship building enterprise distributed ledger tools (Hyperledger Fabric, Besu, Indy, Aries, FireFly).",
    selectionTips: [
      "Understand enterprise permissioned ledger architecture vs public proof-of-work chains.",
      "Contribute to Hyperledger Fabric or Besu bug reports.",
      "Join the Hyperledger Discord and community working group calls."
    ],
    notableOrgs: ["Hyperledger Fabric", "Hyperledger Besu", "Hyperledger Aries"],
    techStack: ["Go", "Java", "Rust", "Node.js", "Solidity"],
    accentColor: "purple"
  },
  {
    id: "fossasia-codeheat",
    name: "FOSSASIA Codeheat",
    shortName: "Codeheat",
    organizer: "FOSSASIA",
    category: "Event",
    focusArea: "Web Apps, Event Management, Hardware & AI",
    stipend: {
      amount: "Travel Grants + Swag",
      isPaid: false,
      currency: "Grants",
      details: "Top contributors win full travel grants to FOSSASIA Summit (Singapore or Berlin) plus certificates."
    },
    eligibility: {
      target: "Anyone worldwide (Special emphasis on APAC and European summits)",
      requiresStudent: false,
      regions: "Worldwide",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "October - March",
      cohorts: "Annual 6-Month Contest",
      applicationsOpen: "October 2025",
      applicationsClose: "March 2026",
      codingPeriod: "Active throughout the contest period"
    },
    status: "Active",
    featured: false,
    isEuropean: false,
    website: "https://codeheat.org",
    description: "Coding contest encouraging developers to contribute code, documentation, and reviews across FOSSASIA projects, with travel grants to the FOSSASIA Summit.",
    selectionTips: [
      "Focus on high quality merged PRs on Eventyay, Pocket Science Lab, or SUSI.AI.",
      "Help review other contributors' PRs to gain extra contest points.",
      "Participate actively in bi-weekly scrum meetings."
    ],
    notableOrgs: ["Eventyay", "PSLab", "FOSSASIA", "BadgeYay"],
    techStack: ["Python", "JavaScript", "Flutter", "Flask", "Docker"],
    accentColor: "rose"
  },
  {
    id: "hacktoberfest",
    name: "Hacktoberfest",
    shortName: "Hacktoberfest",
    organizer: "DigitalOcean, Cloudflare & GitHub",
    category: "Event",
    focusArea: "Introductory Open Source Contributions across GitHub & GitLab",
    stipend: {
      amount: "Digital Badges & Trees",
      isPaid: false,
      currency: "Non-monetary",
      details: "Digital verifiable Holopin badges, digital tree planting through Tree-Nation, and community recognition."
    },
    eligibility: {
      target: "Everyone, everywhere (Complete beginners welcome)",
      requiresStudent: false,
      regions: "Worldwide",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "October (1 month)",
      cohorts: "Annual October Event",
      applicationsOpen: "Late September 2026",
      applicationsClose: "October 31, 2026",
      codingPeriod: "October 1 – October 31"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: false,
    website: "https://hacktoberfest.com",
    description: "The world's largest month-long celebration of open-source software, encouraging developers of all backgrounds to submit 4 quality pull requests.",
    selectionTips: [
      "Look for repositories labeled with the 'hacktoberfest' topic on GitHub.",
      "Avoid spam PRs (adding your name to a list); focus on meaningful bug fixes or test cases.",
      "Ensure repository maintainers tag your PR with 'hacktoberfest-accepted'."
    ],
    notableOrgs: ["DigitalOcean", "GitLab", "GitHub", "Thousands of open-source repos"],
    techStack: ["All Programming Languages", "Git", "Markdown"],
    accentColor: "amber"
  },
  {
    id: "twenty-four-pull-requests",
    name: "24 Pull Requests",
    shortName: "24PRs",
    organizer: "24PullRequests Community",
    category: "Event",
    focusArea: "Giving Back to Open Source during the Holiday Season",
    stipend: {
      amount: "Digital Badges",
      isPaid: false,
      currency: "Non-monetary",
      details: "Community recognition, global leaderboard, and holiday contribution streak."
    },
    eligibility: {
      target: "Anyone worldwide",
      requiresStudent: false,
      regions: "Worldwide",
      experienceLevel: "Beginner Friendly"
    },
    timeline: {
      window: "December 1 - 24",
      cohorts: "Annual December Event",
      applicationsOpen: "December 1",
      applicationsClose: "December 24",
      codingPeriod: "Dec 1 – Dec 24"
    },
    status: "Upcoming",
    featured: false,
    isEuropean: false,
    website: "https://24pullrequests.com",
    description: "'Giving back little gifts of code for Christmas.' An initiative challenging developers to submit 24 pull requests between December 1st and December 24th.",
    selectionTips: [
      "Fix typos, improve documentation, or submit accessibility fixes for your favorite libraries.",
      "Check the 24 Pull Requests project suggestions feed.",
      "Pace yourself: 1 PR a day keeps the codebase clean!"
    ],
    notableOrgs: ["Open source projects across GitHub"],
    techStack: ["All Tech Stacks"],
    accentColor: "emerald"
  }
];

export interface PlannerMilestone {
  quarter: "Q1 2026" | "Q2 2026" | "Q3 2026" | "Q4 2026";
  month: string;
  title: string;
  badge: string;
  badgeVariant: "urgent" | "active" | "prep" | "upcoming";
  description: string;
  actionUrl?: string;
  actionText?: string;
  programIds: string[];
}

export const MASTER_TIMELINE_2026: PlannerMilestone[] = [
  {
    quarter: "Q1 2026",
    month: "January 2026",
    title: "Summer of Bitcoin & CERN Deadlines, SoK Mentoring",
    badge: "Applications Open",
    badgeVariant: "active",
    description: "Summer of Bitcoin applications open. CERN Summer Student & Openlab applications close Jan 31. Season of KDE mentoring starts.",
    programIds: ["summer-of-bitcoin", "cern-openlab", "sok"]
  },
  {
    quarter: "Q1 2026",
    month: "February 2026",
    title: "GSoC Organizations Announced & LFX Spring Kickoff",
    badge: "Critical Recon Phase",
    badgeVariant: "urgent",
    description: "Google announces official GSoC 2026 mentoring organizations. Outreachy May cohort applications open. LFX Spring term begins.",
    actionUrl: "/gsoc",
    actionText: "Explore GSoC Orgs",
    programIds: ["gsoc", "lfx", "outreachy"]
  },
  {
    quarter: "Q1 2026",
    month: "March 2026",
    title: "ESoC Project Batches & GSoC Proposal Submission",
    badge: "High Stakes Proposals",
    badgeVariant: "urgent",
    description: "European Summer of Code (ESoC) announces project batches. GSoC proposal submission window opens (Mar 17 - Apr 7).",
    actionUrl: "https://www.esoc.dev",
    actionText: "Visit esoc.dev",
    programIds: ["esoc", "gsoc", "hyperledger-mentorship"]
  },
  {
    quarter: "Q2 2026",
    month: "April 2026",
    title: "GSoC Proposal Deadline & ESoC Matching",
    badge: "Evaluation Period",
    badgeVariant: "prep",
    description: "GSoC proposals close. European Summer of Code hubs review applicants and match contributors with mentors. oSOC Belgium opens.",
    programIds: ["gsoc", "esoc", "osoc-be"]
  },
  {
    quarter: "Q2 2026",
    month: "May 2026",
    title: "GSoC & ESoC Accepted Contributors Announced",
    badge: "Coding Begins",
    badgeVariant: "active",
    description: "GSoC acceptance results announced May 8. ESoC teams finalize kickoff. Community bonding period begins; official coding starts late May.",
    programIds: ["gsoc", "esoc", "summer-of-bitcoin", "outreachy"]
  },
  {
    quarter: "Q2 2026",
    month: "June 2026",
    title: "Summer Coding Sprints & LFX Summer Term",
    badge: "Peak Development",
    badgeVariant: "active",
    description: "GSoC, ESoC, and Summer of Bitcoin coding in full swing. LFX Summer mentorship cohort begins. OSPP student development commences.",
    programIds: ["gsoc", "esoc", "lfx", "ospp"]
  },
  {
    quarter: "Q3 2026",
    month: "July 2026",
    title: "Midterm Evaluations & oSOC Belgium Month",
    badge: "Milestone Reviews",
    badgeVariant: "urgent",
    description: "Midterm evaluations for GSoC, ESoC, and Summer of Bitcoin. First stipend payouts disbursed. oSOC 4-week team sprint in Europe.",
    programIds: ["gsoc", "esoc", "osoc-be", "summer-of-bitcoin"]
  },
  {
    quarter: "Q3 2026",
    month: "August 2026",
    title: "Final Code Submissions & Outreachy Dec Round",
    badge: "Final Evaluations",
    badgeVariant: "active",
    description: "Final code reviews and student evaluations for GSoC and ESoC. Outreachy opens initial applications for December 2026 cohort.",
    programIds: ["gsoc", "esoc", "outreachy"]
  },
  {
    quarter: "Q3 2026",
    month: "September 2026",
    title: "LFX Fall Cohort & GSoC Final Results",
    badge: "Graduation & Results",
    badgeVariant: "prep",
    description: "GSoC final results published. LFX Fall mentorship term starts. Prep begins for October global open source celebrations.",
    programIds: ["gsoc", "lfx"]
  },
  {
    quarter: "Q4 2026",
    month: "October 2026",
    title: "Hacktoberfest & FOSSASIA Codeheat Kickoff",
    badge: "Global Celebration",
    badgeVariant: "active",
    description: "Hacktoberfest kicks off worldwide! FOSSASIA Codeheat coding contest starts. Ideal month to make your first beginner pull requests.",
    actionUrl: "/issues",
    actionText: "Find Good First Issues",
    programIds: ["hacktoberfest", "fossasia-codeheat"]
  },
  {
    quarter: "Q4 2026",
    month: "November 2026",
    title: "Extended GSoC Wrap-up & LFX Spring Planning",
    badge: "Project Handover",
    badgeVariant: "prep",
    description: "Extended 22-week GSoC projects wrap up. Organizations review contributions and outline 2027 project ideas.",
    programIds: ["gsoc", "lfx"]
  },
  {
    quarter: "Q4 2026",
    month: "December 2026",
    title: "24 Pull Requests & Outreachy Dec Cohort",
    badge: "Year-End Holiday Sprints",
    badgeVariant: "active",
    description: "24 Pull Requests holiday challenge. Outreachy December 2026 cohort begins full-time remote internships. Season of KDE 2027 apps open.",
    programIds: ["twenty-four-pull-requests", "outreachy", "sok"]
  }
];

export const ACCEPTANCE_PLAYBOOK_STEPS = [
  {
    step: "01",
    title: "Pre-Application Reconnaissance (60 Days Prior)",
    subtitle: "Do not wait for program application forms to open",
    desc: "Pick 1 primary organization and 1 backup. Clone their repository, run their test suite locally, and join their communication platform (Discord, Slack, Zulip, or Matrix). Review the last 20 merged pull requests to understand maintainer standards.",
    firstPrLink: "/workflow",
    firstPrLinkText: "Master Workflow Mental Model"
  },
  {
    step: "02",
    title: "The 'Foot-in-the-Door' First Contribution",
    subtitle: "Solve a real friction point before asking for mentorship",
    desc: "Never introduce yourself by asking 'Can someone assign me a task?'. Instead, find a broken hyperlink in documentation, a failing test in Docker CI, or an issue marked 'good first issue'. Submit a clean, atomic PR with Conventional Commits.",
    firstPrLink: "/issues",
    firstPrLinkText: "Browse Good First Issues"
  },
  {
    step: "03",
    title: "High-Signal Community Etiquette",
    subtitle: "Public curiosity over private DMs",
    desc: "Always ask questions in public project channels, never in mentors' private direct messages. Show your research: 'I read docs/setup.md and reproduced error X on Ubuntu 24.04. I inspected line 42 of auth.go. Would approach A or B be preferred?'.",
    firstPrLink: "/learn/04",
    firstPrLinkText: "Study Module 04: Community Etiquette"
  },
  {
    step: "04",
    title: "The Unrejectable Proposal Blueprint",
    subtitle: "Concrete deliverables beat hand-waving ideas",
    desc: "Every winning proposal contains 4 parts: (1) Technical architecture diagram, (2) Weekly milestone schedule with testable deliverables, (3) Pull request links showing prior contributions in the repo, (4) Risk mitigation and post-program commitment.",
    firstPrLink: "/gsoc",
    firstPrLinkText: "View Proposal Blueprint"
  },
  {
    step: "05",
    title: "Post-Submission Engagement",
    subtitle: "Stay active while proposals are reviewed",
    desc: "Maintainers evaluate who will stay in the project after the stipend ends. Keep reviewing incoming PRs, helping other newcomers in Discord/Slack, and testing release candidates during the 4-week review window.",
    firstPrLink: "/lab",
    firstPrLinkText: "Practice in Git Lab"
  }
];

export interface MonthProgramDeadline {
  programId: string;
  name: string;
  badge: string;
  dateRange: string;
  actionText?: string;
  actionUrl?: string;
  isUrgent?: boolean;
  isEuropean?: boolean;
}

export interface MonthPlan {
  monthIndex: number; // 0 to 11
  monthName: string; // "January", "February", ...
  shortName: string; // "Jan", "Feb", ...
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  focusTag: string;
  phaseType: "recon" | "proposals" | "evaluation" | "bonding" | "coding" | "midterms" | "wrapup" | "celebration";
  headline: string;
  summary: string;
  programs: MonthProgramDeadline[];
  targets: string[];
  checklist: string[];
  proTip: {
    author: string;
    role: string;
    advice: string;
  };
  firstPrAction: {
    title: string;
    description: string;
    link: string;
    linkText: string;
  };
}

export const MONTH_PLANS_2026: MonthPlan[] = [
  {
    monthIndex: 0,
    monthName: "January",
    shortName: "Jan",
    quarter: "Q1",
    year: 2026,
    focusTag: "Early Recon & Bitcoin / CERN",
    phaseType: "recon",
    headline: "Pre-Season Reconnaissance & European Science Fellowships",
    summary: "The quietest month on GitHub is your highest-leverage advantage. While other candidates wait for official organization announcements, start scoping repositories, configuring your local toolchain, and targeting winter science deadlines.",
    programs: [
      {
        programId: "summer-of-bitcoin",
        name: "Summer of Bitcoin",
        badge: "Applications Open",
        dateRange: "Jan 1 – Feb 15",
        actionText: "Apply on SummerOfBitcoin.org",
        actionUrl: "https://www.summerofbitcoin.org",
        isUrgent: true
      },
      {
        programId: "cern-openlab",
        name: "CERN Summer Student & Openlab",
        badge: "Hard Deadline Jan 31",
        dateRange: "Closes Jan 31",
        actionText: "CERN Careers Portal",
        actionUrl: "https://openlab.cern",
        isUrgent: true,
        isEuropean: true
      },
      {
        programId: "sok",
        name: "Season of KDE",
        badge: "Mentoring Starts",
        dateRange: "Jan 15 Kickoff",
        actionText: "KDE Community Wiki",
        actionUrl: "https://season.kde.org"
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Spring)",
        badge: "Applications Review",
        dateRange: "Closes mid-Jan",
        actionText: "LFX Portal",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      }
    ],
    targets: [
      "Select 2 technical domains (e.g. Applied AI, Cloud Native/Kubernetes, Systems Rust).",
      "Setup local development environment with Git SSH keys, GPG signing, and Docker.",
      "Explore 2024/2025 accepted GSoC organizations to identify evergreen open-source projects.",
      "Submit at least 1 warm-up PR (fixing documentation typos or broken test fixtures)."
    ],
    checklist: [
      "Audit your GitHub profile: clear bio, pinned repositories, and contact info.",
      "Clone 2 candidate repositories and run their test suites locally.",
      "Join target project communication hubs (Discord, Slack, Zulip, or Matrix).",
      "Read the repo's CONTRIBUTING.md, CODE_OF_CONDUCT.md, and recent merged PRs.",
      "Complete CERN Openlab or Summer of Bitcoin application forms if eligible."
    ],
    proTip: {
      author: "Alexandre Moreau",
      role: "GSoC & ESoC Maintainer",
      advice: "Candidates who appear in January before organizations are officially announced have a 3x higher acceptance rate. Maintainers remember who genuinely cared about the codebase before stipends were on the table."
    },
    firstPrAction: {
      title: "Master Git Workflow & Safety",
      description: "Learn the 3 Safe Places mental model so you never lose code or panic during rebase.",
      link: "/workflow",
      linkText: "View Interactive Workflow"
    }
  },
  {
    monthIndex: 1,
    monthName: "February",
    shortName: "Feb",
    quarter: "Q1",
    year: 2026,
    focusTag: "GSoC Orgs Drop & Outreachy",
    phaseType: "recon",
    headline: "Google Announces Official Orgs & Outreachy May Round Opens",
    summary: "The open source calendar explodes into action late February. Google reveals the 175+ accepted mentoring organizations. Immediately triage the list, find matching tech stacks, and start introducing yourself in public channels.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Orgs Announced Feb 26",
        dateRange: "Feb 26 Org Reveal",
        actionText: "Explore GSoC 2026 Orgs",
        actionUrl: "/gsoc",
        isUrgent: true
      },
      {
        programId: "outreachy",
        name: "Outreachy (May Cohort)",
        badge: "Initial Apps Open",
        dateRange: "Feb 2 – Feb 16",
        actionText: "Outreachy Portal",
        actionUrl: "https://www.outreachy.org",
        isUrgent: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Spring)",
        badge: "Term Commences",
        dateRange: "Starts Mar 1",
        actionText: "LFX Mentorships",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      },
      {
        programId: "ospp",
        name: "Open Source Promotion Plan (OSPP)",
        badge: "Org Registration",
        dateRange: "Feb 10 – Mar 10",
        actionText: "OSPP China Portal",
        actionUrl: "https://summer-ospp.ac.cn"
      }
    ],
    targets: [
      "Filter the newly announced GSoC organizations by your programming languages.",
      "Shortlist exactly 1 primary organization and 1 backup organization.",
      "Introduce yourself in the project's public chatroom with your technical background.",
      "Submit an issue comment proposing a concrete fix for a Good First Issue."
    ],
    checklist: [
      "Read the organization's official GSoC 2026 Ideas List in detail.",
      "Ask in public channels: 'Is idea #3 still open, and where should I look in the codebase?'.",
      "Do NOT send private direct messages to mentors or admins.",
      "Submit your initial contribution PR (a test case, doc clarification, or lint fix).",
      "If applying to Outreachy, complete the eligibility essays before mid-February."
    ],
    proTip: {
      author: "Elena Rostova",
      role: "Linux Foundation Project Lead",
      advice: "Do not post 'Hello, I want to contribute to GSoC, please guide me'. Instead say: 'I cloned the repo, reproduced issue #142 on Ubuntu 24.04, and found the logic error in parser.go:88. Would you prefer approach A or B?'. That wins instant respect."
    },
    firstPrAction: {
      title: "Find Good First Issues",
      description: "Search curated issues tagged by difficulty and language across top open source projects.",
      link: "/issues",
      linkText: "Browse Good First Issues"
    }
  },
  {
    monthIndex: 2,
    monthName: "March",
    shortName: "Mar",
    quarter: "Q1",
    year: 2026,
    focusTag: "ESoC Batches & Proposal Sprint",
    phaseType: "proposals",
    headline: "ESoC Project Batches Drop & GSoC Proposal Submissions Open",
    summary: "The most critical 30 days of the year for open-source fellowships. European Summer of Code releases applied AI project listings on esoc.dev, and the GSoC submission portal officially opens. Draft, polish, and submit your architectural proposals.",
    programs: [
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "AI Project Batches Open",
        dateRange: "March 1 Launch",
        actionText: "Explore esoc.dev Projects",
        actionUrl: "https://www.esoc.dev",
        isUrgent: true,
        isEuropean: true
      },
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Proposals Open Mar 17",
        dateRange: "Mar 17 – Apr 7",
        actionText: "Proposal Guidelines",
        actionUrl: "/gsoc",
        isUrgent: true
      },
      {
        programId: "hyperledger-mentorship",
        name: "Hyperledger Mentorship",
        badge: "Applications Open",
        dateRange: "Mar 1 – Apr 10",
        actionText: "Hyperledger Wiki",
        actionUrl: "https://wiki.hyperledger.org/display/INTERN"
      },
      {
        programId: "processing-fellowship",
        name: "Processing Foundation Fellowship",
        badge: "Annual Open Call",
        dateRange: "Closes late March",
        actionText: "Processing Foundation",
        actionUrl: "https://processingfoundation.org"
      }
    ],
    targets: [
      "Review European Summer of Code AI & decentralized project batches on esoc.dev.",
      "Draft a 10-page technical proposal using the Unrejectable Proposal Blueprint.",
      "Include technical architecture diagrams (Mermaid / ASCII) and a 12-week breakdown.",
      "Have at least 1-2 merged pull requests in the target repository to prove commit capability."
    ],
    checklist: [
      "Share your proposal Google Doc with mentors for feedback at least 7 days before cut-off.",
      "Ensure mentor comments are enabled in the Google Doc sharing settings.",
      "Incorporate mentor feedback into the proposal draft.",
      "Reference your prior merged PRs inside Section 4 of your proposal.",
      "Submit draft directly through the official GSoC / ESoC portal before deadline week."
    ],
    proTip: {
      author: "Dr. Stefan Weber",
      role: "European Open Source AI Consortium",
      advice: "Mentors rank proposals based on feasibility and proof of competence. If your proposal includes concrete benchmarks, architecture diagrams, and links to your previous PRs, you will beat 95% of candidates who just write generic buzzwords."
    },
    firstPrAction: {
      title: "GSoC Proposal Blueprint",
      description: "Review the exact 4-part structure that secures top mentor rankings and acceptance.",
      link: "/gsoc",
      linkText: "View Proposal Blueprint"
    }
  },
  {
    monthIndex: 3,
    monthName: "April",
    shortName: "Apr",
    quarter: "Q2",
    year: 2026,
    focusTag: "GSoC Deadline & ESoC Matching",
    phaseType: "evaluation",
    headline: "GSoC Hard Submission Cutoff & European Hub Review Sprints",
    summary: "April begins with the high-stakes GSoC deadline (April 7 at 18:00 UTC sharp). Afterward, organizations enter an intensive review and ranking period. Maintain community presence and continue submitting small PRs while mentors evaluate.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Hard Cutoff Apr 7 (18:00 UTC)",
        dateRange: "Closes Apr 7",
        actionText: "GSoC Student Guide",
        actionUrl: "https://google.github.io/gsocguides/student/",
        isUrgent: true
      },
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "Regional Hub Matching",
        dateRange: "Closes Apr 25",
        actionText: "Visit esoc.dev",
        actionUrl: "https://www.esoc.dev",
        isUrgent: true,
        isEuropean: true
      },
      {
        programId: "osoc-be",
        name: "open Summer of code (oSOC Belgium)",
        badge: "Student Applications Open",
        dateRange: "Apr 1 – May 1",
        actionText: "oSOC Belgium Site",
        actionUrl: "https://osoc.be",
        isEuropean: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Summer)",
        badge: "Summer Term Apps Open",
        dateRange: "Apr 15 – May 15",
        actionText: "LFX Mentorship Portal",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      }
    ],
    targets: [
      "Submit final PDF proposal to the Google Summer of Code portal before April 7.",
      "Complete ESoC contributor verification and preliminary PR on host European repositories.",
      "Stay active in project communication channels while maintainers score proposals.",
      "Prepare your summer development workstation (Docker environments, GPUs, dependencies)."
    ],
    checklist: [
      "Verify PDF proposal uploaded properly with non-corrupted font rendering.",
      "Do NOT ask mentors 'Did I get selected?' during the private evaluation window.",
      "Review incoming PRs from other contributors to demonstrate peer collaboration.",
      "Apply for LFX Summer 2026 Linux Foundation opportunities opening mid-April.",
      "Explore oSOC Belgium if based in Europe or interested in open data."
    ],
    proTip: {
      author: "Priya Sharma",
      role: "CNCF & GSoC Mentor",
      advice: "The biggest mistake applicants make is vanishing the minute they submit their proposal. When mentors have two equally good proposals, they invariably award the slot to the person who stayed in Discord and helped review issues."
    },
    firstPrAction: {
      title: "Interactive Git Lab",
      description: "Practice interactive rebases, atomic commit splitting, and conflict resolution in sandbox.",
      link: "/lab",
      linkText: "Practice in Git Lab"
    }
  },
  {
    monthIndex: 4,
    monthName: "May",
    shortName: "May",
    quarter: "Q2",
    year: 2026,
    focusTag: "Selection Results & Bonding",
    phaseType: "bonding",
    headline: "Accepted Contributors Announced & Community Bonding Kicks Off",
    summary: "Google announces accepted contributors on May 8. ESoC teams finalize developer allocations. The Community Bonding period begins immediately—align expectations with your mentor, set up milestones, and prepare for kickoff.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Results Announced May 8",
        dateRange: "May 8 Reveal",
        actionText: "Check Selection List",
        actionUrl: "https://summerofcode.withgoogle.com",
        isUrgent: true
      },
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "Kickoff & Mentor Allocation",
        dateRange: "May 12 – May 25",
        actionText: "ESoC Community Hub",
        actionUrl: "https://www.esoc.dev",
        isEuropean: true
      },
      {
        programId: "outreachy",
        name: "Outreachy (May Cohort)",
        badge: "Internships Begin",
        dateRange: "Starts late May",
        actionText: "Outreachy Dashboard",
        actionUrl: "https://www.outreachy.org"
      },
      {
        programId: "summer-of-bitcoin",
        name: "Summer of Bitcoin",
        badge: "Mentorship Kickoff",
        dateRange: "May 15 Kickoff",
        actionText: "Summer of Bitcoin",
        actionUrl: "https://www.summerofbitcoin.org"
      }
    ],
    targets: [
      "Schedule your kickoff video call with designated mentor(s).",
      "Agree on communication cadence (weekly 1:1, async daily standups, timezone overlaps).",
      "Break down proposal deliverables into GitHub Milestones and project issues.",
      "Begin official coding on May 25 with atomic, well-tested commits."
    ],
    checklist: [
      "Set up meeting calendar invites and document notes link.",
      "Verify code repository permissions, branch protection rules, and CI secrets.",
      "Publish your 'Week 0' contributor introduction blog post.",
      "If not selected: ask for constructive feedback gracefully and transition to LFX or ESoC.",
      "Submit first small preparatory PR before official coding begins."
    ],
    proTip: {
      author: "Marcus Lindqvist",
      role: "Debian & ESoC Mentor",
      advice: "Over-communicate in week 1. Tell your mentor: 'I plan to work on issue #101 today, will submit a draft PR by Thursday, and will summarize blockers in Slack on Friday.' Predictability is the #1 trait mentors value."
    },
    firstPrAction: {
      title: "Module 05: The Unrejectable PR",
      description: "Learn how to format PR descriptions, link issues, and craft clean Conventional Commits.",
      link: "/learn/05",
      linkText: "Study Module 05"
    }
  },
  {
    monthIndex: 5,
    monthName: "June",
    shortName: "Jun",
    quarter: "Q2",
    year: 2026,
    focusTag: "Summer Coding Sprints & LFX",
    phaseType: "coding",
    headline: "Peak Summer Coding Sprints & LFX Summer Term Commences",
    summary: "Full speed ahead. GSoC, ESoC, and Summer of Bitcoin contributors push daily code. LFX Mentorship Summer Term begins across Linux Kernel, CNCF, and PyTorch projects. Keep PR sizes small and maintain high test coverage.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Coding Weeks 1 to 5",
        dateRange: "Full Month Sprint",
        actionText: "Contributor Dashboard",
        actionUrl: "https://summerofcode.withgoogle.com",
        isUrgent: false
      },
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "AI Model Development Sprint",
        dateRange: "Weeks 1 – 6",
        actionText: "esoc.dev Portal",
        actionUrl: "https://www.esoc.dev",
        isEuropean: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Summer)",
        badge: "Summer Term Kickoff",
        dateRange: "Starts June 1",
        actionText: "LFX Summer Projects",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org",
        isUrgent: true
      },
      {
        programId: "ospp",
        name: "OSPP China",
        badge: "Student Development Begins",
        dateRange: "Starts mid-June",
        actionText: "OSPP Tasks",
        actionUrl: "https://summer-ospp.ac.cn"
      }
    ],
    targets: [
      "Ship small, incremental pull requests every 3–4 days rather than one giant branch.",
      "Keep feature branches rebased against the upstream default branch.",
      "Write unit and integration tests for every new module authored.",
      "Publish bi-weekly progress updates on your personal technical blog."
    ],
    checklist: [
      "Never let a pull request exceed 400 lines of diff if possible.",
      "Maintain 100% passing tests in GitHub Actions CI prior to asking for review.",
      "Document architectural design decisions in ADRs or Markdown docs.",
      "Flag potential timeline slips to your mentor at least 10 days in advance.",
      "Actively review open community issues related to your feature area."
    ],
    proTip: {
      author: "Sarah Jenkins",
      role: "Kubernetes SIG Contributor & LFX Mentor",
      advice: "A 2,000-line pull request is a nightmare for busy maintainers to review and will sit unmerged for weeks. Split your work into logical layers: data models first, then core logic, then API endpoints, then UI."
    },
    firstPrAction: {
      title: "Safe Sync & Upstream Workflow",
      description: "Review the correct git fetch & rebase commands to avoid messy merge bubbles.",
      link: "/workflow",
      linkText: "Inspect Sync Architecture"
    }
  },
  {
    monthIndex: 6,
    monthName: "July",
    shortName: "Jul",
    quarter: "Q3",
    year: 2026,
    focusTag: "Midterm Evaluations & oSOC",
    phaseType: "midterms",
    headline: "Midterm Milestone Reviews & European Innovation Sprints",
    summary: "The formal halfway point of summer open-source programs. GSoC and ESoC midterm evaluations take place between July 13 and July 18. Successful candidates receive their first milestone stipend disbursements.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Midterms July 13 – 18",
        dateRange: "July 13 – 18",
        actionText: "Submit Evaluation",
        actionUrl: "https://summerofcode.withgoogle.com",
        isUrgent: true
      },
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "Midterm Benchmarks",
        dateRange: "Mid-July Evaluation",
        actionText: "Hub Milestone Review",
        actionUrl: "https://www.esoc.dev",
        isUrgent: true,
        isEuropean: true
      },
      {
        programId: "osoc-be",
        name: "open Summer of code (oSOC Belgium)",
        badge: "Intensive 4-Week Sprint",
        dateRange: "Full July Sprint",
        actionText: "oSOC Live Demo Day",
        actionUrl: "https://osoc.be",
        isEuropean: true
      },
      {
        programId: "summer-of-bitcoin",
        name: "Summer of Bitcoin",
        badge: "Midterm Demos",
        dateRange: "July 20 – 25",
        actionText: "Bitcoin Projects",
        actionUrl: "https://www.summerofbitcoin.org"
      }
    ],
    targets: [
      "Complete all Milestone 1 deliverables outlined in your original proposal.",
      "Submit your midterm contributor evaluation form to Google / European hub.",
      "Confirm initial stipend disbursement details with your banking institution.",
      "Rescale remaining scope for the second half of summer in consultation with your mentor."
    ],
    checklist: [
      "Ensure all code merged during Phase 1 is covered by automated integration tests.",
      "Provide constructive, respectful feedback on your mentor's support in the survey.",
      "Conduct a live mid-term code walkthrough demonstration with project leads.",
      "If behind schedule, formally descope nice-to-have features to protect core requirements.",
      "Write a mid-term retrospective blog post showcasing working software."
    ],
    proTip: {
      author: "David Vanecek",
      role: "Red Hat Senior Principal Software Engineer",
      advice: "Midterm evaluations are pass/fail. Mentors do not expect perfection, but they do expect honesty. If you encountered unforeseen technical roadblocks, tell them immediately and adjust the roadmap together."
    },
    firstPrAction: {
      title: "FirstPR Git Rescue Center",
      description: "Instant commands to recover detached HEADs, fix bad merges, or undo botched rebases.",
      link: "/rescue",
      linkText: "Open Git Rescue"
    }
  },
  {
    monthIndex: 7,
    monthName: "August",
    shortName: "Aug",
    quarter: "Q3",
    year: 2026,
    focusTag: "Final Code Delivery & Outreachy",
    phaseType: "wrapup",
    headline: "Final Code Submissions & Outreachy Winter Cohort Applications",
    summary: "The final sprint for standard 12-week contributors. Complete code cleanup, finish documentation, write final evaluation reports, and submit before the August 31 cutoff. Simultaneously, Outreachy opens applications for its winter round.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Final Code Due Aug 24 – 31",
        dateRange: "Aug 24 – 31",
        actionText: "Submit Final Work",
        actionUrl: "https://summerofcode.withgoogle.com",
        isUrgent: true
      },
      {
        programId: "esoc",
        name: "European Summer of Code (ESoC)",
        badge: "Final Project Delivery",
        dateRange: "Aug 20 – 31",
        actionText: "European Hub Submission",
        actionUrl: "https://www.esoc.dev",
        isUrgent: true,
        isEuropean: true
      },
      {
        programId: "outreachy",
        name: "Outreachy (Dec Cohort)",
        badge: "Initial Apps Open Aug 10",
        dateRange: "Aug 10 – Aug 25",
        actionText: "Outreachy Winter Apps",
        actionUrl: "https://www.outreachy.org",
        isUrgent: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Fall)",
        badge: "Fall Term Applications Open",
        dateRange: "Aug 15 – Sept 1",
        actionText: "LFX Fall Listings",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      }
    ],
    targets: [
      "Submit all remaining pull requests for your core deliverables.",
      "Author the official Final Work Product submission page (GitHub Gist or blog post).",
      "Include list of merged commits, pull requests, open issues, and future work items.",
      "Submit final contributor evaluation before Google / ESoC system deadlines."
    ],
    checklist: [
      "Verify your final submission URL is public and accessible without login.",
      "Ensure all merged code is documented in README, user guides, or API references.",
      "Tag project maintainers for final review approvals.",
      "If interested in winter internships, submit Outreachy initial essays before late August.",
      "Send a heartfelt thank-you message to your mentors for their time and guidance."
    ],
    proTip: {
      author: "Nadia Eghbal",
      role: "Open Source Researcher & Author",
      advice: "Your final GSoC/ESoC submission report is a permanent artifact linked on Google's archives forever. Treat it like your premier engineering portfolio piece. Include architecture diagrams, demo GIFs, and performance metrics."
    },
    firstPrAction: {
      title: "Module 06: Open Source Portfolio",
      description: "Transform your summer pull requests into compelling engineering resume highlights.",
      link: "/learn/06",
      linkText: "Study Module 06"
    }
  },
  {
    monthIndex: 8,
    monthName: "September",
    shortName: "Sep",
    quarter: "Q3",
    year: 2026,
    focusTag: "Results, LFX Fall & Hacktober Prep",
    phaseType: "celebration",
    headline: "GSoC Final Results Announced & Hacktoberfest Pre-Registration",
    summary: "Google officially certifies successful 2026 contributors on September 4, and final stipend installments are paid out. LFX Fall Mentorship kicks off, while the global open-source community gears up for Hacktoberfest in October.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (GSoC)",
        badge: "Final Results Sept 4",
        dateRange: "Sept 4 Results",
        actionText: "View Certificate Portal",
        actionUrl: "https://summerofcode.withgoogle.com",
        isUrgent: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Fall)",
        badge: "Fall Term Kickoff",
        dateRange: "Sept 1 – Nov 30",
        actionText: "LFX Fall Dashboard",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      },
      {
        programId: "season-of-docs",
        name: "Google Season of Docs",
        badge: "Final Evaluations",
        dateRange: "Mid September",
        actionText: "GSoD Case Studies",
        actionUrl: "https://developers.google.com/season-of-docs"
      },
      {
        programId: "hacktoberfest",
        name: "Hacktoberfest 2026",
        badge: "Pre-Registration Opens",
        dateRange: "Late September",
        actionText: "Hacktoberfest Official",
        actionUrl: "https://hacktoberfest.com"
      }
    ],
    targets: [
      "Download official GSoC / ESoC completion certificate and tax/stipend receipts.",
      "Add completion credentials to your LinkedIn, Resume, and GitHub README profile.",
      "Transition from student contributor to ongoing community peer or triage volunteer.",
      "Scout 3–5 repositories participating in upcoming Hacktoberfest."
    ],
    checklist: [
      "Verify second and final stipend installment posted to your account.",
      "Publish your complete summer experience post-mortem blog post.",
      "Remain active in the repository: review newcomer PRs and fix minor regressions.",
      "Bookmark interesting open source projects to contribute to during October.",
      "Sign up on the Hacktoberfest portal when registration opens."
    ],
    proTip: {
      author: "Chris Wanstrath",
      role: "Open Source Creator",
      advice: "The most impactful contributors don't disappear after graduation. When an ex-student stays in the repo to review incoming PRs from the next generation, maintainers nominate them for core committer status."
    },
    firstPrAction: {
      title: "Good First Issue Finder",
      description: "Locate beginner-friendly issues across 10,000+ active open-source repositories.",
      link: "/issues",
      linkText: "Find Next Issues"
    }
  },
  {
    monthIndex: 9,
    monthName: "October",
    shortName: "Oct",
    quarter: "Q4",
    year: 2026,
    focusTag: "Hacktoberfest & FOSS Sprints",
    phaseType: "celebration",
    headline: "Hacktoberfest Worldwide Celebration & FOSSASIA Codeheat",
    summary: "The world's largest open source festival kicks off. For 31 days, hundreds of thousands of developers submit pull requests across participating repositories. Perfect timing for beginners to score their first PRs or explore new frameworks.",
    programs: [
      {
        programId: "hacktoberfest",
        name: "Hacktoberfest 2026",
        badge: "Live All Month (Oct 1 – 31)",
        dateRange: "Oct 1 – 31",
        actionText: "Register on Hacktoberfest",
        actionUrl: "https://hacktoberfest.com",
        isUrgent: true
      },
      {
        programId: "fossasia-codeheat",
        name: "FOSSASIA Codeheat",
        badge: "Annual Contest Begins",
        dateRange: "Oct 1 Kickoff",
        actionText: "Codeheat Contest Site",
        actionUrl: "https://codeheat.org",
        isUrgent: true
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Fall)",
        badge: "Midterm Sprints",
        dateRange: "Mid-October",
        actionText: "LFX Dashboard",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      },
      {
        programId: "github-universe",
        name: "GitHub Universe",
        badge: "Open Source Keynotes",
        dateRange: "Late October",
        actionText: "GitHub Universe Live",
        actionUrl: "https://githubuniverse.com"
      }
    ],
    targets: [
      "Submit 4 high-quality, approved pull requests to participating public GitHub repos.",
      "Avoid spam or cosmetic PRs (e.g. adding whitespace or trivial typo edits).",
      "Contribute meaningful bug fixes, unit tests, or accessibility improvements.",
      "Support fellow contributors by testing their PR branches locally."
    ],
    checklist: [
      "Ensure target repos have the `hacktoberfest` topic or maintainers apply the label.",
      "Check PR status on the official Hacktoberfest tracking dashboard.",
      "Wait out the mandatory 7-day review waiting period for spam verification.",
      "Participate in local or virtual Hacktoberfest meetups and hackathons.",
      "Claim your digital tree planting or badge reward upon completing 4 PRs."
    ],
    proTip: {
      author: "Quincy Larson",
      role: "freeCodeCamp Founder",
      advice: "Never make spam PRs just to complete a t-shirt or badge counter. Maintainers are volunteers under immense load in October. If you fix a real bug in a library you use, maintainers will gladly approve your contribution."
    },
    firstPrAction: {
      title: "FirstPR Safe Workflow Guide",
      description: "Follow atomic commit practices and clean PR formatting to avoid rejection in October.",
      link: "/workflow",
      linkText: "Review Safe Workflow"
    }
  },
  {
    monthIndex: 10,
    monthName: "November",
    shortName: "Nov",
    quarter: "Q4",
    year: 2026,
    focusTag: "Extended Wrap-Up & KDE",
    phaseType: "wrapup",
    headline: "Extended GSoC Projects Conclude & Season of KDE Opens",
    summary: "Extended 22-week GSoC contributors submit final deliverables. Organizations begin post-program assessments and outline preliminary ideas for 2027. Season of KDE opens applications for its winter mentoring cohort.",
    programs: [
      {
        programId: "gsoc",
        name: "Google Summer of Code (Extended)",
        badge: "22-Week Wrap-Up Nov 10",
        dateRange: "Nov 10 – Nov 17",
        actionText: "Extended GSoC Dashboard",
        actionUrl: "https://summerofcode.withgoogle.com"
      },
      {
        programId: "sok",
        name: "Season of KDE 2027",
        badge: "Proposals Open",
        dateRange: "Nov 15 – Dec 15",
        actionText: "KDE Season Portal",
        actionUrl: "https://season.kde.org",
        isUrgent: true
      },
      {
        programId: "fossasia-codeheat",
        name: "FOSSASIA Codeheat",
        badge: "Leaderboard Sprints",
        dateRange: "Active through Nov",
        actionText: "Codeheat Standings",
        actionUrl: "https://codeheat.org"
      },
      {
        programId: "lfx",
        name: "LFX Mentorship (Spring 2027)",
        badge: "Project Scouting",
        dateRange: "Late Nov Prep",
        actionText: "LFX Projects",
        actionUrl: "https://mentorship.lfx.linuxfoundation.org"
      }
    ],
    targets: [
      "Submit final work reports if enrolled in extended 22-week GSoC projects.",
      "Review KDE community repositories for Season of KDE (Plasma, Krita, Digikam, Kate).",
      "Join KDE Matrix / IRC channels and connect with potential mentors.",
      "Explore Linux Kernel and CNCF repositories for LFX Spring 2027 mentorships."
    ],
    checklist: [
      "Submit Season of KDE proposal before mid-December deadline.",
      "Help organizations triage incoming issues filed during Hacktoberfest.",
      "Refactor merged summer code based on real production user feedback.",
      "Begin shortlisting target organizations for next year's GSoC and ESoC programs.",
      "Maintain active commit streak by contributing to upstream maintenance."
    ],
    proTip: {
      author: "Adriaan de Groot",
      role: "KDE Community Veteran",
      advice: "November is the best time to connect with maintainers. The summer frenzy is over, Hacktoberfest PRs are triaged, and maintainers have real bandwidth to mentor motivated newcomers one-on-one."
    },
    firstPrAction: {
      title: "Module 04: Community Etiquette",
      description: "How to introduce yourself in Matrix/IRC channels without sounding like a spam bot.",
      link: "/learn/04",
      linkText: "Study Module 04"
    }
  },
  {
    monthIndex: 11,
    monthName: "December",
    shortName: "Dec",
    quarter: "Q4",
    year: 2026,
    focusTag: "24 Pull Requests & Winter Cohorts",
    phaseType: "celebration",
    headline: "24 Pull Requests Holiday Sprints & Outreachy Winter Kickoff",
    summary: "Wrap up the year by giving back. 24 Pull Requests challenges developers to send one open-source contribution every day until Christmas. Outreachy December interns begin their full-time 3-month paid internships.",
    programs: [
      {
        programId: "twenty-four-pull-requests",
        name: "24 Pull Requests",
        badge: "Dec 1 – 24 Challenge",
        dateRange: "Dec 1 – 24",
        actionText: "Join 24 Pull Requests",
        actionUrl: "https://24pullrequests.com",
        isUrgent: true
      },
      {
        programId: "outreachy",
        name: "Outreachy (Dec Cohort)",
        badge: "Internships Begin Dec 1",
        dateRange: "Dec 2026 – Mar 2027",
        actionText: "Outreachy Cohort",
        actionUrl: "https://www.outreachy.org"
      },
      {
        programId: "sok",
        name: "Season of KDE 2027",
        badge: "Projects Announced",
        dateRange: "Late Dec Reveal",
        actionText: "Season of KDE Wiki",
        actionUrl: "https://season.kde.org"
      },
      {
        programId: "summer-of-bitcoin",
        name: "Summer of Bitcoin 2027",
        badge: "Pre-Season Teaser",
        dateRange: "Late December",
        actionText: "Summer of Bitcoin",
        actionUrl: "https://www.summerofbitcoin.org"
      }
    ],
    targets: [
      "Send at least 3–5 pull requests during the 24 Pull Requests holiday sprint.",
      "Send personalized thank-you messages to maintainers who reviewed your PRs in 2026.",
      "Review your annual GitHub contribution graph and celebrate your growth.",
      "Draft your 2027 open-source goals (target programs, languages to learn, PR goals)."
    ],
    checklist: [
      "Participate in 24 Pull Requests by improving open source documentation and fixes.",
      "Clean up open PRs and close abandoned draft branches in your forks.",
      "Star and sponsor the open source libraries you relied on throughout the year.",
      "Prepare your January application pipeline for CERN Openlab and Summer of Bitcoin.",
      "Share your year-in-review open source accomplishments with the community."
    ],
    proTip: {
      author: "Andrew Nesbitt",
      role: "Creator of 24 Pull Requests & Libraries.io",
      advice: "Open source runs on human goodwill. Sending a simple comment on an issue saying: 'Thank you for building this library, it made my project possible' can make a maintainer's entire holiday season."
    },
    firstPrAction: {
      title: "Interactive Git Lab",
      description: "Keep your muscle memory sharp with Git rebase, cherry-pick, and stash scenarios.",
      link: "/lab",
      linkText: "Practice in Git Lab"
    }
  }
];

