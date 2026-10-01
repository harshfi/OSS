import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, BookOpen, Trophy, ShieldAlert, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const topOrgs = [
  { rank: 1, name: "CNCF", selected: 943, graduated: 800, programs: 891, rate: "90%", appsPerSeat: 41 },
  { rank: 2, name: "Linux Kernel (LKMP)", selected: 560, graduated: 238, programs: 38, rate: "49%", appsPerSeat: 9 },
  { rank: 3, name: "LF Decentralized Trust", selected: 270, graduated: 158, programs: 176, rate: "68%", appsPerSeat: 34 },
  { rank: 4, name: "LF Connectivity – Magma", selected: 189, graduated: 52, programs: 1, rate: "28%", appsPerSeat: 3 },
  { rank: 5, name: "RISC-V International", selected: 148, graduated: 127, programs: 62, rate: "89%", appsPerSeat: 61 },
  { rank: 6, name: "Open Mainframe Project", selected: 98, graduated: 80, programs: 77, rate: "94%", appsPerSeat: 85 },
];

const cncfProjects = [
  { rank: 1, name: "Meshery", selected: 79, graduated: 68 },
  { rank: 2, name: "WasmEdge", selected: 58, graduated: 48 },
  { rank: 3, name: "KubeEdge", selected: 58, graduated: 47 },
  { rank: 4, name: "Kyverno", selected: 56, graduated: 49 },
  { rank: 5, name: "Kubernetes (incl. SIGs)", selected: 47, graduated: 42 },
];

export default function LfxInsightsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/10">Data Report: Sep 30, 2026</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">LFX Mentorship Insights</h1>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
          Top 15 Orgs & the Projects That Select the Most Students. <br/> Since 2020, 2,456 students have been selected. Discover where they go.
        </p>
      </div>

      <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 md:p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">The Big Picture</h2>
            <p className="text-muted-foreground mb-4">
              Six organizations hold 90% of all LFX Mentorship seats. CNCF alone selected 943 (38%). 
              The Linux Kernel program (560) and LF Decentralized Trust (270) follow closely.
            </p>
            <p className="text-muted-foreground">
              Unpaid cohorts (like Linux Kernel sessions) inflate some totals, but only 28–49% of those mentees graduate. 
              Paid CNCF, RISC-V and Open Mainframe projects graduate about 90%.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4 items-end h-40 border-b border-border px-4">
              <div className="w-16 bg-blue-500/80 rounded-t-md h-full flex items-end justify-center pb-2 text-xs font-bold text-white relative group">
                <span className="absolute -top-6 text-foreground hidden group-hover:block">CNCF</span>
                38%
              </div>
              <div className="w-16 bg-green-500/80 rounded-t-md h-[59%] flex items-end justify-center pb-2 text-xs font-bold text-white relative group">
                <span className="absolute -top-6 text-foreground hidden group-hover:block">Kernel</span>
                22%
              </div>
              <div className="w-16 bg-purple-500/80 rounded-t-md h-[28%] flex items-end justify-center pb-2 text-xs font-bold text-white relative group">
                <span className="absolute -top-6 text-foreground hidden group-hover:block">LFDT</span>
                11%
              </div>
              <div className="w-16 bg-muted-foreground/30 rounded-t-md h-[29%] flex items-end justify-center pb-2 text-xs font-bold relative group">
                <span className="absolute -top-6 text-foreground hidden group-hover:block">Others</span>
                29%
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-500" /> The Top Organizations
        </h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead className="text-right">Selected</TableHead>
                  <TableHead className="text-right">Graduated</TableHead>
                  <TableHead className="text-right">Grad Rate</TableHead>
                  <TableHead className="text-right">Apps/Seat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topOrgs.map((org) => (
                  <TableRow key={org.rank}>
                    <TableCell className="font-bold text-muted-foreground">{org.rank}</TableCell>
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell className="text-right font-mono">{org.selected}</TableCell>
                    <TableCell className="text-right font-mono">{org.graduated}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={parseInt(org.rate) > 80 ? "default" : "secondary"} className={parseInt(org.rate) > 80 ? "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30 border-0" : ""}>
                        {org.rate}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{org.appsPerSeat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        <p className="text-sm text-muted-foreground mt-3 flex gap-2 items-center">
          <Info className="w-4 h-4 shrink-0" />
          CNCF selects more students than the next two organizations combined. From #7 down (Cloudforet, LF Networking, etc.), no organization passes 40 selections.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold mb-6">CNCF's Top Projects</h3>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Selected</TableHead>
                  <TableHead className="text-right">Graduated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cncfProjects.map((p) => (
                  <TableRow key={p.rank}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-right font-mono">{p.selected}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">{p.graduated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <p className="text-sm text-muted-foreground mt-4">
            Meshery has selected the most CNCF mentees (79). Most CNCF listings take one mentee.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Linux Kernel (560 Selected)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Nine in ten selections come from the Linux Kernel Bug Fixing sessions, run three times a year and unpaid since late 2022. Applicants must first complete a beginner's guide course.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">LF Decentralized Trust (270 Selected)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Hyperledger Fabric and the Labs projects built on it lead, followed by identity and cross-chain interoperability.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">RISC-V & Open Mainframe</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              RISC-V posts projects each Spring, Summer and Fall (30 hrs/week). Open Mainframe's Zowe project selects the most. Both have extremely high graduation rates (~90%).
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <BookOpen className="text-accent" /> What this means for students
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="mt-1"><ShieldAlert className="w-6 h-6 text-blue-500" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">The Easiest Seats (Unpaid)</h4>
              <p className="text-muted-foreground">
                Magma Core and Linux Kernel sessions get under 10 applications per seat. 
                They suit students wanting experience over a stipend. However, fewer than half graduate.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-1"><Trophy className="w-6 h-6 text-yellow-500" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">The Hardest Seats (Paid)</h4>
              <p className="text-muted-foreground">
                Open Mainframe, RISC-V and CNCF draw 41–85 applications per seat. 
                They are highly competitive, but 9 in 10 selected mentees finish and graduate successfully.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-green-500" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">Maximizing Chances</h4>
              <p className="text-muted-foreground">
                CNCF runs three terms a year. Projects that list almost every term (Meshery, KubeEdge, Volcano) give you the most chances to apply and build rapport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
