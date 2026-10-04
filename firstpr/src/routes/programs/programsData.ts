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
    featured: true,
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
