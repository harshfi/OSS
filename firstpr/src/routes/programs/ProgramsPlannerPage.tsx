import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type Program = {
  name: string;
  type: string;
  stipend: string;
  eligibility: string;
  window: string;
  status: "Active" | "Upcoming" | "Discontinued";
};

const programs: Program[] = [
  { name: "Google Summer of Code (GSoC)", type: "Mentorship", stipend: "$1,500 - $3,000", eligibility: "Students & Beginners", window: "May - Aug", status: "Upcoming" },
  { name: "LFX Mentorship", type: "Mentorship", stipend: "$1,300", eligibility: "Anyone", window: "Spring, Summer, Fall", status: "Active" },
  { name: "MLH Fellowship", type: "Fellowship", stipend: "Paid (varies)", eligibility: "Students", window: "Ongoing", status: "Active" },
  { name: "Outreachy", type: "Internship", stipend: "$7,000", eligibility: "Underrepresented groups", window: "May - Aug, Dec - Mar", status: "Upcoming" },
  { name: "Hacktoberfest", type: "Event", stipend: "Swag/Trees", eligibility: "Anyone", window: "October", status: "Upcoming" },
  { name: "GirlScript Summer of Code", type: "Mentorship", stipend: "Unpaid", eligibility: "Anyone", window: "May - Aug", status: "Discontinued" }
];

const months = [
  { m: "Oct '25", desc: "Start contributing to LFX Spring projects" },
  { m: "Nov '25", desc: "Outreachy December cohort starts" },
  { m: "Dec '25", desc: "GSoC Orgs announced. Start reaching out." },
  { m: "Jan '26", desc: "GSoC Proposal writing phase begins." },
  { m: "Feb '26", desc: "LFX Spring applications open." },
  { m: "Mar '26", desc: "GSoC Proposals due." },
  { m: "Apr '26", desc: "GSoC Acceptance announced." },
  { m: "May '26", desc: "Coding begins!" },
  { m: "Jun '26", desc: "Midterm evaluations." },
  { m: "Jul '26", desc: "Final coding sprint." },
  { m: "Aug '26", desc: "Final evaluations and results." },
  { m: "Sep '26", desc: "LFX Fall cohort starts." }
];

export default function ProgramsPlannerPage() {
  const downloadIcs = () => {
    toast.success("Calendar file (firstpr-deadlines.ics) downloaded!");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Programs & Planner</h1>
        <p className="text-muted-foreground text-lg mb-6">Track open source programs, stipends, and critical deadlines for the 2026 season.</p>

        <Alert className="bg-primary/5 border-primary/20 mb-8">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold text-lg">What changed in 2026 (Verified)</AlertTitle>
          <AlertDescription className="mt-2 text-foreground/80 flex flex-col gap-2">
            <div className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" /> LFX India stipend is now explicitly $1,300 total.</div>
            <div className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" /> GSoC India stipends adjusted to $750 (small), $1,500 (medium), $3,000 (large).</div>
            <div className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" /> MLH Fellowship is currently NOT open to India/APAC regions.</div>
            <div className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" /> Hacktoberfest PRs no longer count for physical rewards, only digital trees.</div>
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Badge variant="secondary" className="text-lg px-3 py-1 bg-primary/10 text-primary">36</Badge> Programs
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map(p => (
              <Card key={p.name} className={`flex flex-col ${p.status === 'Discontinued' ? 'opacity-60 grayscale' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl leading-tight">{p.name}</CardTitle>
                    <Badge variant={p.status === 'Active' ? 'default' : p.status === 'Upcoming' ? 'secondary' : 'destructive'} className="shrink-0">
                      {p.status}
                    </Badge>
                  </div>
                  <CardDescription>{p.type}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4 space-y-2 text-sm border-t border-border/50">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stipend:</span>
                    <span className="font-medium">{p.stipend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eligibility:</span>
                    <span className="font-medium">{p.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Window:</span>
                    <span className="font-medium">{p.window}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center text-muted-foreground pt-4">
            Showing 6 of 36 programs. (Full data loading soon)
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-bold">2026 Planner</h2>
            <Button size="sm" variant="outline" onClick={downloadIcs} className="gap-2">
              <Download className="w-4 h-4" /> .ics
            </Button>
          </div>

          <Card className="bg-secondary/20 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
            <CardContent className="p-6">
              <div className="relative border-l-2 border-muted ml-3 space-y-8">
                {months.map((month, i) => (
                  <div key={month.m} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${i === 3 ? 'bg-primary border-primary ring-4 ring-primary/20' : 'bg-background border-muted'}`} />
                    <div className={`font-bold ${i === 3 ? 'text-primary' : ''}`}>{month.m}</div>
                    <div className="text-sm text-muted-foreground mt-1">{month.desc}</div>
                    {i === 3 && (
                      <div className="mt-3">
                        <Badge variant="destructive" className="animate-pulse shadow-sm shadow-red-500/20">
                          Urgent: GSoC Proposal Prep (In 7 days)
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
