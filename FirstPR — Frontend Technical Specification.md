# FirstPR — Frontend Technical Specification

*Working title. Version 0.2 · 2 October 2026 · Stack: React + Node.js*

> **Scope note:** this version covers features, sections and architecture only. Visual design (colours, typography, spacing, theming, motion styling) is deliberately excluded and will be handled in the UI/UX phase. §4 defines the handoff contract between the two.

A guided, animated, hands-on website that takes a student from "what is a fork?" to "my first merged pull request" and then to GSoC, LFX and other programs.

**Source material this spec is built from:** Harsh Bhaiya's Open Source Sheet (16 sections), Assignment 3 PR workflow, `gsoc.html` project data (2022–2026), and the first tab of the Open Source Contribution Guide workbook (100 orgs, 36 programs, events, AI roadmap, AI policies, monthly plan, git cheatsheet). Other workbook tabs were not readable and are marked **\[needs CSV\]** below.

**Legend:** ✅ verified against current docs during research · 🧭 recommendation (change freely).

---

## 1. Product goals and principles

**Audience:** 1st–3rd year CS students in India, mostly on mid-range phones and college Wi-Fi. They know some JavaScript and have never opened a PR.

**The main problem to solve:** beginners stall on (a) the three-copy mental model (upstream / origin / local) and (b) fear of breaking git. So the site teaches by *showing* and *letting them practice*, not by long reading.

**Principles**

1. **Show, then do.** Every concept has an animation first, then a hands-on step.
2. **One screen, one idea.** Short steps, no walls of text.
3. **Safe to fail.** The terminal lab can't damage anything and explains every error.
4. **Honest data.** Every date, stipend and policy shows a "last verified" stamp.
5. **Motion with purpose.** Animation explains state changes. It is never decoration, and it always respects reduced-motion settings.
6. **Mobile first.** Phones are the primary device; desktop gets extra space, not extra features.

---

## 2. Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Build | Vite + React 19 + TypeScript | 🧭 SPA fits a guided app; add prerendering later for SEO landing pages. |
| Styling layer | Tailwind CSS v4 via `@tailwindcss/vite` (assumed) | ✅ v4 needs no `tailwind.config.js`; just `@import "tailwindcss"` in the main CSS. Visual design itself is owned by the UI/UX phase. |
| Components | shadcn/ui (Radix + Tailwind) | ✅ Works with Vite; `components.json` sets `tailwind.config` to empty for v4; uses `tw-animate-css`, not `tailwindcss-animate`. Needs the `@/*` alias in **both** `tsconfig.json` and `tsconfig.app.json`. |
| Animation | `motion` package | ✅ Formerly framer-motion. Import from `"motion/react"`. Provides `useScroll`, layout animations (`layout` prop), `AnimatePresence`, `MotionConfig`, `useReducedMotion`. |
| Routing | React Router (data router) | 🧭 Lazy route chunks. |
| Server state | TanStack Query | 🧭 Caching for API + GitHub proxy. |
| Client state | Zustand + `persist` | 🧭 Progress, terminal state, theme. |
| Search / filter | Fuse.js | 🧭 For org explorer and command palette. |
| Code highlight | Shiki (build-time or lazy) | 🧭 |
| Command palette | shadcn `Command` (cmdk) | 🧭 |
| Icons | lucide-react | 🧭 |
| Validation | Zod | 🧭 Same schemas validate content JSON and API responses. |
| Testing | Vitest + Testing Library, Playwright | 🧭 Plus `axe` accessibility checks in Playwright. |
| 21st.dev | Selected components only | See §8. |

**Why `LazyMotion`:** the `m` component with `domAnimation` features cuts animation bundle size (✅ documented pattern). Use it at the app root, and load heavier features such as layout or drag only on pages that need them.

### 2.1 System architecture

