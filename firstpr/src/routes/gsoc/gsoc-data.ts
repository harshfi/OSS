import { 
  DollarSign, 
  Users, 
  Award, 
  Code2, 
  GitPullRequest, 
  Terminal, 
  ShieldCheck,
  FileText
} from "lucide-react";

export interface GsocPerk {
  icon: typeof DollarSign;
  title: string;
  desc: string;
  badge: string;
}

export const GSOC_PERKS: GsocPerk[] = [
  { 
    icon: DollarSign, 
    title: "Real Stipend Payouts", 
    desc: "Receive between $1,500 and $3,300+ based on project size (90h, 175h, or 350h) and your country's purchasing power parity (PPP).", 
    badge: "Financial Autonomy"
  },
  { 
    icon: Users, 
    title: "1-on-1 Senior Mentorship", 
    desc: "Work directly with core maintainers of global open source projects. Mentors review your code, guide your architecture, and endorse your skills.", 
    badge: "World-Class Mentors"
  },
  { 
    icon: Award, 
    title: "Career & Resume Validation", 
    desc: "A completed GSoC project is gold-standard proof that you can collaborate in public, handle large codebases, and ship production features.", 
    badge: "Hiring Signal"
  },
  { 
    icon: Code2, 
    title: "Production Impact", 
    desc: "Your code doesn't sit in a classroom repo. It gets deployed to millions of developers, servers, and real-world production users globally.", 
    badge: "True Open Source"
  },
];

export interface SelectionCriterion {
  title: string;
  weight: number;
  highlight: string;
  summary: string;
  checklist: string[];
}

export const SELECTION_RUBRIC: SelectionCriterion[] = [
  {
    title: "Repository Contribution Proof",
    weight: 40,
    highlight: "Merged PRs & Triage",
    summary: "Orgs look for evidence that you already know how to build, test, and ship code in their specific repo before selection.",
    checklist: [
      "At least 1 merged PR (even a bug fix or test addition) in the target repo",
      "Evidence of running their test suite locally and respecting CI checks",
      "Clean commit hygiene (atomic commits, descriptive messages, no merge commits)"
    ]
  },
  {
    title: "Communication & Independence",
    weight: 25,
    highlight: "The 30-Minute Rule",
    summary: "Mentors are volunteers with full-time jobs. They reward contributors who unblock themselves before asking questions.",
    checklist: [
      "Asking questions with full context (what you tried, error trace, docs checked)",
      "Graciously accepting code review feedback and pushing requested changes promptly",
      "Regular public presence in org chats (Slack, Zulip, Discord, Matrix)"
    ]
  },
  {
    title: "Proposal Feasibility & Depth",
    weight: 25,
    highlight: "Realistic Architecture",
    summary: "A winning proposal proves you understand the current codebase architecture and have broken the project into achievable weekly milestones.",
    checklist: [
      "Clear technical spec detailing files, schemas, and APIs affected",
      "Realistic 12-week schedule with midterm deliverable and 2 buffer weeks",
      "Direct integration of mentor feedback gathered during pre-proposal phase"
    ]
  },
  {
    title: "Community Citizenship",
    weight: 10,
    highlight: "Helping Others",
    summary: "Demonstrating that you care about the health of the project community beyond just winning a stipend.",
    checklist: [
      "Helping other newcomers debug their local environment setup",
      "Participating in public issue triage and reproduction verification",
      "Polite, collaborative tone adhering to the project's Code of Conduct"
    ]
  }
];

export interface DeadlyMistake {
  title: string;
  tag: string;
  impact: string;
  badHabit: string;
  solution: string;
}

export const DEADLY_MISTAKES: DeadlyMistake[] = [
  {
    title: "The 'Hello Sir, Assign Me' Spammer",
    tag: "High Annoyance",
    impact: "Immediate silent rejection by maintainers",
    badHabit: "Joining Discord or commenting on random GitHub issues: 'Hi sir, I am beginner interested in GSoC, please give me a task.'",
    solution: "Search the repo's 'good first issue' or 'help wanted' labels yourself. Reproduce the bug locally, then comment with your diagnosed root cause and offer to draft a fix."
  },
  {
    title: "The Deadline Day Proposal Dump",
    tag: "Zero Trust",
    impact: "99% rejection rate",
    badHabit: "Submitting a 25-page proposal on the Google portal having never spoken to a mentor or pushed a single line of code to the repo.",
    solution: "Start contributing 6-8 weeks early. Share your proposal draft in a public Google Doc with comment access at least 3 weeks before the submission window closes."
  },
  {
    title: "The AI Hallucination Slop PR",
    tag: "Instant Blacklist",
    impact: "Permanent loss of maintainer credibility",
    badHabit: "Copy-pasting unvetted LLM output that invents non-existent functions, bypasses existing utilities, or fails unit tests.",
    solution: "Use AI for understanding docs or brainstorming, but write, test, and benchmark every line yourself. Always explain *why* your fix works in your PR description."
  },
  {
    title: "The Multi-Org Carpet Bomber",
    tag: "Diluted Effort",
    impact: "Shallow proposals in all orgs",
    badHabit: "Trying to apply to 5 different orgs at once with shallow, copy-pasted proposals hoping one sticks.",
    solution: "Follow the 80/20 rule: dedicate 80% of your energy to your #1 favorite organization and 20% to a backup org. Total focus beats surface-level spraying every time."
  },
  {
    title: "The Ghost Contributor",
    tag: "Unreliability",
    impact: "Mentors assume you will abandon the project in July",
    badHabit: "Working intensely for 3 days, asking mentors for guidance, and then disappearing for two weeks without an update.",
    solution: "Consistency > Intensity. Giving a 2-sentence weekly status update in chat ('Finished task X, currently working on Y, blocked on Z') builds massive dependability."
  }
];

export interface TrustStep {
  step: number;
  timeframe: string;
  name: string;
  goal: string;
  actions: string[];
  maintainerPerspective: string;
  icon: typeof Terminal;
}

