import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROPOSAL_SECTIONS } from "./gsoc-data";
import { 
  FileText, 
  Copy, 
  Check, 
  CheckCircle2, 
  FileCode
} from "lucide-react";
import { toast } from "sonner";

const FULL_PROPOSAL_TEMPLATE = `# [Project Title]: [Sub-project / Feature Name]

## 1. Contributor Information
- **Name:** [Your Full Name]
- **Email:** [Your Email]
- **GitHub:** [https://github.com/yourhandle]
- **Time Zone:** UTC [+/- X] (e.g. UTC+5:30)
- **Primary Chat Handle:** [Matrix/Slack/Discord handle]

---

## 2. Project Synopsis & Objectives
### 2.1 Abstract
[A concise 200-word overview of the project, the user problem it solves, and why this is high priority for the organization.]

### 2.2 Concrete Deliverables
- [ ] Deliverable 1: [Core implementation / module]
- [ ] Deliverable 2: [Unit and integration test suite with >90% coverage]
- [ ] Deliverable 3: [User & API documentation + migration guide]

### 2.3 Non-Goals (Out of Scope)
- [Explicitly specify what will NOT be built in this summer to protect project scope.]

---

## 3. Technical Architecture & Implementation Spec
### 3.1 Current System State vs Proposed State
[Explain the current code path, why it is insufficient, and how your changes integrate.]

### 3.2 Key Classes, Functions & Files Affected
- \`src/core/...\`: [Brief explanation]
- \`src/api/...\`: [Brief explanation]

### 3.3 Dependencies & Tradeoffs
[Detail any new npm packages / crates / Python libraries introduced and justify bundle size or licensing.]

---

## 4. Prior Open Source Contributions
### 4.1 Contributions to This Organization
- Merged PR #[101]: [Title / link]
- Merged PR #[104]: [Title / link]
- Triaged Issue #[88]: [Reproduction report / link]

### 4.2 Other Open Source Experience
- [Repository Name]: [Link to merged PR or project]

---

## 5. Detailed 12-Week Timeline

### Community Bonding Period (May 1 – May 31)
- [ ] Set up staging sandbox and configure automated end-to-end tests.
- [ ] Align with mentor on data schemas in weekly sync.
- [ ] Break Week 1 tasks into granular GitHub sub-issues.

### Phase 1: Core Architecture (Weeks 1 – 6)
- **Week 1 (June 1 - June 7):** Scaffold module boundaries, setup interfaces.
- **Week 2 (June 8 - June 14):** Implement core algorithmic slice.
- **Week 3 (June 15 - June 21):** Integrate database persistence / state management.
- **Week 4 (June 22 - June 28):** Add unit tests & handle error recovery pathways.
- **Week 5 (June 29 - July 5):** End-to-end testing and initial draft PR review.
- **Week 6 (July 6 - July 12) [MIDTERM MILESTONE]:** 
  - Complete Phase 1 deliverable demo.
  - Land PR #1 to main branch.
  - Pass Midterm Evaluation.

### Phase 2: Feature Polish & Hardening (Weeks 7 – 12)
- **Week 7 (July 13 - July 19):** Implement secondary features and edge cases.
- **Week 8 (July 20 - July 26):** Performance optimization and benchmark runs.
- **Week 9 (July 27 - August 2):** Developer documentation & tutorial walkthrough.
- **Week 10 (August 3 - August 9):** Buffer week for code review changes and refactoring.
- **Week 11 (August 10 - August 16):** Final QA, edge case testing on different platforms.
- **Week 12 (August 17 - August 24) [FINAL EVALUATION]:**
  - Land all remaining PRs.
  - Submit final GSoC work product URL and report.

---

## 6. Time Commitment & Availability
- Planned commitment: **35 hours/week**.
- Typical working hours: **09:00 - 16:00 UTC**, Monday through Friday.
- University exams / conflicts: [Disclose dates clearly, e.g. "Exams from June 10-14. I have allocated extra hours in Week 2 to compensate."].
`;

export function GsocProposalGuide() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_PROPOSAL_TEMPLATE);
    setCopiedTemplate(true);
    toast.success("Complete 10/10 Proposal Template copied!");
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <section id="proposal-blueprint" className="mb-24 scroll-mt-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            The Winning Proposal Blueprint
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Anatomy of an Accepted Proposal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-2">
            Mentors evaluate dozens of proposals. The difference between rejection and acceptance is technical specificity and an honest, realistic timeline.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all cursor-pointer shrink-0 shadow-sm"
        >
          {copiedTemplate ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedTemplate ? "Template Copied!" : "Copy Markdown Template"}
        </button>
      </div>

      {/* Section Explorer Tabs */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-2">
          {PROPOSAL_SECTIONS.map((sec, idx) => {
            const isSelected = idx === activeSection;
            return (
              <button
                key={sec.title}
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-card border-primary shadow-sm"
                    : "bg-card border-border/50 hover:bg-muted/50 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Section 0{idx + 1}</span>
                  {isSelected && (
                    <Badge variant="outline" className="text-[10px] border-primary/50 text-primary bg-primary/10 font-bold">
                      Active Guide
                    </Badge>
                  )}
                </div>
                <div className="font-bold text-sm text-foreground">
                  {sec.title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                  {sec.requirement}
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          <Card className="h-full bg-card border-border shadow-sm flex flex-col justify-between">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <Badge variant="secondary" className="text-xs mb-3 text-primary bg-primary/10">
                  Required Proposal Section
                </Badge>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {PROPOSAL_SECTIONS[activeSection].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {PROPOSAL_SECTIONS[activeSection].requirement}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Key Elements Mentors Grade:
                </h4>
                <div className="space-y-2">
                  {PROPOSAL_SECTIONS[activeSection].keyDetails.map((detail, di) => (
                    <div key={di} className="text-xs text-foreground/90 p-3 rounded-lg bg-muted/30 border border-border/40 flex items-start gap-2.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-blue-500" /> Real Excerpt Example:
                </h4>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/40 font-mono text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                  {PROPOSAL_SECTIONS[activeSection].sampleExcerpt}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