```
┌──────────────────────────── Browser (React SPA) ────────────────────────────┐
│  Router ── Pages ── Feature modules                                          │
│    │                 ├─ Workflow Visualizer  (pure render of stepIndex)      │
│    │                 ├─ Terminal Lab         (command engine + virtual repo) │
│    │                 ├─ Learn / Rescue / Checklist / Cheatsheet (static MDX)  │
│    │                 └─ Orgs / GSoC / Programs / Issues (API-backed)          │
│  State:  TanStack Query (server data) · Zustand+persist (progress, lab, prefs)│
│  Service worker: cache static content, offline modules + lab                 │
└───────────────┬──────────────────────────────────────────────────────────────┘
                │ HTTPS /api/*
┌───────────────▼────────────── Node.js (Express) ─────────────────────────────┐
│  Content routes (orgs, programs, events, gsoc, policies)  ← JSON from build  │
│  Issues proxy ── cache (in-memory/Redis) ── GitHub Search API (server token) │
│  Progress + feedback routes ── MongoDB (optional, for synced progress)       │
└───────────────▲──────────────────────────────────────────────────────────────┘
                │ build step
        scripts/build-content.ts  ← workbook CSVs + gsoc.html data + MDX modules
```

**Key architectural rules**

1. The Workflow Visualizer and Terminal Lab run entirely client-side. They need no backend.
2. Static learning content ships with the app. Only the directory data and issue search need the API.
3. All content is validated by Zod at build time, so a bad CSV row fails the build and never reaches users.
4. The app works without an account. Progress lives in `localStorage` and can be exported or synced later.

---

## 3. Information architecture

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Hook, show the journey, route people to the right starting point |
| `/learn` | Learning path hub | 12 modules, progress, "continue where you left off" |
| `/learn/:slug` | Module | One concept per module (template in §6.3) |
| `/workflow` | Workflow visualizer | Interactive 9-step fork-to-PR animation |
| `/lab` | Terminal lab | Practice scenarios in a simulated shell |
| `/lab/:scenario` | Scenario | One guided scenario |
| `/rescue` | "I messed up" | Pick a mistake, get the fix |
| `/issues` | Find an issue | Live GitHub good-first-issue search |
| `/orgs` | Org explorer | 100 orgs, filter by tier / stack / program |
| `/orgs/:id` | Org detail | History, ideas link, starter repo, tips |
| `/gsoc` | GSoC insights | Ranked projects, yearly selection charts |
| `/programs` | Programs and planner | 36 programs, deadlines, year planner |
| `/events` | Events calendar | Oct 2026 – Nov 2027 **\[needs CSV\]** |
| `/ai-policy` | AI policy guide | What each org allows or bans **\[needs CSV\]** |
| `/checklist` | PR-ready checklist | Pre-submit self check |
| `/cheatsheet` | Git cheatsheet | Searchable, copy-to-clipboard |
| `/progress` | My progress | Badges, streaks, saved orgs |
| `/about` | About and credits | Authors, sources, how to contribute to this site |

Global: command palette (`⌘K` / `Ctrl+K`, and a search button on mobile), theme toggle, progress ring in the nav.

---

## 4. UI/UX handoff contract

Engineering delivers fully functional, unstyled-or-minimally-styled screens. The UI/UX phase owns the entire visual layer. To make that swap clean:

**Engineering guarantees**

- Every component takes visual choices through the design system (class names / CSS variables / variants), never hard-coded values.
- Light / dark theme switching is wired (`data-theme` attribute + user preference); the actual themes come from UI/UX.
- All animation timing values live in one shared motion config file (`lib/motion.ts`) so UI/UX can retune them in one place.
- Every page implements the states listed below.

**UI/UX phase delivers**

- Design tokens, typography, spacing, theme palettes, and component styling.
- Visual treatment for the states and interactions listed below.
- Final selection and styling of any 21st.dev components (see §8).

**States every data-driven section must support:** loading (skeleton), empty, error with retry, offline, and populated.

**Interactions that need designed feedback** (behaviour is fixed; look is open):

- Step change in the Workflow Visualizer (active node, moving arrow, new commit).
- Correct / incorrect answer in quizzes and lab goals.
- Terminal error output, success output, and hint reveal.
- Module complete, badge unlocked, scenario complete.
- Filter change reflowing cards in the explorer.
- Deadline chips at normal / approaching / urgent states.
- Copy-to-clipboard confirmation.
- Route transitions and scroll-linked effects.

**Responsive behaviours that are functional (not just stylistic):**

- Mobile uses a bottom tab bar; desktop uses the top bar.
- The Terminal Lab becomes tabs (Terminal | Goal | Graph) on mobile, with an on-screen helper key row.
- The Workflow Visualizer stacks vertically on mobile.
- Tables (programs, policies) become cards on mobile.