export const TRUST_LADDER: TrustStep[] = [
  {
    step: 1,
    timeframe: "Days 1 – 7",
    name: "Environment Mastery & Documentation Fixes",
    goal: "Prove you can set up the project locally and respect contributing rules without asking for hand-holding.",
    actions: [
      "Fork the repository, clone locally, and build the project from scratch.",
      "Execute the entire test suite and linter; note any setup quirks on your operating system.",
      "Read CONTRIBUTING.md, the Code of Conduct, and the past 15 merged PRs to understand git conventions.",
      "Found an outdated dependency or a broken link in the docs? Submit a surgical PR fixing it cleanly."
    ],
    maintainerPerspective: "This contributor can read instructions, run tests, and cares about leaving the setup cleaner than they found it.",
    icon: Terminal
  },
  {
    step: 2,
    timeframe: "Days 8 – 20",
    name: "Issue Triage & Bug Reproduction",
    goal: "Save maintainers valuable time by confirming or clarifying unresolved community issues.",
    actions: [
      "Browse the open issues list and find bugs opened in the last 1–3 months.",
      "Attempt to reproduce the bug on your local setup with the latest main branch.",
      "Comment on the issue with exact reproduction steps, logs, OS version, and whether you can isolate the faulty component.",
      "Help other community newcomers in chat when they get stuck on installation hurdles."
    ],
    maintainerPerspective: "They aren't just here to take a stipend; they're genuinely doing the unglamorous maintenance work that helps our team.",
    icon: ShieldCheck
  },
  {
    step: 3,
    timeframe: "Days 21 – 40",
    name: "Surgical Code PRs & Test Expansion",
    goal: "Prove your code quality, adherence to style guidelines, and receptiveness to code review.",
    actions: [
      "Select an unassigned bug or a small feature tagged 'good first issue' or 'help wanted'.",
      "Write a failing unit or integration test that reproduces the bug before writing the fix.",
      "Keep your PR focused (< 150 lines changed), format code with their linter, and ensure all CI checks pass.",
      "Address review comments rapidly and politely: squash commits if requested and explain technical decisions calmly."
    ],
    maintainerPerspective: "Their code is clean, they write unit tests, their PRs don't cause regressions, and they take feedback like a pro.",
    icon: GitPullRequest
  },
  {
    step: 4,
    timeframe: "Days 41 – Proposal Window",
    name: "Architectural RFC & Mentor Co-Design",
    goal: "Co-design your GSoC project with your prospective mentor before writing a single word of your final proposal.",
    actions: [
      "Study the organization's official Ideas List and identify the project that matches your strengths.",
      "Post a Request for Comments (RFC) on their discussion board/channel outlining your proposed design and tradeoffs.",
      "Ask specific, high-level architecture questions: 'Would you prefer approach A (faster, more memory) or approach B (slower, persistent)?'",
      "Share a Google Doc draft of your proposal with comment access early so mentors can guide your scope."
    ],
    maintainerPerspective: "This proposal isn't a surprise. We co-authored the architecture together, and I know this candidate will deliver.",
    icon: FileText
  }
];

export interface CommScenario {
  id: string;
  title: string;
  context: string;
  badExample: {
    message: string;
    whyBad: string;
  };
  goodExample: {
    message: string;
    whyGood: string;
  };
  template: string;
}

export const COMM_SCENARIOS: CommScenario[] = [
  {
    id: "intro",
    title: "1. First Community Introduction",
    context: "Joining the community Slack / Zulip / Discord for the first time.",
    badExample: {
      message: "Hello everyone! I am a 2nd year CS student. I want to contribute to GSoC 2026. Can someone please tell me what issue to work on and how to get started?",
      whyBad: "Puts all cognitive load on maintainers, sounds like every other generic applicant, and shows zero initiative."
    },
    goodExample: {
      message: "Hi everyone! I'm Alex. I've been following [Project Name] and successfully set up the local dev environment on macOS (Docker + Node 22). All unit tests are passing! I'm exploring the backend issue queue and interested in working on issue #482. Looking forward to learning from the community!",
      whyGood: "Demonstrates you already cloned, built, and tested the repo, and identified a specific area of focus."
    },
    template: `Hi everyone! I'm [Your Name]. I've been following [Project Name] and recently set up the local development environment on [OS/Platform]. All tests and build steps passed cleanly. 

I'm currently reviewing the issue backlog around [Feature/Area] and looking to submit a reproduction report for [Issue #]. Excited to contribute and learn with the community!`
  },
  {
    id: "getting-stuck",
    title: "2. Asking for Help When Blocked",
    context: "You've spent 2 hours stuck on a compiler error or mysterious test failure.",
    badExample: {
      message: "The build is failing with error code 1. Please help! What do I do?",
      whyBad: "No error trace, no steps to reproduce, no indication of what you already tried."
    },
    goodExample: {
      message: "Hey team, while running `pnpm test:e2e` on branch `fix/402-auth-timeout`, I'm hitting a timeout on `test_session_expiry`. \n\nWhat I've verified:\n1. Docker daemon is running and postgres port 5432 is healthy.\n2. Clean re-install of node_modules didn't resolve it.\n3. The same test passes on the `main` branch.\n\nHere is the gist with full debug logs: [Link]. Any pointers on whether this test relies on a specific local env var?",
      whyGood: "Provides full reproduction details, proves you isolated the delta, and links full debug traces."
    },
    template: `Hey team, I'm encountering an issue while running [Command] on branch [Branch Name].

Summary of the problem:
[Brief description of the failure]

What I've investigated so far:
1. [Attempt 1 & outcome]
2. [Attempt 2 & outcome]
3. [Verified difference compared to main branch]

Logs / Stack trace: [Link to Gist / Paste]
Has anyone seen this behavior before, or is there an undocumented env flag I should set?`
  },
  {
    id: "pr-review",
    title: "3. Responding to PR Review Critiques",
    context: "A maintainer leaves 7 nitpicks and asks you to rewrite a helper function.",
    badExample: {
      message: "Why do I need to rewrite it? It works fine on my machine. When will this get merged?",
      whyBad: "Defensive, dismissive of codebase conventions, and unnecessarily impatient."
    },
    goodExample: {
      message: "Thank you for the detailed review @maintainer! \n- Updated points 1-5 to follow the project style guide (commit fb23a9).\n- For point 6, refactored `parsePayload()` to use the existing `sanitize()` utility as suggested.\n- Re-ran `pnpm test` and all 42 unit tests passed.\n\nReady for another look whenever you have time!",
      whyGood: "Shows gratitude, references specific commits, confirms tests were re-run, and respects their time."
    },
    template: `Thank you for the thorough review, @[Maintainer]!

- Resolved items [1, 2, 3] in commit [Commit Hash].
- For your question regarding [Topic]: [Clear technical justification or confirmation of refactor].
- Re-ran all local tests and lint checks: [Pass confirmation].

Whenever convenient, ready for your next pass!`
  },
  {
    id: "proposal-feedback",
    title: "4. Requesting Proposal Feedback",
    context: "You've drafted your project proposal and want mentor eyes on it.",
    badExample: {
      message: "Here is my final proposal PDF. Please review it and tell me if I will be selected. Deadline is in 2 days.",
      whyBad: "PDFs cannot be commented on easily, 2 days before the deadline is too late, and asking if you'll be selected is unprofessional."
    },
    goodExample: {
      message: "Hi @mentor, I've put together a first draft of the proposal for [Project Idea: Fast Search Indexing] based on our discussion in thread #120. \n\nGoogle Doc (Comment access enabled): [Link]\n\nKey areas where I'd especially appreciate your perspective:\n1. Section 3.2: Database schema change vs in-memory cache tradeoff.\n2. Week 7: Whether allocating 1 week for migration scripts is sufficient.\n\nNo rush at all, and thank you for your time!",
      whyGood: "Editable format, gives 2+ weeks buffer, and pinpoints exact technical decisions needing their expertise."
    },
    template: `Hi @[Mentor Name], following up on our discussion regarding [Project Topic], I've prepared a draft proposal:

Google Doc (Comment Access): [Link]

Specific areas where your technical guidance would be invaluable:
1. [Specific architectural decision 1]
2. [Scope / timeline feasibility for Week X]

I would greatly appreciate any high-level thoughts whenever your schedule permits. Thank you!`
  }
];

