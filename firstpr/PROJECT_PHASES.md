# FirstPR Project Phases

This document outlines the build phases for the FirstPR project, based on the frontend technical specification. It is designed to help coordinate work across the team.

## Phase 0 — Foundation (Completed)
**Scope:** Vite + TS + Tailwind v4 + shadcn, app shell, routing, theme-switch wiring, command palette skeleton, design system tokens, 21st MCP configuration.
**Acceptance Criteria:** Routes load; theme switch toggles; `axe` clean; deploys.

## Phase 1 — Core Teaching
**Scope:** Home page, Workflow Visualizer, Learn hub + first 4 modules, Cheatsheet.
**Key Deliverables:** 
- Interactive Workflow Visualizer (rendering 9 steps of fork-to-PR).
- Markdown/JSON based module renderer for the Learn hub.
- Animated Home page components.
**Acceptance Criteria:** A beginner can finish modules 1–4 and replay the workflow with keyboard only.

## Phase 2 — Practice
**Scope:** Terminal Lab engine + scenarios 1–5, Rescue, Checklist + validators.
**Key Deliverables:**
- Simulated browser-based Terminal + virtual Git repo engine.
- Rescue cards for common mistakes.
- Interactive PR readiness checklist.
**Acceptance Criteria:** A scenario can be completed, failed, hinted, and reset without errors.

## Phase 3 — Explore
**Scope:** Orgs, GSoC insights, Programs + planner, AI policy (Note: needs CSV exports for data).
**Key Deliverables:**
- Filterable Explorer for orgs with cards and detail views.
- GSoC ranking and selection charts.
- Yearly planner with `.ics` export.
**Acceptance Criteria:** Filters respond in <100 ms; every item shows a verified date.

## Phase 4 — Backend
**Scope:** Express API, issue proxy + cache, progress sync, content build script.
**Key Deliverables:**
- Express backend serving content routes.
- GitHub Search API proxy for "good first issues" with rate-limit handling.
- Build script converting CSV data to JSON.
**Acceptance Criteria:** Rate-limit states handled gracefully; content updates without a code change.

## Phase 5 — Polish
**Scope:** UI/UX styling integration, 21st.dev pieces, reduced-motion pass, perf budget, SEO prerender, remaining modules and lab scenarios, tests.
**Key Deliverables:**
- Final styling pass implementing exact visual requirements.
- 21st.dev decorative components.
- Vitest/Playwright testing.
**Acceptance Criteria:** Performance budgets met (Initial JS ≤ 180 KB); Playwright smoke tests green; zero `axe` accessibility violations.