**Motion rules (behavioural):**

- The app is wrapped in `<MotionConfig reducedMotion="user">`; every animation has a reduced-motion fallback (instant change plus a brief highlight).
- Prefer animating transform and opacity. Reflow animation goes through the `layout` prop.
- Only one major animation should be playing in view at a time.
- Scroll-linked effects are disabled on touch devices where they conflict with native scrolling.

---

## 5. App shell

**Top bar:** logo, main links (Learn, Lab, Explore, Plan), search button, theme toggle, progress ring. **Mobile:** bottom tab bar (Learn, Lab, Explore, Plan, Me) with an animated active indicator using `layoutId`. **Page transitions:** animated route changes via `AnimatePresence mode="wait"` keyed by route (look defined by UI/UX). **Scroll progress:** a scroll-progress indicator driven by `useScroll().scrollYProgress` on long pages. **Footer:** credits (Harsh Bhaiya, Vikas Patel), sources, "last data refresh" date, GitHub link. **Toasts:** copy confirmations, badge unlocks. **Error and offline states:** every data section has a skeleton, an error card with retry, and an empty state.

---

## 6. Page specifications

### 6.1 Home (`/`)

Sections in order:

1. **Hero** — headline ("Make your first open-source contribution"), subtext, two CTAs ("Start the journey", "Try the terminal"). Right side: a live animated mini git graph where commits draw in and a PR arrow flies from a fork to the original repo (SVG `pathLength` animation). Reduced-motion: static final frame.
2. **"Where are you?" selector** — three cards: *Never used Git* → `/learn/01`, *Know Git, never contributed* → `/workflow`, *Ready for programs* → `/programs`. Selected card expands with `layout`.
3. **The journey strip** — horizontal (vertical on mobile) six-stop path: Learn → Practice → Find issue → Open PR → Get reviewed → Level up. Stops light up as the user scrolls (`useScroll` + `useTransform`).
4. **Three-copies explainer** — compact version of the workflow visualizer (3 nodes + 4 arrows), autoplays once in view, with a "See the full walkthrough" button.
5. **Feature grid** — Terminal lab, Rescue, Issue finder, Org explorer, Planner. Each tile has a short looping preview.
6. **Numbers** — animated count-up stats pulled from data: orgs (100), programs (36), GSoC years of data (2022–2026), modules. Counts animate once when visible.
7. **GSoC teaser** — top 5 JS/TS projects with mini yearly bars.
8. **Assignment callout** — for students on the PR assignment: PR checklist and title format example (`[Roll 24] fix: …`). 🧭 Make this a configurable banner so it can be hidden after the deadline.
9. **FAQ accordion** — "Do I need to be an expert?", "Can I use AI?", "What if my PR is rejected?".
10. **Final CTA** and footer.

### 6.2 Learn hub (`/learn`)