export interface ProposalSection {
  title: string;
  requirement: string;
  keyDetails: string[];
  sampleExcerpt: string;
}

export const PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    title: "1. Executive Summary & Deliverables",
    requirement: "A non-technical summary that any org admin can understand in 60 seconds.",
    keyDetails: [
      "Problem statement: What limitation currently exists in the software?",
      "Solution statement: How will your project solve this for end-users?",
      "Strict list of deliverables: Minimum viable product (MVP), stretch goals, and non-goals."
    ],
    sampleExcerpt: "This project introduces automated schema validation to FirstPR's plugin engine. Currently, third-party plugins can crash the main worker if manifest properties are malformed. By integrating Zod validation and structured error logs, this project eliminates unhandled runtime exceptions for ~40k weekly active plugins."
  },
  {
    title: "2. Technical Architecture & Implementation",
    requirement: "Proves you understand the inner workings and won't require spoon-feeding.",
    keyDetails: [
      "File structures and module boundaries that will be created or modified.",
      "Data flow diagrams (ASCII or Mermaid) showing state transitions.",
      "Third-party libraries evaluated, including licensing and bundle size impact.",
      "Corner cases and failure modes (network drop, schema mismatch, concurrency)."
    ],
    sampleExcerpt: "The validation layer will reside under `src/core/plugins/validator.ts`. It will intercept plugin registration hooks before the dispatch pipeline. Benchmarks demonstrate that Zod adds <1.2ms validation overhead per manifest, satisfying the project's <5ms startup budget."
  },
  {
    title: "3. Week-by-Week Execution Timeline",
    requirement: "The single most scrutinized section by mentors. Must be realistic, not fantasy.",
    keyDetails: [
      "Community Bonding (May): Finalizing specs, setting up staging sandbox.",
      "Weeks 1–5: Core architecture & initial functional slice.",
      "Week 6: Midterm evaluation milestone (interactive demo & comprehensive tests).",
      "Weeks 7–10: Secondary features, edge cases, documentation, and performance tuning.",
      "Weeks 11–12: Buffer period for code review revisions, final doc polish, and wrap-up."
    ],
    sampleExcerpt: "Week 6 (Midterm Milestone): Land PR #1 (core parser) with 95% unit test coverage. Host a 15-minute screen recording demonstrating valid and invalid plugin payloads passing through the sandbox."
  },
  {
    title: "4. Proof of Prior Open Source Contributions",
    requirement: "Proves you are already an active participant in this specific community.",
    keyDetails: [
      "Direct links to merged PRs in the organization's repository.",
      "Links to issue discussions and reproduction reports you verified.",
      "Any relevant past open source contributions in adjacent ecosystems."
    ],
    sampleExcerpt: "- PR #104 (Merged): Fixed race condition in worker event queue.\n- PR #118 (Merged): Added end-to-end tests for telemetry reporter.\n- Issue #92 (Triaged): Verified reproduction on Linux kernel 6.8 with memory flamegraph."
  },
  {
    title: "5. Time Commitment, Conflicts & Risk Management",
    requirement: "Honesty about your availability prevents midterm failure.",
    keyDetails: [
      "Planned weekly hours (30-35 hours/week for large, 15-20 hours/week for medium).",
      "Explicit disclosure of university exams, travel, or other commitments.",
      "Contingency plan: How will you catch up if you fall behind on schedule?"
    ],
    sampleExcerpt: "I will commit 35 hours per week (Mon-Fri 9:00 - 16:00 UTC). My final university exams run from June 12 to June 16; to account for this, I have scheduled Week 4 as a light review week and will complete the parser deliverables ahead of time during Week 3."
  }
];

export interface CuratedGsocOrg {
  rank: number;
  name: string;
  category: "js-ts" | "python" | "systems" | "ai-data" | "tools";
  categoryLabel: string;
  tagline: string;
  description: string;
  tech: string[];
  chatPlatform: "Zulip" | "Discord" | "Slack" | "Matrix" | "Mailing List" | "Rocket.Chat" | "Discourse" | "IRC";
  chatUrl: string;
  starterRepo: string;
  starterRepoUrl: string;
  history: { year: string; count: number }[];
  lastCommit: string;
  guidanceNote: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  competition: "Medium" | "High" | "Extremely High";
  avgSlots: number;
}

