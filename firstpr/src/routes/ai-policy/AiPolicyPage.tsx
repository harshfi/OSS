import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Zap, Terminal, FileText, AlertTriangle, MessageSquare, Search, ShieldCheck } from "lucide-react";

export default function AiPolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          AI Strategies for Open Source
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          The modern open source landscape moves incredibly fast. To stand out, you don't just need to write good code—you need to understand complex systems instantly, communicate flawlessly, and ship reliable features. Here is how you can ethically leverage AI to dominate open source and get your pull requests merged lightning fast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Strategy 1 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Search className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              Rapid Codebase Onboarding
            </CardTitle>
            <CardDescription className="text-base">Don't spend days reading undocumented code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Open source repositories can have hundreds of thousands of lines of code. Trying to read it sequentially is a trap. Instead, use tools like Cursor, GitHub Copilot, or Claude to map out the architecture dynamically. Ask it to trace the data flow from the UI down to the database.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "I am looking at `src/auth/oauth.ts`. Can you explain the exact lifecycle of how this handles token refreshing? Where are the tokens persisted, and what triggers the refresh mechanism?"
            </div>
          </CardContent>
        </Card>

        {/* Strategy 2 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileText className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              The Perfect PR Description
            </CardTitle>
            <CardDescription className="text-base">Maintainers merge PRs that are easy to review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Maintainers are busy and often review code in their free time. A PR with a title like "Fixed bug" and no description will be ignored. Feed your git diff to an AI to generate a highly structured, professional description that outlines the problem, the solution, and test steps.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "Based on this git diff, write a professional GitHub PR description. Include three sections: 'What this does', 'Why it is needed' (mention it fixes issue #402), and 'How to test'. Use markdown formatting."
            </div>
          </CardContent>
        </Card>

        {/* Strategy 3 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Terminal className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Terminal className="w-6 h-6 text-red-500" />
              </div>
              Deciphering CI/CD Failures
            </CardTitle>
            <CardDescription className="text-base">Fix failing tests faster than anyone else.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Nothing is more frustrating than a PR failing a GitHub Action check due to a cryptic error in a 5,000-line log file. Don't panic. Copy the error trace and let an LLM instantly identify the root cause and suggest the fix.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "My PR failed the 'Ubuntu Node 18' CI workflow. Here are the last 150 lines of the trace. What exactly failed, which file caused it, and how do I fix the broken dependency?"
            </div>
          </CardContent>
        </Card>

        {/* Strategy 4 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              Pre-Reviewing Your Own Code
            </CardTitle>
            <CardDescription className="text-base">Catch silly mistakes before maintainers do.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Before you even open the pull request, have AI act as a strict senior engineer. Ask it to review your diff for edge cases, memory leaks, performance bottlenecks, or deviations from standard design patterns.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "Act as a ruthless senior maintainer. Review this git diff. Look for any edge cases I missed, potential null pointer exceptions, or ways to make this code cleaner and more performant."
            </div>
          </CardContent>
        </Card>

        {/* Strategy 5 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle2 className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-purple-500" />
              </div>
              Generating Boilerplate Tests
            </CardTitle>
            <CardDescription className="text-base">Submit fully tested PRs without the drudgery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Code without tests rarely gets merged in major organizations. Use AI to scaffold the boilerplate for unit tests. It is excellent at generating standard test cases, allowing you to focus purely on adding complex boundary conditions.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "Write Jest unit tests for this utility function. Mock the external database call. Include standard success cases, null inputs, and extreme boundary conditions."
            </div>
          </CardContent>
        </Card>

        {/* Strategy 6 */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <MessageSquare className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-pink-500" />
              </div>
              Professional Communication
            </CardTitle>
            <CardDescription className="text-base">Navigate complex community discussions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              If English isn't your first language, or if you are dealing with a terse, critical maintainer, tensions can run high. Use AI to refine your responses so they are polite, objective, and strictly focused on the technical merits.
            </p>
            <div className="bg-card/50 border rounded-lg p-4 font-mono text-sm text-muted-foreground shadow-inner">
              <span className="text-primary font-semibold">Prompt:</span> "A maintainer left a harsh review saying my approach is completely wrong. Here is their comment and here is why I chose this approach. Write a polite, de-escalating response that explains my reasoning but stays open to their suggestion."
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Golden Rule */}
      <Card className="bg-destructive/10 border-destructive shadow-lg mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-destructive"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-destructive">
            <AlertTriangle className="w-8 h-8" /> The Golden Rule of AI in OSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-semibold border-b border-destructive/20 pb-4">
            Never submit code you do not completely understand.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> What Maintainers Hate</h3>
              <p className="text-muted-foreground">
                Maintainers despise "drive-by" contributors who use AI to generate 500 lines of spaghetti code and throw it over the wall. AI often hallucinates fake library methods or introduces subtle race conditions. If a maintainer asks why you chose a specific implementation and your answer is "ChatGPT wrote it," your PR will be closed immediately.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> What Maintainers Love</h3>
              <p className="text-muted-foreground">
                You are legally and technically responsible for the code in your PR. Use AI as your senior pair-programmer—ask it questions, let it explain concepts, and use it to format your thoughts. But when it comes to the final implementation, you must be able to defend every single line of code you wrote.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// Note to bypass import issues, manually recreating XCircle icon import locally.
const XCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