- Header with overall progress ring and "Continue" button.
- **12-module path** shown as a vertical sequence of module nodes. Locked / unlocked / complete states; completed nodes show an animated check (`pathLength`).
- Module list (from Harsh's sheet):

| # | Module | Core interaction |
| --- | --- | --- |
| 01 | Why contribute | Myth-vs-fact flip cards |
| 02 | Key terms | Matching game (term ↔ meaning) |
| 03 | One-time setup | Checklist with OS tabs (Win / macOS / Linux) |
| 04 | Finding a project and issue | Mini "read the repo" exercise on a mock repo page |
| 05 | The contribution workflow | Embeds the Workflow Visualizer |
| 06 | Why branches | Side-by-side "main vs branch" graph animation |
| 07 | Writing a good PR | Live PR template editor with a quality meter |
| 08 | Handling code review | Chat-style review simulation |
| 09 | Keeping your fork in sync | Merge vs rebase animation |
| 10 | Fixing common mistakes | Links into Rescue |
| 11 | Etiquette | Do/Don't swipe cards |
| 12 | Practice exercise | `first-contributions` scenario in Terminal Lab |

### 6.3 Module page template

Left (desktop) sticky outline; right content. Each module is made of **blocks** rendered from JSON/MDX:

- `Prose` — short paragraphs.
- `Callout` — tip, warning, "common mistake".
- `Code` — Shiki-highlighted, copy button, `# comment` lines dimmed.
- `Diagram` — named animated diagram component.
- `Try` — launches a terminal-lab mini scenario inline.
- `Quiz` — 3 questions, instant feedback with distinct correct / incorrect states.
- `Next` — next-module card.

Module completion = all `Try` and `Quiz` blocks done. Completion triggers a badge toast.

### 6.4 Workflow Visualizer (`/workflow`) — the centrepiece

**Layout:** three columns/nodes: **Original repo (upstream)**, **Your fork (origin)**, **Local clone**. Below: a step list with a play / pause / prev / next control and a scrubber.

**The nine steps** (from the sheet):

1. Fork → fork node appears, arrow from upstream to origin.
2. Clone → copy flows from fork to local.
3. Add upstream remote → a second dashed line connects local to upstream.
4. Sync and create branch → `main` pulls from upstream, a branch pill splits off.
5. Make changes → file icons change in local.
6. Stage and commit → commit dot appears on branch.
7. Push → commit travels local → fork.
8. Open PR → card travels fork → upstream with "Compare & pull request".
9. Review, merge, clean up → merge dot lands on upstream main; branch pill fades; local syncs.

**Implementation**

- A single typed state machine drives everything:

```ts
type Node = "upstream" | "origin" | "local";
type Step = {
  id: number; title: string; command?: string; explain: string;
  graph: { commits: Commit[]; branches: Branch[]; remotes: Remote[] };
  highlight: Node[]; edge?: { from: Node; to: Node; label: string };
};
```

- Rendering is a pure function of `stepIndex`, so scrubbing, reverse and deep links (`/workflow?step=7`) all work.
- Arrows: SVG paths with `pathLength` 0→1; moving "packets" use `offsetPath` or `useAnimate` sequences.
- Commit dots use `layout` and `layoutId` so they glide when the graph re-flows.
- Keyboard: ←/→ step, Space play/pause. Screen reader: each step announces its title and explanation via `aria-live="polite"`.
- Mobile: nodes stack vertically; arrows become vertical.
- Reduced-motion: steps change instantly with a highlight flash instead of travelling packets.

**Variants** (toggle in the UI): *Fork workflow* (open-source, default), *Direct-branch workflow* (team repo), and *What goes wrong if you push to main* (error-state version of the graph from Harsh's section 6).

### 6.5 Terminal Lab (`/lab`)

**Concept:** a simulated shell and virtual git repo running fully in the browser. No real commands run.

**Screen layout (desktop):** terminal (left, 60%), "Goal / Hints / Repo state" panel (right, 40%) with a live mini graph of the virtual repo. Mobile: tabs (Terminal | Goal | Graph) and a custom on-screen key row (`git`, `↑`, `Tab`, `-`).

**Scenarios (v1)**

1. Configure Git identity
2. Fork-clone-upstream setup (`git clone`, `git remote add`, `git remote -v`)
3. Create a branch, edit, commit
4. Push and read the "open PR" hint
5. Sync a stale fork (fetch / merge / push)
6. Rebase a behind PR branch and `--force-with-lease`
7. Fix "I committed to main"
8. Resolve a merge conflict
9. Squash last 3 commits
10. The `first-contributions` practice exercise

**Engine design**

```ts
type RepoState = {
  cwd: string; remotes: Record<string, string>;
  branches: Record<string, string[]>;      // name -> commit ids
  head: string; staged: string[]; modified: string[]; files: Record<string,string>;
  commits: Record<string, {msg:string; parent?:string}>;
  config: {name?:string; email?:string};
};
type Handler = (args: string[], s: RepoState) =>
  { out: string[]; state: RepoState; error?: string; hint?: string };
```

- A command registry maps `git checkout`, `git switch`, `git branch`, `git add`, `git commit`, `git push`, `git fetch`, `git merge`, `git rebase`, `git reset`, `git restore`, `git stash`, `git log`, `git status`, `git diff`, `git remote`, plus `ls`, `cd`, `cat`, `echo >>`, `clear`.
- Each scenario defines: starting state, goal predicates (`state => boolean`), hints (revealed progressively), and "known wrong moves" with tailored explanations.
- Tab-completion for commands and branch names; history with ↑/↓.
- Output streams in line by line (skippable); errors get a distinct feedback state.
- Progress saved per scenario; "Reset scenario" always available.
- 🧭 Build a small custom terminal component (a controlled input plus an output list). A full terminal emulator library isn't needed because there is no real shell.

### 6.6 Rescue (`/rescue`)

- Search box + chips for situations: *Committed to main*, *Wrong commit message*, *Forgot a file*, *Merge conflict*, *Pushed a secret*, *PR has someone else's changes*, *Need to squash*, *Lost a commit*, *Undo local changes*.
- Selecting one expands a **fix card** (`layout` animation) with: why it happened, numbered commands (copy buttons), a "try it in the lab" button, and a danger banner where relevant (e.g., rotate leaked keys; deleting the file isn't enough).
- Content comes straight from Harsh's section 10.

### 6.7 Find an issue (`/issues`)

- Filters: language, label (`good first issue`, `help wanted`), org/repo, sort (newest, most commented), "no assignee".
- Result cards: repo, issue title, labels, comment count, age, a "Read before you claim" checklist, and a "Copy claim comment" button that fills the template "I'd like to work on this. Plan: …".
- Behaviour: results stream in with a stagger; infinite scroll or "Load more".
- Data via our own API proxy (see §9). ✅ GitHub search allows 30 requests/min authenticated (10 unauthenticated) and returns at most 1,000 results per query, so the UI must paginate lightly and show friendly "try again in a minute" states.
- Fallback when the API is down: a curated static list of starter repos.

### 6.8 Org explorer (`/orgs`)

- **Filter bar** (sticky): tier (Beginner / Intermediate / Advanced), tech stack chips, "in GSoC 2026", "in LFX 2026", activity level; text search (Fuse.js).
- **Result grid** with `layout` + `AnimatePresence` so cards reflow smoothly when filters change.
- **Card:** name, tier badge, stack tags, program badges, 30-day commit activity sparkline, human-author count, "Starter repo" link, "Save" star.
- **Detail drawer / page:** description, GSoC history, ideas page, chat channel, contribution guide, AI policy summary, "good first issues now" (via the proxy).
- Data fields come from the workbook's **100 Orgs** tab **\[needs CSV\]**: tier, stack, GSoC/LFX 2026 flag, starter repo, links, activity.
- Counts at top from the sheet: 34 beginner, 38 intermediate, 28 advanced; 76 in GSoC 2026; 31 in LFX 2026.

### 6.9 GSoC insights (`/gsoc`)

- Tabs: Overall · JS/TypeScript · Java/Kotlin (plus language chips), same structure as `gsoc.html`.
- Ranked project cards with: rank, org, description, tech tags, yearly selection bars (2022–2026) that grow on view, last-commit date and a "cycle-based activity" marker, the tip text, and repo links.
- **Insight strip:** "Which orgs expect merged PRs first?" vs "which use evaluation tasks" (from the file).
- **How to get selected:** four animated steps (pick one project, set up and join chat, land small PRs, write a proposal).
- A clear disclaimer: umbrella org counts are estimates; org participation changes yearly.
- 🧭 Charts are small custom SVG bars, not a chart library, to keep the bundle small.

### 6.10 Programs and planner (`/programs`)

- **Programs table/cards** (36 programs): name, type, paid/unpaid, India stipend, eligibility, 2026 dates, next window, status (including discontinued, shown greyed with a tag).
- Highlight changes called out in the workbook: LFX India stipend now $1,300 total, GSoC India stipends $750 / $1,500 / $3,000, Hacktoberfest PRs no longer count for rewards, MLH Fellowship not open to India/APAC right now, Outreachy limits for Indian students, discontinued programs. 🧭 Show these in a "What changed in 2026" banner with a verified date.
- **Year planner:** a month-by-month timeline Oct 2026 → Sep 2027 (from the Monthly Plan tab **\[needs CSV\]**). Scroll-linked horizontal timeline, current month marked, each month expandable.
- **"Add to calendar"** button producing an `.ics` for deadlines.
- Deadline chips show "in N days" and switch to a warning state at 30 days and an urgent state at 7.

### 6.11 AI policy guide (`/ai-policy`)

- Table of orgs vs policy (allowed / restricted / banned / disclose-required) with a status chip and link to the source policy file (`AI_POLICY.md`, `AGENTS.md`, etc.).
- A short "How to use AI honestly" section aligned with the assignment's rule: use AI to learn and debug, understand every line you submit.
- Search by org.

### 6.12 Checklist (`/checklist`)

- Interactive pre-PR checklist from Harsh's list: read `CONTRIBUTING.md`, branch from up-to-date main, one issue per PR, `Closes #…`, tests pass, imperative commit messages, self-review diff, no secrets or unrelated files.
- Variant tab for **Assignment 3**: roll-number title format, branch pattern `type/issue-number-short-name`, Conventional Commit examples, 6:00 AM IST deadline. 🧭 Make course-specific content a config file so it can be switched off or reused for another cohort.
- **PR title and branch name validator:** type a title/branch and see live ✓/✗ against the pattern.

### 6.13 Cheatsheet (`/cheatsheet`)

Grouped commands (Setup, Every contribution, Sync, Fix-ups). Filter box, copy buttons, and a "try it" link per command into the lab.

### 6.14 Progress (`/progress`)

- Ring chart for modules, lab scenarios, quizzes.
- Badges (e.g., *Forked*, *First commit*, *Conflict slayer*, *PR-ready*).
- Saved orgs and a simple personal tracker (status dropdown + notes), mirroring the workbook's "My 10 Repos" tracker.
- Export/import progress as JSON (works without an account).

### 6.15 About and credits

Authors, content sources, data-verification dates, link to this site's own repo and a "Contribute to FirstPR" page. 🧭 This site's repo should be a beginner-friendly project itself, with good-first-issue labels.

---

## 7. Shared component inventory

| Component | Built by | Used in |
| --- | --- | --- |
| `AppShell`, `TopNav`, `BottomTabs`, `ScrollProgress` | Custom | All |
| `CommandPalette` | shadcn `Command` | All |
| `Button`, `Card`, `Badge`, `Tabs`, `Accordion`, `Dialog`, `Sheet`, `Tooltip`, `Select`, `Checkbox`, `Progress`, `Skeleton`, `Sonner` toast | shadcn/ui | All |
| `GitGraph` (SVG commits/branches/remotes) | Custom | Home, Workflow, Lab, Modules |
| `WorkflowStage` + `StepController` | Custom | Workflow, Modules |
| `Terminal`, `ScenarioPanel`, `HintLadder` | Custom | Lab, Modules |
| `CodeBlock` (Shiki + copy) | Custom | Everywhere |
| `QuizCard`, `FlipCard`, `MatchGame`, `SwipeCards` | Custom (Motion gestures) | Modules |
| `FilterBar`, `OrgCard`, `OrgDrawer` | Custom + shadcn | Orgs |
| `YearBars`, `Sparkline`, `ProgressRing` | Custom SVG | GSoC, Orgs, Progress |
| `Timeline` (scroll-linked) | Custom | Programs, Home |
| `CountUp` | Custom or registry | Home |
| `DeadlineChip`, `StatusChip`, `TierBadge` | Custom | Programs, Orgs |

---

## 8. Using 21st.dev (and what to watch for)

✅ **How it works:** 21st.dev hosts community React components. Many install via the shadcn CLI, and some use a 21st-specific URL that requires an API key (`API_KEY_21ST`). Free accounts have a limited number of installs per day, and a component's page lists its npm dependencies and its license, which can be "unknown".

**Rules for this project**

1. Use 21st.dev for **decoration-layer pieces only**, not for core logic: hero background effects, bento tiles, marquee/logo rows, number tickers, animated tabs/buttons, text effects.
2. **Check every component's license** before committing it. If it says "unknown", ask the author or replace it with our own version.
3. Copy the component into `src/components/vendor/21st/` with a header comment (source URL, author, license, date added).
4. Adapt it to the final design system (UI/UX phase) and make it respect `useReducedMotion` before it ships.
5. Never let a vendor component own state that matters (progress, terminal, workflow).
6. Install cap: no more than about 8–10 components total, to keep style and bundle size consistent.

**Candidate slots**

| Slot | Looking for |
| --- | --- |
| Hero background | Subtle grid / beams / spotlight |
| Feature grid | Bento card with hover glow |
| Stats | Count-up number |
| Org logos / tags | Marquee |
| Nav indicator | Animated tab underline |
| CTA | Shiny / magnetic button |
| FAQ | Smooth accordion |

(Final picks are made when we start the build and can see live previews.)

---

## 9. Data and API contract

### 9.1 Content as data

All learning and directory content is JSON/MDX validated by Zod. A build script converts the workbook CSVs into JSON.

```ts
type Module = { slug: string; order: number; title: string; minutes: number;
  blocks: Block[]; quiz: Question[]; };
type Org = { id: string; name: string; tier: "beginner"|"intermediate"|"advanced";
  stack: string[]; gsoc2026: boolean; lfx2026: boolean;
  starterRepo: string; links: Record<string,string>;
  activity: { commits30d: number; authors30d: number; checkedAt: string };
  aiPolicy?: "allowed"|"restricted"|"banned"|"disclose"; };
type Program = { id: string; name: string; type: string; paid: boolean;
  stipendIndia?: string; eligibility: string; dates2026?: string;
  nextWindow?: string; status: "open"|"upcoming"|"closed"|"discontinued";
  url: string; verifiedAt: string; };
type GsocProject = { name: string; orgId: string; stack: string[];
  yearly: [number,number,number,number,number]; lastCommit: string;
  tip: string; links: [string,string][]; };
```

### 9.2 Endpoints (Express)

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/orgs`, `/api/orgs/:id` | Directory |
| GET | `/api/programs`, `/api/events` | Programs and calendar |
| GET | `/api/gsoc` | Ranked projects |
| GET | `/api/policies` | AI policies |
| GET | `/api/issues?lang=&label=&q=&page=` | GitHub good-first-issue proxy (cached) |
| GET/PUT | `/api/progress` | Optional signed-in progress sync |
| POST | `/api/feedback` | "Was this helpful?" |

### 9.3 GitHub proxy rules

- Token stays on the server only.
- Cache responses (about 10 minutes) and de-duplicate identical queries so we stay inside the search limit (✅ 30 req/min authenticated).
- Return `{ items, rateLimitedUntil? }` so the UI can show a calm countdown.

### 9.4 Offline and caching

Static content is cached by a service worker (stale-while-revalidate); the lab and modules work offline after the first load.

---

## 10. Accessibility, performance, SEO

**Accessibility**

- Keyboard operable everywhere; visible focus rings.
- Every animation has a reduced-motion equivalent.
- Terminal has `role="log"` output and labelled input; hints are announced politely.
- Colour is never the only signal (icons + text on status chips).
- Target: zero serious `axe` violations on all routes.

**Performance budgets (🧭 targets)**

- Initial JS ≤ 180 KB gzip for `/`; route chunks lazy-loaded.
- LCP ≤ 2.5 s on a mid-range phone over throttled 4G; CLS \< 0.1.
- Images as SVG/AVIF; fonts and assets self-hosted.
- Heavy pages (Workflow, Lab) load their engines on demand.

**SEO and sharing**

- Prerender `/`, `/learn`, module pages, `/gsoc`, `/orgs` at build time.
- Open Graph images per page; a good title/description per route.

**Analytics (optional, privacy-friendly):** module completion rate, lab scenario drop-off points, most-used rescue cards. This shows where learners get stuck.

---

## 11. Folder structure

```
client/
  src/
    app/            router.tsx, providers.tsx, AppShell.tsx
    routes/         home/ learn/ workflow/ lab/ rescue/ issues/ orgs/ gsoc/
                    programs/ ai-policy/ checklist/ cheatsheet/ progress/ about/
    components/
      ui/           (shadcn)
      vendor/21st/  (copied registry components + license notes)
      git/          GitGraph, RemoteNode, Packet
      terminal/     Terminal, engine/, scenarios/
      viz/          YearBars, Sparkline, ProgressRing, Timeline
    content/        modules/*.mdx, data/*.json (generated)
    lib/            motion.ts (shared motion config), cn.ts, fuse.ts, github.ts
    stores/         progress.ts, lab.ts, prefs.ts
    styles/         (owned by UI/UX phase)
server/
  src/ routes/ services/github.ts cache.ts models/ scripts/build-content.ts
```

---

## 12. Build phases and acceptance criteria

| Phase | Scope | Done when |
| --- | --- | --- |
| **0 — Foundation** | Vite + TS + Tailwind v4 + shadcn, app shell, routing, theme-switch wiring, command palette skeleton | Routes load; theme switch toggles; `axe` clean; deploys |
| **1 — Core teaching** | Home, Workflow Visualizer, Learn hub + first 4 modules, Cheatsheet | A beginner can finish module 1–4 and replay the workflow with keyboard only |
| **2 — Practice** | Terminal Lab engine + scenarios 1–5, Rescue, Checklist + validators | A scenario can be completed, failed, hinted and reset without errors |
| **3 — Explore** | Orgs, GSoC insights, Programs + planner, AI policy (needs CSV exports) | Filters respond in \<100 ms; every item shows a verified date |
| **4 — Backend** | Express API, issue proxy + cache, progress sync, content build script | Rate-limit states handled; content updates without a code change |
| **5 — Polish** | UI/UX styling integration, 21st.dev pieces, reduced-motion pass, perf budget, SEO prerender, remaining modules and lab scenarios, tests | Budgets met; Playwright smoke tests green |

---

## 13. Risks and open decisions

1. **Content permissions:** the source text belongs to Harsh Bhaiya and Vikas Patel. Get their approval and credit them.
2. **Data freshness:** programs and policies change. Each record has `verifiedAt`; add a monthly refresh task.
3. **Missing workbook tabs:** I could read only the first tab. Export *100 Orgs, Programs, Events Calendar, AI Roadmap, AI Policies, Monthly Plan, Git Cheatsheet, Resources* as CSV to complete §6.8–6.11.
4. **Course-specific content:** the Assignment 3 material (roll-number titles, deadline) should be configurable, not hard-coded.
5. **Scope:** the terminal engine is the biggest single risk. Ship five scenarios first.
6. **Language:** English first. Hinglish copy for key explanations is a possible later addition.
7. **Accounts:** start with local-only progress; add login only if you want cohort dashboards.
8. **Name and branding:** "FirstPR" is a placeholder; visual identity comes from the UI/UX phase.

---

## 14. Complete feature index

| # | Feature | Where | Needs backend? |
| --- | --- | --- | --- |
| 1 | Animated hero git graph and "where are you?" router | Home | No |
| 2 | Journey strip with scroll-linked progress | Home | No |
| 3 | 12-module learning path with progress tracking | Learn | No |
| 4 | Module blocks: prose, callouts, code with copy, diagrams, quizzes, inline lab tasks | Modules | No |
| 5 | Interactive 9-step Workflow Visualizer (play / pause / scrub / deep link / 3 variants) | Workflow | No |
| 6 | Simulated terminal with virtual git repo, hints, goals, tab-complete, history, reset | Lab | No |
| 7 | 10 guided lab scenarios | Lab | No |
| 8 | "I messed up" rescue cards linked to lab | Rescue | No |
| 9 | Live good-first-issue finder with filters and "copy claim comment" | Issues | Yes (proxy) |
| 10 | 100-org explorer with filters, search, save, detail view | Orgs | Yes (or static JSON) |
| 11 | GSoC ranked projects with yearly selection charts and application guide | GSoC | Yes (or static JSON) |
| 12 | 36-program directory, "what changed" banner, status and deadline chips | Programs | Yes (or static JSON) |
| 13 | Year planner (Oct 2026 → Sep 2027) and `.ics` export | Programs | No |
| 14 | Events calendar | Events | Yes (or static JSON) |
| 15 | AI policy guide by organisation | AI policy | Yes (or static JSON) |
| 16 | Pre-PR checklist and Assignment 3 variant with title / branch validators | Checklist | No |
| 17 | Searchable git cheatsheet with copy and "try it" links | Cheatsheet | No |
| 18 | Progress dashboard, badges, saved orgs, personal tracker, JSON export/import | Progress | Optional (sync) |
| 19 | Command palette search across the whole site | Global | No |
| 20 | Theme switch, offline support, reduced-motion support | Global | No |
| 21 | Feedback widget ("was this helpful?") | Global | Yes |
| 22 | Credits, sources, data-verified stamps | About / footer | No |