export const CURATED_GSOC_ORGS: CuratedGsocOrg[] = [
  {
    rank: 1,
    name: "Zulip",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Topic-threaded open source team collaboration",
    description: "Zulip has arguably the finest contributor onboarding in open source. They require candidates to complete their automated dev guide and resolve starter issues before submitting a proposal.",
    tech: ["TypeScript", "Python", "Django", "React Native"],
    chatPlatform: "Zulip",
    chatUrl: "https://chat.zulip.org",
    starterRepo: "zulip/zulip",
    starterRepoUrl: "https://github.com/zulip/zulip",
    history: [{ year: '22', count: 18 }, { year: '23', count: 22 }, { year: '24', count: 20 }, { year: '25', count: 24 }, { year: '26', count: 25 }],
    lastCommit: "3 hours ago",
    guidanceNote: "Strict prerequisite: complete the '100-minute onboarding tutorial' in their docs and make at least 1 merged PR before proposal submission.",
    difficulty: "Beginner",
    competition: "High",
    avgSlots: 22
  },
  {
    rank: 2,
    name: "Python Software Foundation",
    category: "python",
    categoryLabel: "Python & Core",
    tagline: "The core non-profit behind Python and sub-projects",
    description: "Umbrella organization for major Python sub-projects (CPython, PyPy, Mailman, Twisted, BeeWare). Extremely prestigious with rigorous code reviews.",
    tech: ["Python", "C", "Asyncio"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/python",
    starterRepo: "python/cpython",
    starterRepoUrl: "https://github.com/python/cpython",
    history: [{ year: '22', count: 35 }, { year: '23', count: 42 }, { year: '24', count: 40 }, { year: '25', count: 45 }, { year: '26', count: 48 }],
    lastCommit: "2 hours ago",
    guidanceNote: "Choose a specific sub-org under PSF (e.g. BeeWare or PyPy) rather than targeting CPython directly if you are new to low-level C.",
    difficulty: "Intermediate",
    competition: "Extremely High",
    avgSlots: 42
  },
  {
    rank: 3,
    name: "NumFOCUS",
    category: "ai-data",
    categoryLabel: "AI & Scientific Data",
    tagline: "Scientific computing & data science ecosystem",
    description: "Umbrella organization for the world's most critical data science libraries: NumPy, SciPy, Pandas, Matplotlib, NetworkX, and Jupyter.",
    tech: ["Python", "C++", "Cython", "Rust"],
    chatPlatform: "Slack",
    chatUrl: "https://numfocus.org",
    starterRepo: "numpy/numpy",
    starterRepoUrl: "https://github.com/numpy/numpy",
    history: [{ year: '22', count: 28 }, { year: '23', count: 30 }, { year: '24', count: 35 }, { year: '25', count: 32 }, { year: '26', count: 36 }],
    lastCommit: "40 mins ago",
    guidanceNote: "Requires strong mathematical grounding and strict adherence to algorithmic complexity standards and automated benchmarks.",
    difficulty: "Intermediate",
    competition: "High",
    avgSlots: 32
  },
  {
    rank: 4,
    name: "KDE Community",
    category: "systems",
    categoryLabel: "Systems & Desktop",
    tagline: "Free software desktop ecosystem for Linux & mobile",
    description: "A friendly, decades-old international community powering Plasma desktop, Kdenlive, Kate, and Okular. Wonderful mentorship for C++ and Qt/QML.",
    tech: ["C++", "Qt", "QML", "Wayland"],
    chatPlatform: "Matrix",
    chatUrl: "https://community.kde.org/Matrix",
    starterRepo: "KDE/plasma-desktop",
    starterRepoUrl: "https://invent.kde.org/plasma/plasma-desktop",
    history: [{ year: '22', count: 40 }, { year: '23', count: 38 }, { year: '24', count: 35 }, { year: '25', count: 36 }, { year: '26', count: 35 }],
    lastCommit: "1 hour ago",
    guidanceNote: "Join their Matrix channels early and use their 'KDE Invent' GitLab instance to submit your initial merge requests.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 37
  },
  {
    rank: 5,
    name: "CNCF (Cloud Native)",
    category: "systems",
    categoryLabel: "Systems & Cloud",
    tagline: "Kubernetes, Prometheus, Envoy, and cloud infrastructure",
    description: "The premier home of modern cloud infrastructure. Highly competitive, but accepted contributors frequently transition directly to top engineering roles.",
    tech: ["Go", "Rust", "gRPC", "Docker"],
    chatPlatform: "Slack",
    chatUrl: "https://slack.cncf.io",
    starterRepo: "kubernetes/kubernetes",
    starterRepoUrl: "https://github.com/kubernetes/kubernetes",
    history: [{ year: '22', count: 20 }, { year: '23', count: 24 }, { year: '24', count: 26 }, { year: '25', count: 28 }, { year: '26', count: 30 }],
    lastCommit: "5 mins ago",
    guidanceNote: "Target sub-projects (like KEDA, Chaos Mesh, or Jaeger) rather than Kubernetes core for a significantly higher acceptance probability.",
    difficulty: "Advanced",
    competition: "Extremely High",
    avgSlots: 26
  },
  {
    rank: 6,
    name: "Rocket.Chat",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Enterprise open-source communication platform",
    description: "Large full-stack TypeScript ecosystem with active microservices, bots, and mobile apps. Great for contributors with strong React and Node.js skills.",
    tech: ["TypeScript", "Node.js", "React", "MongoDB"],
    chatPlatform: "Rocket.Chat",
    chatUrl: "https://open.rocket.chat",
    starterRepo: "RocketChat/Rocket.Chat",
    starterRepoUrl: "https://github.com/RocketChat/Rocket.Chat",
    history: [{ year: '22', count: 14 }, { year: '23', count: 16 }, { year: '24', count: 15 }, { year: '25', count: 18 }, { year: '26', count: 19 }],
    lastCommit: "1 day ago",
    guidanceNote: "Check out their GSoC forum category early. Mentors are very responsive if you bring interactive mockups or architecture proofs.",
    difficulty: "Beginner",
    competition: "High",
    avgSlots: 16
  },
  {
    rank: 7,
    name: "Joplin",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Secure, open-source note taking and to-do application",
    description: "Cross-platform note taking app built with Electron, React Native, and TypeScript. Extremely welcoming community with well-scoped projects.",
    tech: ["TypeScript", "React", "Electron", "React Native"],
    chatPlatform: "Discourse",
    chatUrl: "https://discourse.joplinapp.org",
    starterRepo: "laurent22/joplin",
    starterRepoUrl: "https://github.com/laurent22/joplin",
    history: [{ year: '22', count: 8 }, { year: '23', count: 10 }, { year: '24', count: 9 }, { year: '25', count: 11 }, { year: '26', count: 12 }],
    lastCommit: "5 hours ago",
    guidanceNote: "Proposals that focus on plugin APIs, performance improvements, and sync integrations have historical priority.",
    difficulty: "Beginner",
    competition: "Medium",
    avgSlots: 10
  },
  {
    rank: 8,
    name: "Home Assistant",
    category: "python",
    categoryLabel: "Python & Core",
    tagline: "Open source local home automation",
    description: "Massive active developer ecosystem focused on privacy and local device control. Ideal for Python developers interested in IoT and distributed networks.",
    tech: ["Python", "Asyncio", "WebSockets"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/home-assistant",
    starterRepo: "home-assistant/core",
    starterRepoUrl: "https://github.com/home-assistant/core",
    history: [{ year: '22', count: 6 }, { year: '23', count: 8 }, { year: '24', count: 10 }, { year: '25', count: 12 }, { year: '26', count: 12 }],
    lastCommit: "15 mins ago",
    guidanceNote: "Ensure you follow Home Assistant's strict architectural typing rules and write 100% async Python.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 10
  },
  {
    rank: 9,
    name: "Mozilla",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Building a better, decentralized Internet",
    description: "Pioneers of web standards and Firefox. Mentors work across browser internals, web extensions, Rust engines, and developer tooling.",
    tech: ["JavaScript", "Rust", "C++", "Python"],
    chatPlatform: "Matrix",
    chatUrl: "https://chat.mozilla.org",
    starterRepo: "mozilla/gecko-dev",
    starterRepoUrl: "https://github.com/mozilla/gecko-dev",
    history: [{ year: '22', count: 15 }, { year: '23', count: 18 }, { year: '24', count: 16 }, { year: '25', count: 20 }, { year: '26', count: 22 }],
    lastCommit: "10 mins ago",
    guidanceNote: "Mozilla uses Phabricator and Bugzilla alongside GitHub. Familiarizing yourself with Bugzilla triage gives you a major edge.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 18
  },
  {
    rank: 10,
    name: "FreeCodeCamp",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Open source community helping millions learn to code",
    description: "The world's largest open curriculum. Huge TypeScript and React codebase powering interactive curriculum challenges and learning certifications.",
    tech: ["TypeScript", "React", "Node.js", "MongoDB"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/freecodecamp",
    starterRepo: "freeCodeCamp/freeCodeCamp",
    starterRepoUrl: "https://github.com/freeCodeCamp/freeCodeCamp",
    history: [{ year: '22', count: 10 }, { year: '23', count: 12 }, { year: '24', count: 12 }, { year: '25', count: 15 }, { year: '26', count: 16 }],
    lastCommit: "20 mins ago",
    guidanceNote: "High applicant volume. Stand out by submitting PRs improving the challenge validation runner rather than just editing markdown docs.",
    difficulty: "Beginner",
    competition: "Extremely High",
    avgSlots: 13
  },
  {
    rank: 11,
    name: "Django Software Foundation",
    category: "python",
    categoryLabel: "Python & Core",
    tagline: "The web framework for perfectionists with deadlines",
    description: "The premier web framework for Python. Strict test coverage standards, Trac ticket workflow, and thorough architectural reviews.",
    tech: ["Python", "Django", "SQL", "HTML/CSS"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/django",
    starterRepo: "django/django",
    starterRepoUrl: "https://github.com/django/django",
    history: [{ year: '22', count: 6 }, { year: '23', count: 8 }, { year: '24', count: 8 }, { year: '25', count: 9 }, { year: '26', count: 10 }],
    lastCommit: "1 hour ago",
    guidanceNote: "Requires mastering git rebase and writing regression tests inside Django's internal test harness (`runtests.py`).",
    difficulty: "Intermediate",
    competition: "High",
    avgSlots: 8
  },
  {
    rank: 12,
    name: "SymPy",
    category: "ai-data",
    categoryLabel: "AI & Scientific Data",
    tagline: "Pure Python library for symbolic mathematics",
    description: "Computer algebra system written entirely in Python. Incredibly welcoming to mathematics, physics, and computer science students.",
    tech: ["Python", "Math", "Algorithms"],
    chatPlatform: "Mailing List",
    chatUrl: "https://groups.google.com/g/sympy",
    starterRepo: "sympy/sympy",
    starterRepoUrl: "https://github.com/sympy/sympy",
    history: [{ year: '22', count: 12 }, { year: '23', count: 14 }, { year: '24', count: 12 }, { year: '25', count: 15 }, { year: '26', count: 16 }],
    lastCommit: "4 hours ago",
    guidanceNote: "Mentors require applicants to solve at least one verified bug on the issue tracker and link the merged PR in their proposal.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 14
  },
  {
    rank: 13,
    name: "OpenCV",
    category: "ai-data",
    categoryLabel: "AI & Scientific Data",
    tagline: "Open source computer vision and machine learning library",
    description: "The industry standard for computer vision. High-performance C++ and Python bindings powering autonomous vehicles and image processing worldwide.",
    tech: ["C++", "Python", "CUDA", "Computer Vision"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/opencv",
    starterRepo: "opencv/opencv",
    starterRepoUrl: "https://github.com/opencv/opencv",
    history: [{ year: '22', count: 16 }, { year: '23', count: 18 }, { year: '24', count: 20 }, { year: '25', count: 22 }, { year: '26', count: 24 }],
    lastCommit: "2 hours ago",
    guidanceNote: "Expect math-intensive algorithms. Mentors value benchmarking benchmarks and SIMD/hardware acceleration awareness.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 20
  },
  {
    rank: 14,
    name: "Scikit-learn",
    category: "ai-data",
    categoryLabel: "AI & Scientific Data",
    tagline: "Machine learning in Python",
    description: "Simple and efficient tools for predictive data analysis. World-renowned for API elegance, comprehensive docstrings, and strict unit test coverage.",
    tech: ["Python", "Cython", "NumPy", "SciPy"],
    chatPlatform: "Discourse",
    chatUrl: "https://discuss.scikit-learn.org",
    starterRepo: "scikit-learn/scikit-learn",
    starterRepoUrl: "https://github.com/scikit-learn/scikit-learn",
    history: [{ year: '22', count: 8 }, { year: '23', count: 10 }, { year: '24', count: 9 }, { year: '25', count: 11 }, { year: '26', count: 12 }],
    lastCommit: "30 mins ago",
    guidanceNote: "API consistency is sacred here. Every parameter and public method must conform strictly to scikit-learn's estimator specification.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 10
  },
  {
    rank: 15,
    name: "Apache Software Foundation",
    category: "systems",
    categoryLabel: "Systems & Cloud",
    tagline: "Community-driven open source software products",
    description: "Umbrella organization for hundreds of enterprise systems: Kafka, Spark, Flink, Airflow, Arrow, and Lucene. Highly recognized in industry.",
    tech: ["Java", "Scala", "Python", "C++", "Rust"],
    chatPlatform: "Mailing List",
    chatUrl: "https://apache.org/dev/",
    starterRepo: "apache/arrow",
    starterRepoUrl: "https://github.com/apache/arrow",
    history: [{ year: '22', count: 25 }, { year: '23', count: 28 }, { year: '24', count: 30 }, { year: '25', count: 32 }, { year: '26', count: 34 }],
    lastCommit: "12 mins ago",
    guidanceNote: "Apache runs entirely via public dev mailing lists. 'If it didn't happen on the mailing list, it didn't happen.'",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 30
  },
  {
    rank: 16,
    name: "The Linux Foundation",
    category: "systems",
    categoryLabel: "Systems & Cloud",
    tagline: "Enabling innovation through open source ecosystems",
    description: "Hosting mission-critical foundational software across kernel, networking, security, and enterprise infrastructure.",
    tech: ["C", "Rust", "Go", "Linux Kernel"],
    chatPlatform: "Slack",
    chatUrl: "https://slack.linuxfoundation.org",
    starterRepo: "torvalds/linux",
    starterRepoUrl: "https://github.com/torvalds/linux",
    history: [{ year: '22', count: 18 }, { year: '23', count: 20 }, { year: '24', count: 22 }, { year: '25', count: 25 }, { year: '26', count: 26 }],
    lastCommit: "4 mins ago",
    guidanceNote: "Pick targeted projects like OpenSSF or Zephyr RTOS rather than the monolithic Linux kernel directly for GSoC.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 22
  },
  {
    rank: 17,
    name: "LLVM Compiler",
    category: "systems",
    categoryLabel: "Systems & Cloud",
    tagline: "Collection of modular and reusable compiler technologies",
    description: "The engine behind Clang, Rustc, Swift, and modern GPU compilers. Top destination for computer science students interested in compilers and architectures.",
    tech: ["C++", "LLVM IR", "Assembly"],
    chatPlatform: "Discourse",
    chatUrl: "https://discourse.llvm.org",
    starterRepo: "llvm/llvm-project",
    starterRepoUrl: "https://github.com/llvm/llvm-project",
    history: [{ year: '22', count: 12 }, { year: '23', count: 15 }, { year: '24', count: 14 }, { year: '25', count: 16 }, { year: '26', count: 18 }],
    lastCommit: "8 mins ago",
    guidanceNote: "Often assigns specific pre-proposal evaluation tasks. Completing the evaluation task with benchmark proofs is essential.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 15
  },
  {
    rank: 18,
    name: "VideoLAN (VLC)",
    category: "tools",
    categoryLabel: "Creative & Tools",
    tagline: "Non-profit organization behind the iconic VLC player",
    description: "High-performance multimedia frameworks used by billions. Projects span multimedia codecs, streaming protocols, Android, iOS, and WebAssembly.",
    tech: ["C", "C++", "WebAssembly", "FFmpeg"],
    chatPlatform: "IRC",
    chatUrl: "https://www.videolan.org/vlc/contact.html",
    starterRepo: "videolan/vlc",
    starterRepoUrl: "https://code.videolan.org/videolan/vlc",
    history: [{ year: '22', count: 10 }, { year: '23', count: 12 }, { year: '24', count: 11 }, { year: '25', count: 12 }, { year: '26', count: 14 }],
    lastCommit: "2 hours ago",
    guidanceNote: "Connect to their Libera.chat IRC channel (#videolan) and submit patches via their GitLab merge requests.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 12
  },
  {
    rank: 19,
    name: "Node.js (OpenJS)",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "JavaScript runtime built on Chrome's V8 engine",
    description: "The ubiquitous server-side JavaScript runtime. Projects include core runtime, diagnostic tools, HTTP/3 implementation, and package ecosystem safety.",
    tech: ["JavaScript", "C++", "Python", "V8 Engine"],
    chatPlatform: "Slack",
    chatUrl: "https://openjs-foundation.slack.com",
    starterRepo: "nodejs/node",
    starterRepoUrl: "https://github.com/nodejs/node",
    history: [{ year: '22', count: 8 }, { year: '23', count: 10 }, { year: '24', count: 9 }, { year: '25', count: 12 }, { year: '26', count: 14 }],
    lastCommit: "18 mins ago",
    guidanceNote: "Node core requires knowing both JS and C++. Check their issue labels 'good first issue' and join weekly working group calls.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 11
  },
  {
    rank: 20,
    name: "ESLint (OpenJS)",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Find and fix problems in your JavaScript/TypeScript code",
    description: "The most popular static analysis tool in the JS ecosystem. Clean modular codebase, fantastic documentation, and deeply thoughtful maintainers.",
    tech: ["JavaScript", "TypeScript", "AST Parsers"],
    chatPlatform: "Discord",
    chatUrl: "https://discord.gg/eslint",
    starterRepo: "eslint/eslint",
    starterRepoUrl: "https://github.com/eslint/eslint",
    history: [{ year: '22', count: 4 }, { year: '23', count: 6 }, { year: '24', count: 6 }, { year: '25', count: 7 }, { year: '26', count: 8 }],
    lastCommit: "1 hour ago",
    guidanceNote: "Understanding Abstract Syntax Trees (AST) and Espree/ESQuery is the key prerequisite for impactful contributions.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 6
  },
  {
    rank: 21,
    name: "AsyncAPI Initiative",
    category: "js-ts",
    categoryLabel: "Web & TypeScript",
    tagline: "Building the future of event-driven architecture APIs",
    description: "Open source initiative creating tools and specifications for event-driven systems. One of the most contributor-friendly and welcoming cultures in Linux Foundation.",
    tech: ["TypeScript", "Node.js", "React", "Go"],
    chatPlatform: "Slack",
    chatUrl: "https://asyncapi.com/slack-subscribe",
    starterRepo: "asyncapi/spec",
    starterRepoUrl: "https://github.com/asyncapi/spec",
    history: [{ year: '22', count: 6 }, { year: '23', count: 8 }, { year: '24', count: 10 }, { year: '25', count: 12 }, { year: '26', count: 12 }],
    lastCommit: "45 mins ago",
    guidanceNote: "Weekly public office hours on Zoom where maintainers will personally help you set up and review issues.",
    difficulty: "Beginner",
    competition: "Medium",
    avgSlots: 10
  },
  {
    rank: 22,
    name: "Blender Foundation",
    category: "tools",
    categoryLabel: "Creative & Tools",
    tagline: "Free and open 3D creation suite",
    description: "Global standard for 3D modeling, animation, VFX, and game assets. Projects involve geometry nodes, real-time rendering (EEVEE/Cycles), and Python API.",
    tech: ["C++", "Python", "OpenGL", "Vulkan"],
    chatPlatform: "Matrix",
    chatUrl: "https://blender.chat",
    starterRepo: "blender/blender",
    starterRepoUrl: "https://projects.blender.org/blender/blender",
    history: [{ year: '22', count: 8 }, { year: '23', count: 10 }, { year: '24', count: 9 }, { year: '25', count: 11 }, { year: '26', count: 12 }],
    lastCommit: "10 mins ago",
    guidanceNote: "Use their native blender.chat channels and projects.blender.org for issues and pull requests.",
    difficulty: "Advanced",
    competition: "High",
    avgSlots: 10
  },
  {
    rank: 23,
    name: "Inkscape",
    category: "tools",
    categoryLabel: "Creative & Tools",
    tagline: "Professional vector graphics editor for Linux, Windows, macOS",
    description: "Loved by millions of illustrators and designers. Clean C++ modern codebase with extensible Python extension scripting ecosystem.",
    tech: ["C++", "GTK", "Python", "SVG"],
    chatPlatform: "Matrix",
    chatUrl: "https://chat.inkscape.org",
    starterRepo: "inkscape/inkscape",
    starterRepoUrl: "https://gitlab.com/inkscape/inkscape",
    history: [{ year: '22', count: 6 }, { year: '23', count: 8 }, { year: '24', count: 8 }, { year: '25', count: 9 }, { year: '26', count: 10 }],
    lastCommit: "3 hours ago",
    guidanceNote: "Extensions and SVG rendering filters are great initial PR targets to demonstrate familiarity before proposal submission.",
    difficulty: "Beginner",
    competition: "Medium",
    avgSlots: 8
  },
  {
    rank: 24,
    name: "GNOME Foundation",
    category: "systems",
    categoryLabel: "Systems & Desktop",
    tagline: "Simple and accessible Linux desktop environment and software",
    description: "One of the cornerstones of open source desktop computing. Mentors guide projects in Rust, C, JavaScript (GJS), and human interface guidelines (HIG).",
    tech: ["C", "Rust", "JavaScript", "GTK4"],
    chatPlatform: "Matrix",
    chatUrl: "https://matrix.to/#/#gnome:gnome.org",
    starterRepo: "GNOME/gnome-shell",
    starterRepoUrl: "https://gitlab.gnome.org/GNOME/gnome-shell",
    history: [{ year: '22', count: 12 }, { year: '23', count: 14 }, { year: '24', count: 13 }, { year: '25', count: 15 }, { year: '26', count: 16 }],
    lastCommit: "1 hour ago",
    guidanceNote: "GNOME's 'Newcomers' guide and Matrix channels are exceptionally welcoming. Target core GNOME Circle apps for starter issues.",
    difficulty: "Beginner",
    competition: "Medium",
    avgSlots: 14
  },
  {
    rank: 25,
    name: "Open Chemistry",
    category: "tools",
    categoryLabel: "Creative & Tools",
    tagline: "Open source chemical software and molecular visualization",
    description: "Umbrella organization for Avogadro, Open Babel, and cclib. Cross-discipline projects combining chemistry, physics, 3D visualization, and WebGL.",
    tech: ["C++", "Python", "Qt", "WebGL"],
    chatPlatform: "Discourse",
    chatUrl: "https://discuss.avogadro.cc",
    starterRepo: "openchemistry/avogadrolibs",
    starterRepoUrl: "https://github.com/openchemistry/avogadrolibs",
    history: [{ year: '22', count: 6 }, { year: '23', count: 8 }, { year: '24', count: 7 }, { year: '25', count: 9 }, { year: '26', count: 9 }],
    lastCommit: "5 hours ago",
    guidanceNote: "Wonderful option for STEM students. Mentioning science or chemistry domain interest in your proposal creates an immediate connection.",
    difficulty: "Intermediate",
    competition: "Medium",
    avgSlots: 8
  }
];

export const TOP_5_GSOC_ORGS = CURATED_GSOC_ORGS.slice(0, 5);

export interface GsocAnalytics {
  totalAnalyzedOrgs: number;
  totalAnnualSlots: number;
  avgSlotsPerOrg: number;
  funnelStages: { stage: string; count: string; rate: string; note: string }[];
  categoryDistribution: { category: string; label: string; percentage: number; color: string; avgSlots: number }[];
  difficultyBreakdown: { level: string; count: number; percentage: number; advice: string }[];
  competitionMatrix: { level: string; count: number; avgApplicants: string; strategy: string }[];
}

export const GSOC_ANALYTICS: GsocAnalytics = {
  totalAnalyzedOrgs: 25,
  totalAnnualSlots: 467,
  avgSlotsPerOrg: 18.7,
  funnelStages: [
    { stage: "Registered Applicants", count: "50,000+", rate: "100%", note: "Account created on Google Summer of Code portal" },
    { stage: "Submitted Proposals", count: "7,500", rate: "15.0%", note: "Completed proposals officially submitted before deadline" },
    { stage: "Mentors Interviewed / Shortlisted", count: "2,200", rate: "4.4%", note: "Candidates with merged PRs evaluated by org maintainers" },
    { stage: "Google Slot Allocations Granted", count: "1,200", rate: "2.4%", note: "Final accepted contributors selected worldwide" },
    { stage: "Graduated Contributors (Stipend Paid)", count: "1,080", rate: "2.1%", note: "Passed both Midterm and Final evaluations successfully" }
  ],
  categoryDistribution: [
    { category: "python", label: "Python & Core Ecosystem", percentage: 28, color: "from-blue-500 to-indigo-600", avgSlots: 22 },
    { category: "systems", label: "Systems, Compilers & Cloud", percentage: 32, color: "from-emerald-500 to-teal-600", avgSlots: 26 },
    { category: "js-ts", label: "JavaScript & TypeScript", percentage: 24, color: "from-amber-500 to-yellow-600", avgSlots: 15 },
    { category: "tools", label: "Creative, Tools & STEM", percentage: 16, color: "from-purple-500 to-pink-600", avgSlots: 10 }
  ],
  difficultyBreakdown: [
    { level: "Beginner Friendly", count: 8, percentage: 32, advice: "Ideal for first-time open source contributors. Comprehensive dev guides and responsive mentor chats." },
    { level: "Intermediate", count: 11, percentage: 44, advice: "Requires solid grasp of design patterns, unit testing, and framework-specific architectures." },
    { level: "Advanced", count: 6, percentage: 24, advice: "Compiler internals, kernel drivers, distributed systems, or SIMD graphics. Significant pre-proposal PR proof required." }
  ],
  competitionMatrix: [
    { level: "Medium", count: 10, avgApplicants: "8 - 15 per slot", strategy: "High chance of acceptance with 1-2 merged PRs and regular community engagement." },
    { level: "High", count: 11, avgApplicants: "20 - 35 per slot", strategy: "Requires co-designing proposal architecture with mentors 3+ weeks early." },
    { level: "Extremely High", count: 4, avgApplicants: "45+ per slot", strategy: "Target specific sub-projects or specialized modules to bypass the generic applicant flood." }
  ]
};


export interface MasterTimelinePhase {
  phase: string;
  dates: string;
  status: "completed" | "active" | "upcoming";
  title: string;
  summary: string;
  tacticalChecklist: string[];
}

export const MASTER_TIMELINE: MasterTimelinePhase[] = [
  {
    phase: "Phase 0: Scouting & Setup",
    dates: "Nov – Jan",
    status: "completed",
    title: "Repo Reconnaissance & Environment Setup",
    summary: "Don't wait for Google's official announcement. Focus on perennial organizations that have participated for 3+ consecutive years.",
    tacticalChecklist: [
      "Select 1-2 perennial organizations matching your core tech stack",
      "Clone the repos, resolve local dependencies, and get the test suite running green",
      "Lurk in communication channels to observe review culture and active maintainers",
      "Submit your first documentation or minor test PR"
    ]
  },
  {
    phase: "Phase 1: Org Announcement & Triage",
    dates: "Feb – Late Feb",
    status: "active",
    title: "Organizations Announced & Deep Engagement",
    summary: "Google publishes the accepted mentoring organizations list. Verify if your target org was accepted and read their Ideas List immediately.",
    tacticalChecklist: [
      "Confirm target org acceptance on summerofcode.withgoogle.com",
      "Analyze the official Project Ideas list and identify 2 prospective projects",
      "Have at least 1-2 merged PRs resolving confirmed bugs in the repo",
      "Engage respectfully in public issue discussions to demonstrate technical competence"
    ]
  },
  {
    phase: "Phase 2: Proposal Drafting & Review",
    dates: "March – Early April",
    status: "upcoming",
    title: "Contributor Application & Co-Design",
    summary: "The official submission window. Share drafts early with mentors and refine your timeline until every milestone is measurable.",
    tacticalChecklist: [
      "Publish an RFC discussing your proposed architecture in the org forum",
      "Create a commentable Google Doc draft and request mentor feedback 3 weeks before deadline",
      "Finalize the 12-week timeline with 2 buffer weeks and a clear midterm deliverable",
      "Submit final PDF proposal to the Google Summer of Code portal before the deadline"
    ]
  },
  {
    phase: "Phase 3: Community Bonding",
    dates: "May",
    status: "upcoming",
    title: "Official Bonding & Architecture Alignment",
    summary: "Accepted contributors spend 4 weeks solidifying expectations, setting up automated environments, and bonding with team members.",
    tacticalChecklist: [
      "Attend the kickoff sync call with your assigned 1-on-1 mentors",
      "Establish weekly recurring check-in meetings and communication cadences",
      "Break your Week 1 deliverables into discrete GitHub issues or tracker tasks",
      "Set up your public weekly progress tracker blog or discussion thread"
    ]
  },
  {
    phase: "Phase 4: Coding & Evaluations",
    dates: "June – August",
    status: "upcoming",
    title: "Execution, Midterm & Final Evaluations",
    summary: "Write clean, tested code. Deliver the midterm milestone in July to unlock payout 1, and wrap up documentation and final PRs in August.",
    tacticalChecklist: [
      "Push clean atomic commits and open Draft PRs early for continuous feedback",
      "Over-communicate blockers: notify mentors immediately if you fall 3+ days behind schedule",
      "Pass Midterm Evaluation (Week 6) to receive initial stipend distribution",
      "Pass Final Evaluation (Week 12) with merged code, comprehensive tests, and final report"
    ]
  }
];
