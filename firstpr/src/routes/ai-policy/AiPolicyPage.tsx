import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Zap, Terminal, GitMerge, FileText, AlertTriangle } from "lucide-react";

export default function AiPolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">AI Strategies for OSS</h1>
        <p className="text-muted-foreground text-lg mb-6">
          How to ethically leverage AI to understand massive codebases, stand out to maintainers, and get your pull requests merged lightning fast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Terminal className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Rapid Codebase Onboarding
            </CardTitle>
            <CardDescription>Don't spend days reading undocumented code.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Use Cursor, Copilot, or ChatGPT to explain complex architectural patterns. Instead of blindly reading, ask the AI targeted questions.
            </p>
            <div className="bg-card border rounded-md p-3 font-mono text-xs text-muted-foreground">
              "I am looking at src/auth/oauth.ts. Can you explain how this handles token refreshing and where the tokens are persisted in this React app?"
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <FileText className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              The Perfect PR Description
            </CardTitle>
            <CardDescription>Maintainers merge PRs that are easy to review.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Maintainers are busy. Use AI to draft a crystal-clear PR description that outlines the problem, the solution, and exactly how to test it.
            </p>
            <div className="bg-card border rounded-md p-3 font-mono text-xs text-muted-foreground">
              "Based on this git diff, write a professional GitHub PR description with sections for 'What this does', 'Why it is needed', and 'How to test'."
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Terminal className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-red-500" />
              Deciphering CI/CD Failures
            </CardTitle>
            <CardDescription>Fix failing tests faster than anyone else.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              GitHub Actions failed? Don't panic. Copy the cryptic 50-line error trace and paste it into an LLM to instantly identify the root cause.
            </p>
            <div className="bg-card border rounded-md p-3 font-mono text-xs text-muted-foreground">
              "My PR failed the 'Ubuntu Node 18' CI workflow. Here are the last 50 lines of the trace. What exactly failed and how do I fix the broken dependency?"
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <GitMerge className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Generating Boilerplate Tests
            </CardTitle>
            <CardDescription>Submit fully tested PRs without the drudgery.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Code without tests rarely gets merged. Use AI to scaffold unit tests for your new functions. Review them, add edge cases, and ship.
            </p>
            <div className="bg-card border rounded-md p-3 font-mono text-xs text-muted-foreground">
              "Write Jest unit tests for this utility function. Include standard cases, null inputs, and boundary conditions."
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-destructive/10 border-destructive/20 mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" /> The Golden Rule of AI in OSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Never submit code you don't completely understand.</strong>
          </p>
          <p>
            Maintainers despise "drive-by" contributors who use AI to generate 500 lines of spaghetti code and throw it over the wall. You are legally and technically responsible for the code in your PR. If a maintainer asks why you chose a specific implementation and your answer is "ChatGPT wrote it", your PR will be closed and your reputation will take a hit.
          </p>
          <p>
            Use AI as your senior pair-programmer, not as an autonomous code generator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
