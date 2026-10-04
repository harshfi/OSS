export type RepoState = {
  cwd: string;
  remotes: Record<string, string>;
  branches: Record<string, string[]>; // branchName -> array of commitIds
  head: string; // current branch name or commit id
  staged: string[]; // files staged
  modified: string[]; // files modified
  files: Record<string, string>; // filename -> content
  commits: Record<string, { msg: string; parent?: string }>;
  config: { name?: string; email?: string };
  pushed?: string; // branch that was pushed
};

export type CommandTokenBreakdown = {
  token: string;
  meaning: string;
  isFlag?: boolean;
};

export type ScenarioStep = {
  id: string;
  label: string;
  taskTitle: string;
  instruction: string;
  whyDoThis: string;
  commandMeaning: string;
  breakdown: CommandTokenBreakdown[];
  check: (state: RepoState) => boolean;
  hint: string;
  exampleCommand: string;
};

export type CommandPrerequisite = {
  cmd: string;
  reason: string;
};

export type SequenceInfo = {
  isOutOfSequence: boolean;
  currentStageName: string;
  commandStageName: string;
  stageNumber: number;
  explanation: string;
  prerequisites: CommandPrerequisite[];
};

export type CommandAnalysis = {
  rawCommand: string;
  commandName: string;
  syntaxValid: boolean;
  status: "correct" | "incorrect" | "neutral" | "out-of-sequence";
  badgeText: string;
  summary: string;
  commandMeaning: string;
  breakdown?: CommandTokenBreakdown[];
  details: string[];
  gitConcept: string;
  feedback: string;
  suggestion?: string;
  correctedCommand?: string;
  correctionReason?: string;
  scenarioTargetCommand?: string;
  sequenceInfo?: SequenceInfo;
};

export type HandlerResult = {
  out: string[];
  state: RepoState;
  error?: string;
  analysis?: CommandAnalysis;
};

export type Scenario = {
  id: number;
  title: string;
  stageName: string;
  description: string;
  initialState: RepoState;
  steps: ScenarioStep[];
  checkGoal: (state: RepoState) => boolean;
  hints: string[];
  explanation: string;
  knownErrors?: Record<string, string>;
};

// Creates an initial empty state
export function createEmptyState(): RepoState {
  return {
    cwd: "/home/user",
    remotes: {},
    branches: { main: [] },
    head: "main",
    staged: [],
    modified: [],
    files: {},
    commits: {},
    config: {},
  };
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Configure Git identity",
    stageName: "Stage 1: Identity & Environment Setup",
    description: "Before you can make your first commit in open source, Git needs to know your name and email to sign your work.",
    explanation: "Git embeds your name and email into every commit you create. Open source maintainers use this to identify contributors and attribute copyright.",
    initialState: createEmptyState(),
    steps: [
      {
        id: "name",
        label: "Configure your global user.name",
        taskTitle: "Task 1: Set Your Git Author Name",
        instruction: "Set your global author name so Git attributes all commits to your developer identity.",
        whyDoThis: "Every Git commit stamps the author's name in its metadata so maintainers know who wrote the code.",
        commandMeaning: "Saves your developer author name globally across your machine so all Git commits are signed with your name.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "config", meaning: "Command to inspect and set Git configuration variables" },
          { token: "--global", meaning: "Flag to write setting into ~/.gitconfig for all repos on your computer", isFlag: true },
          { token: "user.name", meaning: "Configuration key that stores your public author display name" },
          { token: '"Alex Dev"', meaning: "Your actual author name that will be stamped on every commit" },
        ],
        check: (s) => Boolean(s.config.name && s.config.name.trim().length > 0),
        hint: "Run git config --global user.name \"Your Full Name\"",
        exampleCommand: 'git config --global user.name "Alex Dev"',
      },
      {
        id: "email",
        label: "Configure your global user.email",
        taskTitle: "Task 2: Set Your Git Author Email",
        instruction: "Set your verified email address matching your GitHub profile.",
        whyDoThis: "GitHub uses this email to link your commits to your GitHub profile and award green contribution squares.",
        commandMeaning: "Configures the email address embedded in your commits so GitHub matches them to your account.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "config", meaning: "Command to inspect and set Git configuration variables" },
          { token: "--global", meaning: "Flag to apply setting machine-wide across all repositories", isFlag: true },
          { token: "user.email", meaning: "Configuration key that stores your author email address" },
          { token: '"alex@example.com"', meaning: "Your verified GitHub email address" },
        ],
        check: (s) => Boolean(s.config.email && s.config.email.includes("@")),
        hint: "Run git config --global user.email \"your.email@example.com\"",
        exampleCommand: 'git config --global user.email "alex@example.com"',
      },
    ],
    checkGoal: (s) => Boolean(s.config.name && s.config.email && s.config.email.includes("@")),
    hints: [
      "Use 'git config --global user.name \"Your Name\"'",
      "Use 'git config --global user.email \"email@example.com\"'",
      "You can verify your config anytime using 'git config --list'",
    ],
  },
  {
    id: 2,
    title: "Clone Fork & Configure Upstream",
    stageName: "Stage 2: Forking, Cloning & Remote Setup",
    description: "You've clicked 'Fork' on GitHub. Now clone your personal fork and configure the original project repository as 'upstream'.",
    explanation: "Having two remotes is standard for open source: 'origin' points to your GitHub fork (where you push), and 'upstream' points to the official repository (where you fetch updates).",
    initialState: {
      ...createEmptyState(),
      config: { name: "Alex Contributor", email: "alex@example.com" },
    },
    steps: [
      {
        id: "clone",
        label: "Clone your GitHub fork",
        taskTitle: "Task 1: Clone Your GitHub Fork",
        instruction: "Download a full local copy of your GitHub fork to your workspace.",
        whyDoThis: "Cloning sets up a local repository folder and automatically defines 'origin' pointing to your fork.",
        commandMeaning: "Downloads a full copy of your remote GitHub fork including commit history and initializes a local project repository.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "clone", meaning: "Copies a remote repository and creates a local working directory" },
          { token: "https://github.com/alex/first-contributions.git", meaning: "Remote URL of your personal GitHub fork (sets as 'origin')" },
        ],
        check: (s) => Boolean(s.remotes["origin"]),
        hint: "Run git clone https://github.com/your-username/repo.git",
        exampleCommand: "git clone https://github.com/alex/first-contributions.git",
      },
      {
        id: "cd",
        label: "Navigate into the repository directory (cd repo)",
        taskTitle: "Task 2: Enter the Cloned Directory",
        instruction: "Change directory into the cloned project folder (/home/user/repo).",
        whyDoThis: "Git commands only function when your terminal is inside the folder containing the .git metadata.",
        commandMeaning: "Navigates your terminal shell into the cloned repository directory so Git commands can access .git.",
        breakdown: [
          { token: "cd", meaning: "Change Directory — shell navigation command" },
          { token: "repo", meaning: "Target folder name containing the cloned code and .git directory" },
        ],
        check: (s) => s.cwd === "/home/user/repo",
        hint: "Run 'cd repo' to enter the cloned project folder",
        exampleCommand: "cd repo",
      },
      {
        id: "upstream",
        label: "Add the maintainer repo as 'upstream' remote",
        taskTitle: "Task 3: Connect Upstream Maintainer Remote",
        instruction: "Register the official maintainer repository as your 'upstream' remote.",
        whyDoThis: "Allows you to fetch official project updates and keep your local fork in sync with maintainers.",
        commandMeaning: "Adds a secondary remote connection named 'upstream' pointing to the original parent project repository.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "remote", meaning: "Command to manage tracked remote repository servers" },
          { token: "add", meaning: "Registers a new remote server alias" },
          { token: "upstream", meaning: "Standard alias name representing the official maintainer repository" },
          { token: "https://github.com/maintainer/first-contributions.git", meaning: "Original owner/organization repository URL" },
        ],
        check: (s) => Boolean(s.remotes["upstream"]),
        hint: "Run git remote add upstream https://github.com/original-owner/repo.git",
        exampleCommand: "git remote add upstream https://github.com/maintainer/first-contributions.git",
      },
    ],
    checkGoal: (s) =>
      s.cwd === "/home/user/repo" &&
      Boolean(s.remotes["origin"]) &&
      Boolean(s.remotes["upstream"]),
    hints: [
      "Step 1: Clone your fork: 'git clone https://github.com/alex/first-contributions.git'",
      "Step 2: Enter the directory: 'cd repo'",
      "Step 3: Connect upstream: 'git remote add upstream https://github.com/maintainer/first-contributions.git'",
    ],
  },
  {
    id: 3,
    title: "Create Branch, Edit, Stage (git add), and Commit (git commit)",
    stageName: "Stage 3: Branching, Editing, git add & git commit",
    description: "Never make changes directly on 'main'. Create a feature branch, edit a file, stage it with 'git add', and commit it with 'git commit'.",
    explanation: "Git's 3-tree architecture requires staging with 'git add' first before creating a snapshot with 'git commit'. Branch isolation keeps your pull request clean.",
    initialState: {
      ...createEmptyState(),
      cwd: "/home/user/repo",
      config: { name: "Alex Contributor", email: "alex@example.com" },
      commits: { c1: { msg: "Initial project scaffold" } },
      branches: { main: ["c1"] },
      head: "main",
      remotes: {
        origin: "https://github.com/alex/repo.git",
        upstream: "https://github.com/maintainer/repo.git",
      },
    },
    steps: [
      {
        id: "branch",
        label: "Create and switch to a feature branch",
        taskTitle: "Task 1: Create an Isolated Feature Branch",
        instruction: "Create a new branch with 'git checkout -b <name>' to isolate your work from main.",
        whyDoThis: "Open Source Rule #1: Never commit on main. Branch isolation ensures each PR only contains changes for that specific feature.",
        commandMeaning: "Creates a brand-new branch isolated from main and switches your active HEAD pointer to it.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "checkout", meaning: "Switches branches or restores working tree files" },
          { token: "-b", meaning: "Flag telling Git to create the branch first before checking it out", isFlag: true },
          { token: "feature-greet", meaning: "The name of your new feature branch" },
        ],
        check: (s) => s.head !== "main" && Boolean(s.branches[s.head]),
        hint: "Run git checkout -b feature-greet (or git switch -c feature-greet)",
        exampleCommand: "git checkout -b feature-greet",
      },
      {
        id: "edit",
        label: "Create or modify a project file",
        taskTitle: "Task 2: Write Code / Edit File",
        instruction: "Create or modify a file (e.g. hello.txt) in your working directory.",
        whyDoThis: "Simulates making a real bug fix or feature code edit in your local working directory.",
        commandMeaning: "Writes text content into a file in your working directory (creating it if it does not yet exist).",
        breakdown: [
          { token: "echo", meaning: "Shell command to print or output text" },
          { token: '"Hello Open Source"', meaning: "The text content string to write" },
          { token: ">>", meaning: "Append redirection operator (adds text to the end of the file)" },
          { token: "hello.txt", meaning: "Target filename in your working tree" },
        ],
        check: (s) =>
          s.modified.includes("hello.txt") ||
          s.staged.includes("hello.txt") ||
          (s.branches[s.head]?.length ?? 0) > 1,
        hint: "Run echo \"Hello Open Source\" >> hello.txt",
        exampleCommand: 'echo "Hello Open Source" >> hello.txt',
      },
      {
        id: "stage",
        label: "Stage modified file (git add hello.txt)",
        taskTitle: "Task 3: Stage Changes with 'git add'",
        instruction: "Move your modified files into the Git Staging Area (Index) using 'git add'.",
        whyDoThis: "In Git, you MUST run 'git add' FIRST to curate exactly which files are included before saving a commit.",
        commandMeaning: "Moves modified files from the Working Tree into the Staging Area (Index) to be packaged into the next commit.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "add", meaning: "Stages changes from working directory into the staging index" },
          { token: "hello.txt", meaning: "Target file to stage (use '.' to stage all modified files)" },
        ],
        check: (s) =>
          s.staged.includes("hello.txt") ||
          (s.branches[s.head]?.length ?? 0) > 1,
        hint: "Run git add hello.txt (or git add .)",
        exampleCommand: "git add hello.txt",
      },
      {
        id: "commit",
        label: "Commit staged snapshot (git commit -m '...')",
        taskTitle: "Task 4: Save Snapshot with 'git commit'",
        instruction: "Save a permanent snapshot of all staged files with a clear conventional commit message.",
        whyDoThis: "Creates a permanent commit hash in your branch history. Commits exist locally on your machine until you push.",
        commandMeaning: "Records all currently staged files as a permanent snapshot in your local Git repository history.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "commit", meaning: "Packages staged changes into a new commit object with a unique SHA hash" },
          { token: "-m", meaning: "Message flag to provide commit description inline without opening an editor", isFlag: true },
          { token: '"feat: add greeting message"', meaning: "Human-readable commit description following Conventional Commits" },
        ],
        check: (s) => (s.branches[s.head]?.length ?? 0) > 1,
        hint: "Run git commit -m \"feat: add greeting file\"",
        exampleCommand: 'git commit -m "feat: add greeting message"',
      },
    ],
    checkGoal: (s) => s.head !== "main" && (s.branches[s.head]?.length ?? 0) >= 2,
    hints: [
      "1. Create branch: 'git checkout -b feature-greet'",
      "2. Create file: 'echo \"Hello\" >> hello.txt'",
      "3. Stage changes: 'git add hello.txt' (Do git add first!)",
      "4. Commit snapshot: 'git commit -m \"feat: add greeting\"'",
    ],
  },
  {
    id: 4,
    title: "Push Branch to GitHub Fork",
    stageName: "Stage 4: Publishing & Remote Pull Request",
    description: "Your commit is saved on your local machine. Now push your branch up to your GitHub fork (origin) so you can open a Pull Request.",
    explanation: "Git commits exist only locally until pushed. Pushing to origin creates the branch on GitHub, which triggers the 'Compare & Pull Request' prompt.",
    initialState: {
      ...createEmptyState(),
      cwd: "/home/user/repo",
      config: { name: "Alex Contributor", email: "alex@example.com" },
      commits: {
        c1: { msg: "Initial project scaffold" },
        c2: { msg: "feat: add user greeting", parent: "c1" },
      },
      branches: { main: ["c1"], "feature-greet": ["c1", "c2"] },
      head: "feature-greet",
      remotes: {
        origin: "https://github.com/alex/repo.git",
        upstream: "https://github.com/maintainer/repo.git",
      },
    },
    steps: [
      {
        id: "push",
        label: "Push feature branch to origin remote",
        taskTitle: "Task 1: Push Branch to GitHub Remote Fork",
        instruction: "Upload your local branch commits to your remote fork (origin) on GitHub.",
        whyDoThis: "Publishes your branch to github.com so you can open a Pull Request for the maintainers to review.",
        commandMeaning: "Transfers your local branch commits over network to your remote personal fork on GitHub.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "push", meaning: "Uploads local branch commits and objects to a remote repository" },
          { token: "origin", meaning: "Target remote server alias (your personal GitHub fork)" },
          { token: "feature-greet", meaning: "The branch name to create or update on GitHub" },
        ],
        check: (s) => s.pushed === "feature-greet",
        hint: "Run git push origin feature-greet (or git push -u origin feature-greet)",
        exampleCommand: "git push origin feature-greet",
      },
    ],
    checkGoal: (s) => s.pushed === "feature-greet",
    hints: [
      "Push your current branch to your remote fork: 'git push origin feature-greet'",
      "Check remotes first if unsure: 'git remote -v'",
    ],
  },
  {
    id: 5,
    title: "Sync Upstream Changes with Rebase",
    stageName: "Stage 5: Keeping in Sync & Rebasing",
    description: "While you were working, maintainers merged new PRs into the main repo. Fetch upstream and rebase your branch on top of upstream/main.",
    explanation: "Rebasing replays your commits cleanly on top of the latest upstream code, keeping the project Git history linear and conflict-free.",
    initialState: {
      ...createEmptyState(),
      cwd: "/home/user/repo",
      config: { name: "Alex Contributor", email: "alex@example.com" },
      commits: {
        c1: { msg: "Scaffold" },
        c2: { msg: "Maintainer upstream fix", parent: "c1" },
        c3: { msg: "My local feature work", parent: "c1" },
      },
      branches: { main: ["c1", "c2"], "feature-work": ["c1", "c3"] },
      head: "feature-work",
      remotes: {
        origin: "https://github.com/alex/repo.git",
        upstream: "https://github.com/maintainer/repo.git",
      },
    },
    steps: [
      {
        id: "fetch",
        label: "Fetch latest changes from upstream remote",
        taskTitle: "Task 1: Fetch Upstream Commits",
        instruction: "Download latest commits from the official maintainer repo into local cache.",
        whyDoThis: "Fetches official upstream changes safely without modifying your active working files.",
        commandMeaning: "Downloads new commits and branches from the official upstream repository into local Git cache without touching your working files.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "fetch", meaning: "Safely downloads remote commits into local cache without merging" },
          { token: "upstream", meaning: "Remote server alias for the official maintainer repository" },
        ],
        check: (s) => Boolean((s as any).fetchedUpstream),
        hint: "Run git fetch upstream",
        exampleCommand: "git fetch upstream",
      },
      {
        id: "rebase",
        label: "Rebase your feature branch on upstream/main",
        taskTitle: "Task 2: Rebase Branch on Top of Upstream",
        instruction: "Reapply your feature commits on top of the latest upstream/main branch.",
        whyDoThis: "Eliminates merge conflicts and maintains a clean, linear commit history required by OSS maintainers.",
        commandMeaning: "Replays your branch's commits on top of the newest upstream/main branch commits to produce a clean linear commit history.",
        breakdown: [
          { token: "git", meaning: "Git distributed version control CLI" },
          { token: "rebase", meaning: "Reapplies local commits one by one on top of another base branch" },
          { token: "upstream/main", meaning: "Target maintainer branch containing the latest merged changes" },
        ],
        check: (s) => Boolean((s as any).rebased),
        hint: "Run git rebase upstream/main (or git rebase main)",
        exampleCommand: "git rebase upstream/main",
      },
    ],
    checkGoal: (s) => Boolean((s as any).rebased),
    hints: [
      "Step 1: Download new commits without merging: 'git fetch upstream'",
      "Step 2: Reapply your commits on top: 'git rebase upstream/main'",
    ],
  },
];

/**
 * Returns stage metadata and lifecycle position of a Git command
 */
export function getCommandStageInfo(root: string, sub?: string): { stageNumber: number; stageName: string } {
  if (root === "git") {
    if (sub === "config") return { stageNumber: 1, stageName: "Stage 1: Identity & Setup" };
    if (sub === "clone" || sub === "remote") return { stageNumber: 2, stageName: "Stage 2: Fork & Remotes" };
    if (sub === "checkout" || sub === "switch" || sub === "branch" || sub === "add" || sub === "commit") {
      return { stageNumber: 3, stageName: "Stage 3: Branching & Local Commits" };
    }
    if (sub === "push") return { stageNumber: 4, stageName: "Stage 4: Publishing & Remote PR" };
    if (sub === "fetch" || sub === "rebase" || sub === "pull") {
      return { stageNumber: 5, stageName: "Stage 5: Upstream Sync & Rebase" };
    }
  }
  if (root === "cd" || root === "mkdir") return { stageNumber: 2, stageName: "Stage 2: Project Navigation" };
  if (root === "echo" || root === "touch") return { stageNumber: 3, stageName: "Stage 3: File Editing" };
  return { stageNumber: 0, stageName: "General / Inspection" };
}

/**
 * Parses any Git / Shell command string into structured tokens and their individual meanings
 */
export function parseCommandTokens(cmdStr: string): CommandTokenBreakdown[] {
  const trimmed = cmdStr.trim();
  const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || trimmed.split(/\s+/);
  const root = parts[0]?.toLowerCase();
  const sub = parts[1]?.toLowerCase();
  const tokens: CommandTokenBreakdown[] = [];

  // Git commands
  if (root === "git") {
    tokens.push({ token: "git", meaning: "Git distributed version control CLI program" });

    if (sub === "config") {
      tokens.push({ token: "config", meaning: "Command to query and set Git configuration variables" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "--global") {
          tokens.push({ token: "--global", meaning: "Applies setting globally in ~/.gitconfig for all repos", isFlag: true });
        } else if (p === "--local") {
          tokens.push({ token: "--local", meaning: "Applies setting only in current repository's .git/config", isFlag: true });
        } else if (p === "--list" || p === "-l") {
          tokens.push({ token: p, meaning: "Lists all active configuration variables and values", isFlag: true });
        } else if (p === "user.name") {
          tokens.push({ token: "user.name", meaning: "Configuration key for commit author name" });
        } else if (p === "user.email") {
          tokens.push({ token: "user.email", meaning: "Configuration key for commit author email (matching GitHub)" });
        } else {
          tokens.push({ token: p, meaning: "Value assigned to configuration parameter" });
        }
      }
    } else if (sub === "clone") {
      tokens.push({ token: "clone", meaning: "Downloads remote repository and its full history to disk" });
      if (parts[2]) {
        tokens.push({ token: parts[2], meaning: "Remote repository URL to clone (sets as 'origin' remote)" });
      }
    } else if (sub === "remote") {
      tokens.push({ token: "remote", meaning: "Manages set of tracked remote repository servers" });
      if (parts[2] === "add") {
        tokens.push({ token: "add", meaning: "Registers a new remote server connection alias" });
        if (parts[3]) {
          tokens.push({ token: parts[3], meaning: parts[3] === "upstream" ? "Conventional alias for original maintainer repository" : "Remote server shortcut name" });
        }
        if (parts[4]) {
          tokens.push({ token: parts[4], meaning: "Official repository URL to track" });
        }
      } else if (parts[2] === "-v" || parts[2] === "--verbose") {
        tokens.push({ token: parts[2], meaning: "Verbose flag to display fetch and push URLs", isFlag: true });
      }
    } else if (sub === "checkout" || sub === "switch") {
      tokens.push({ token: sub, meaning: "Switches branches or restores working tree files" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "-b" || p === "-c") {
          tokens.push({ token: p, meaning: "Flag telling Git to create a new branch before switching to it", isFlag: true });
        } else {
          tokens.push({ token: p, meaning: `Target feature branch name: '${p}'` });
        }
      }
    } else if (sub === "add") {
      tokens.push({ token: "add", meaning: "Moves modified files from working directory into the Staging Index" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "." || p === "-A" || p === "--all") {
          tokens.push({ token: p, meaning: "Wildcard staging ALL new, modified, and deleted files", isFlag: true });
        } else {
          tokens.push({ token: p, meaning: `Specific file to stage: '${p}'` });
        }
      }
    } else if (sub === "commit") {
      tokens.push({ token: "commit", meaning: "Records currently staged changes into local repository history" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "-m") {
          tokens.push({ token: "-m", meaning: "Message flag to provide commit description inline", isFlag: true });
        } else if (p === "--amend") {
          tokens.push({ token: "--amend", meaning: "Amend / overwrite previous commit snapshot", isFlag: true });
        } else {
          tokens.push({ token: p, meaning: "Human-readable commit description following Conventional Commits" });
        }
      }
    } else if (sub === "push") {
      tokens.push({ token: "push", meaning: "Uploads local branch commits and references to a remote server" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "-u" || p === "--set-upstream") {
          tokens.push({ token: p, meaning: "Set tracking reference for future git push/pull", isFlag: true });
        } else if (i === 2 || (i === 3 && (parts[2] === "-u" || parts[2] === "--set-upstream"))) {
          tokens.push({ token: p, meaning: "Target remote server alias ('origin' = personal fork)" });
        } else {
          tokens.push({ token: p, meaning: `Branch name to publish on GitHub: '${p}'` });
        }
      }
    } else if (sub === "fetch") {
      tokens.push({ token: "fetch", meaning: "Downloads commits from remote into local cache without modifying files" });
      if (parts[2]) {
        tokens.push({ token: parts[2], meaning: "Remote server alias to fetch from (e.g. 'upstream')" });
      }
    } else if (sub === "rebase") {
      tokens.push({ token: "rebase", meaning: "Reapplies local branch commits on top of another base branch" });
      if (parts[2]) {
        tokens.push({ token: parts[2], meaning: "Target maintainer branch containing latest merged code" });
      }
    } else if (sub === "status") {
      tokens.push({ token: "status", meaning: "Inspects status of working tree, modified files, and staging area" });
    } else if (sub === "log") {
      tokens.push({ token: "log", meaning: "Displays chronological list of commits and author history" });
      if (parts[2] === "--oneline") {
        tokens.push({ token: "--oneline", meaning: "Condenses each commit to a single line with short SHA", isFlag: true });
      }
    } else if (sub === "diff") {
      tokens.push({ token: "diff", meaning: "Displays line-by-line file changes and differences" });
      if (parts[2] === "--staged" || parts[2] === "--cached") {
        tokens.push({ token: parts[2], meaning: "Shows differences in staging area waiting to be committed", isFlag: true });
      }
    } else if (sub === "branch") {
      tokens.push({ token: "branch", meaning: "Lists, creates, or deletes local branches" });
      for (let i = 2; i < parts.length; i++) {
        const p = parts[i];
        if (p === "-d" || p === "-D") {
          tokens.push({ token: p, meaning: "Delete local branch", isFlag: true });
        } else if (p === "-a") {
          tokens.push({ token: "-a", meaning: "List all local and remote tracking branches", isFlag: true });
        } else {
          tokens.push({ token: p, meaning: `Branch name: '${p}'` });
        }
      }
    } else if (sub) {
      tokens.push({ token: sub, meaning: `Git subcommand: '${sub}'` });
      for (let i = 2; i < parts.length; i++) {
        tokens.push({ token: parts[i], meaning: `Parameter / Flag: '${parts[i]}'` });
      }
    }
  } else if (root === "cd") {
    tokens.push({ token: "cd", meaning: "Change Directory — shell navigation command" });
    if (parts[1]) {
      tokens.push({ token: parts[1], meaning: `Target directory path to enter: '${parts[1]}'` });
    }
  } else if (root === "echo") {
    tokens.push({ token: "echo", meaning: "Prints text string to standard output" });
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i];
      if (p === ">>") {
        tokens.push({ token: ">>", meaning: "Append operator: creates or appends text to the end of a file" });
      } else if (p === ">") {
        tokens.push({ token: ">", meaning: "Overwrite operator: writes text and replaces file content" });
      } else if (i === parts.length - 1 && (parts[i - 1] === ">>" || parts[i - 1] === ">")) {
        tokens.push({ token: p, meaning: `Destination file name: '${p}'` });
      } else {
        tokens.push({ token: p, meaning: "Text content to write" });
      }
    }
  } else if (root === "touch") {
    tokens.push({ token: "touch", meaning: "Creates a new empty file in current folder" });
    if (parts[1]) {
      tokens.push({ token: parts[1], meaning: `Target file name to create: '${parts[1]}'` });
    }
  } else if (root === "ls") {
    tokens.push({ token: "ls", meaning: "Lists directory contents and files" });
    if (parts[1] === "-la" || parts[1] === "-a") {
      tokens.push({ token: parts[1], meaning: "Show all files including hidden dotfiles like .git", isFlag: true });
    }
  } else if (root === "pwd") {
    tokens.push({ token: "pwd", meaning: "Print Working Directory (shows full active folder path)" });
  } else if (root === "clear") {
    tokens.push({ token: "clear", meaning: "Clears previous terminal output text" });
  } else if (root === "cat") {
    tokens.push({ token: "cat", meaning: "Concatenate and print file contents to terminal" });
    if (parts[1]) {
      tokens.push({ token: parts[1], meaning: `Target file to read: '${parts[1]}'` });
    }
  } else if (root) {
    tokens.push({ token: root, meaning: `Shell command: '${root}'` });
    for (let i = 1; i < parts.length; i++) {
      tokens.push({ token: parts[i], meaning: `Argument: '${parts[i]}'` });
    }
  }

  return tokens;
}

/**
 * Returns a beginner-friendly explanation, meaning, and technical breakdown of any Git / Bash command
 */
export function explainGitCommand(cmdStr: string): {
  commandName: string;
  summary: string;
  commandMeaning: string;
  breakdown: CommandTokenBreakdown[];
  details: string[];
  gitConcept: string;
} {
  const trimmed = cmdStr.trim();
  const parts = trimmed.split(/\s+/);
  const root = parts[0]?.toLowerCase();
  const sub = parts[1]?.toLowerCase();
  const sub2 = parts[2]?.toLowerCase();
  const breakdown = parseCommandTokens(cmdStr);

  // Git Config
  if (root === "git" && sub === "config") {
    const isGlobal = trimmed.includes("--global");
    const isName = trimmed.includes("user.name");
    const isEmail = trimmed.includes("user.email");
    const isList = trimmed.includes("--list") || trimmed.includes("-l");

    if (isList) {
      return {
        commandName: "git config --list",
        summary: "Displays all active Git configuration settings and user credentials on this system.",
        commandMeaning: "Inspects your global and local Git configuration file settings without modifying anything.",
        breakdown,
        details: [
          "`--list`: Prints all configured keys (user name, email, editor, alias shortcuts).",
        ],
        gitConcept: "Identity & Environment Configuration",
      };
    }

    if (isName) {
      return {
        commandName: "git config user.name",
        summary: "Sets the author name that will be stamped on all Git commits you create.",
        commandMeaning: "Configures the author display name stamped onto every commit metadata in open source.",
        breakdown,
        details: [
          isGlobal ? "`--global`: Saves this name globally across all Git repositories on your computer." : "`user.name`: Configures local repository name.",
          "Maintainers and GitHub use this name to attribute code authoring and display your profile.",
        ],
        gitConcept: "Identity & Attribution",
      };
    }

    if (isEmail) {
      return {
        commandName: "git config user.email",
        summary: "Sets the email address that links your Git commits to your GitHub account profile.",
        commandMeaning: "Configures your commit email so GitHub attributes contributions to your profile.",
        breakdown,
        details: [
          isGlobal ? "`--global`: Saves this email globally on your system." : "`user.email`: Sets local repo email.",
          "Must match an email verified on your GitHub account so commit badges show your avatar.",
        ],
        gitConcept: "Identity & Attribution",
      };
    }

    return {
      commandName: "git config",
      summary: "Customizes settings, author credentials, or aliases for Git repositories.",
      commandMeaning: "Configures Git settings in ~/.gitconfig or .git/config.",
      breakdown,
      details: ["Configures Git behavior, diff tools, aliases, or credentials."],
      gitConcept: "Configuration",
    };
  }

  // Git Clone
  if (root === "git" && sub === "clone") {
    return {
      commandName: "git clone",
      summary: "Downloads a full copy of a remote GitHub repository and creates a local working directory.",
      commandMeaning: "Copies an entire remote Git repository, branches, and commit history to your local disk.",
      breakdown,
      details: [
        "`<url>`: Remote Git repository address (HTTPS or SSH).",
        "Automatically sets up a remote named `origin` pointing back to the cloned repository.",
        "Initializes the `.git` metadata folder containing full history.",
      ],
      gitConcept: "Repository Cloning & Remote Tracking",
    };
  }

  // Git Remote
  if (root === "git" && sub === "remote") {
    if (sub2 === "add") {
      const remoteName = parts[3] || "remote_name";
      return {
        commandName: `git remote add ${remoteName}`,
        summary: `Registers a new remote server alias (${remoteName}) connected to a repository URL.`,
        commandMeaning: `Connects your local repository to a remote server under the shortcut alias '${remoteName}'.`,
        breakdown,
        details: [
          `\`${remoteName}\`: The shortcut name (conventionally 'upstream' for maintainer repo, 'origin' for your fork).`,
          "`<url>`: The GitHub HTTPS/SSH repository URL.",
          "Allows fetching updates and pushing code without typing full URLs.",
        ],
        gitConcept: "Fork & Remote Configuration",
      };
    }
    if (sub2 === "-v" || sub2 === "--verbose") {
      return {
        commandName: "git remote -v",
        summary: "Lists all connected remote aliases along with their fetch and push URLs.",
        commandMeaning: "Shows the URLs mapped to 'origin' (your fork) and 'upstream' (maintainer repo).",
        breakdown,
        details: [
          "`-v` (verbose): Displays URL endpoints alongside each remote name.",
          "Helps verify if 'origin' and 'upstream' are mapped correctly.",
        ],
        gitConcept: "Remote Inspection",
      };
    }
    return {
      commandName: "git remote",
      summary: "Manages connections to remote repository servers (GitHub/GitLab).",
      commandMeaning: "Manages tracked remote repository servers.",
      breakdown,
      details: ["Lists or modifies remote server connections."],
      gitConcept: "Remote Management",
    };
  }

  // Git Checkout / Switch
  if (root === "git" && (sub === "checkout" || sub === "switch")) {
    const isNewBranch = trimmed.includes("-b") || trimmed.includes("-c");
    const target = parts[parts.length - 1];

    if (isNewBranch) {
      return {
        commandName: `git ${sub} -b ${target}`,
        summary: `Creates a new branch named '${target}' and immediately switches your workspace to it.`,
        commandMeaning: `Creates an isolated feature branch '${target}' so your changes stay separate from main.`,
        breakdown,
        details: [
          "`-b` / `-c`: Flag telling Git to create the branch first before switching.",
          `\`${target}\`: Name of the new feature branch.`,
          "Keeps your new code separate from 'main' to prepare a clean Pull Request.",
        ],
        gitConcept: "Branch Isolation & Feature Development",
      };
    }

    return {
      commandName: `git ${sub} ${target}`,
      summary: `Switches your working directory and HEAD pointer to the existing '${target}' branch.`,
      commandMeaning: `Switches your active branch pointer and directory files to '${target}'.`,
      breakdown,
      details: [
        `Swaps out files in your working directory to match '${target}'.`,
        "Never make changes directly on main when contributing to open source.",
      ],
      gitConcept: "Branch Switching",
    };
  }

  // Git Branch
  if (root === "git" && sub === "branch") {
    return {
      commandName: "git branch",
      summary: "Lists, creates, or inspects local branches in your repository.",
      commandMeaning: "Lists all local branches with an asterisk on current active HEAD branch.",
      breakdown,
      details: [
        "Running with no arguments lists all local branches with `*` marking current branch.",
        "`-a`: Lists both local and remote tracking branches.",
      ],
      gitConcept: "Branch Management",
    };
  }

  // Git Add
  if (root === "git" && sub === "add") {
    const target = parts[2] || ".";
    return {
      commandName: `git add ${target}`,
      summary: "Moves modified or new files from your working directory into the Git Staging Area (Index).",
      commandMeaning: "Stages modified files into the Index, curating exactly what will be included in the next commit.",
      breakdown,
      details: [
        target === "." || target === "-A"
          ? "` . ` (dot): Stages all new, modified, and deleted files in the workspace."
          : `\`${target}\`: Stages only this specific file.`,
        "The Staging Area acts as a drafting area to curate exactly what goes into the next commit.",
      ],
      gitConcept: "Staging Area (Index)",
    };
  }

  // Git Commit
  if (root === "git" && sub === "commit") {
    const hasMsg = trimmed.includes("-m");
    const hasAmend = trimmed.includes("--amend");

    if (hasAmend) {
      return {
        commandName: "git commit --amend",
        summary: "Modifies the most recent commit by combining new staged changes or updating its message.",
        commandMeaning: "Overwrites the latest commit snapshot with new staged changes or updated message.",
        breakdown,
        details: [
          "`--amend`: Overwrites the previous commit rather than creating a brand new one.",
          "Great for fixing typos in the previous commit message before pushing.",
        ],
        gitConcept: "Commit History Rewriting",
      };
    }

    return {
      commandName: "git commit",
      summary: "Saves a permanent snapshot of all staged files into your local Git history.",
      commandMeaning: "Saves a permanent version snapshot of all currently staged files with a unique SHA hash.",
      breakdown,
      details: [
        hasMsg ? "`-m \"...\"`: Supplies an inline commit message without launching Vim or Nano." : "Launches text editor to write message.",
        "Commits are stored locally until you run `git push`.",
        "Tip: Use Conventional Commits (e.g. `feat:`, `fix:`, `docs:`) for professional OSS PRs.",
      ],
      gitConcept: "Snapshots & Version History",
    };
  }

  // Git Push
  if (root === "git" && sub === "push") {
    const remote = parts[2] || "origin";
    const branch = parts[3] || "branch";
    return {
      commandName: "git push",
      summary: "Uploads your local commits from your machine to the remote repository on GitHub.",
      commandMeaning: "Transfers your local branch commits over network to your remote repository on GitHub.",
      breakdown,
      details: [
        `\`${remote}\`: Destination remote server (usually 'origin' pointing to your personal fork).`,
        `\`${branch}\`: Branch name to create or update on GitHub.`,
        "Once pushed to GitHub, you will see a 'Compare & pull request' button on the repo page.",
      ],
      gitConcept: "Remote Publishing & Pull Request Workflow",
    };
  }

  // Git Fetch / Pull / Rebase
  if (root === "git" && sub === "fetch") {
    return {
      commandName: "git fetch",
      summary: "Downloads commits, files, and refs from a remote repository into local cache without modifying your working files.",
      commandMeaning: "Downloads latest changes from the remote server into local cache without altering your code.",
      breakdown,
      details: [
        "Safe operation that does not alter your working branch.",
        "Allows you to inspect what others merged before updating your code.",
      ],
      gitConcept: "Remote Synchronization",
    };
  }

  if (root === "git" && sub === "pull") {
    return {
      commandName: "git pull",
      summary: "Fetches new changes from a remote server and immediately merges them into your current branch.",
      commandMeaning: "Downloads remote changes and immediately merges them into your active branch.",
      breakdown,
      details: [
        "Equivalent to running `git fetch` followed by `git merge`.",
        "Updates your local branch to stay in sync with the remote repository.",
      ],
      gitConcept: "Remote Merging",
    };
  }

  if (root === "git" && sub === "rebase") {
    return {
      commandName: "git rebase",
      summary: "Replays your branch's unique commits on top of another branch or upstream master.",
      commandMeaning: "Reapplies your local commits one by one on top of the newest upstream code for a clean linear history.",
      breakdown,
      details: [
        "Creates a clean, linear project history without extra 'Merge branch' commits.",
        "Frequently required by open source maintainers before merging PRs.",
      ],
      gitConcept: "Linear History & Rebasing",
    };
  }

  // Git Status & Log
  if (root === "git" && sub === "status") {
    return {
      commandName: "git status",
      summary: "Inspects the current state of the working directory and staging area.",
      commandMeaning: "Displays current branch and shows modified, staged, or untracked files.",
      breakdown,
      details: [
        "Shows which branch you are on.",
        "Lists untracked, modified, and staged files waiting to be committed.",
      ],
      gitConcept: "Working Tree Inspection",
    };
  }

  if (root === "git" && sub === "log") {
    return {
      commandName: "git log",
      summary: "Displays the chronological list of commits in the current branch history.",
      commandMeaning: "Shows author, date, hash, and messages for all commits in this branch.",
      breakdown,
      details: [
        "Shows commit hashes, author names, dates, and commit messages.",
        "`--oneline`: Condenses each commit to a single line.",
      ],
      gitConcept: "History Inspection",
    };
  }

  if (root === "git" && sub === "diff") {
    return {
      commandName: "git diff",
      summary: "Shows exact line-by-line additions and deletions made to files.",
      commandMeaning: "Shows line-by-line comparison between files in working tree and staged index.",
      breakdown,
      details: [
        "`git diff`: Shows un-staged changes.",
        "`git diff --staged`: Shows changes in the staging area ready to commit.",
      ],
      gitConcept: "Difference Analysis",
    };
  }

  // Shell Commands
  if (root === "cd") {
    return {
      commandName: "cd (change directory)",
      summary: "Navigates the terminal into a specified folder or path.",
      commandMeaning: "Changes your active working directory folder in the shell.",
      breakdown,
      details: [
        "`cd repo`: Enters the 'repo' folder.",
        "`cd ..`: Moves up one parent directory level.",
      ],
      gitConcept: "File System Navigation",
    };
  }

  if (root === "echo") {
    return {
      commandName: "echo",
      summary: "Prints text or redirects text output into a file.",
      commandMeaning: "Outputs text string or appends/writes text into a file in your workspace.",
      breakdown,
      details: [
        "`>> filename`: Appends text to a file (creates the file if it doesn't exist).",
        "Used here to simulate writing code into a file.",
      ],
      gitConcept: "File Creation & Editing",
    };
  }

  if (root === "touch") {
    return {
      commandName: "touch",
      summary: "Creates a new empty file in the current directory.",
      commandMeaning: "Creates a new empty file with the given name.",
      breakdown,
      details: ["Creates a file on disk without writing any initial content."],
      gitConcept: "File Creation",
    };
  }

  if (root === "ls") {
    return {
      commandName: "ls (list)",
      summary: "Lists all files and directories in the current working directory.",
      commandMeaning: "Lists the names of all files and folders in your current directory.",
      breakdown,
      details: ["Shows files in the current folder."],
      gitConcept: "File System Inspection",
    };
  }

  if (root === "clear") {
    return {
      commandName: "clear",
      summary: "Clears all previous output text from the terminal screen.",
      commandMeaning: "Cleans the terminal display screen.",
      breakdown,
      details: ["Resets the terminal view for cleaner reading."],
      gitConcept: "Terminal Utility",
    };
  }

  return {
    commandName: root || "unknown",
    summary: `Executes the command '${trimmed}'.`,
    commandMeaning: `Executes '${trimmed}' in the terminal sandbox.`,
    breakdown,
    details: ["Standard terminal command execution."],
    gitConcept: "Command Line Interface",
  };
}

/**
 * Evaluates whether the executed command is Correct, Incorrect, Neutral, or Out-of-Sequence
 * with full workflow format and prerequisite breakdown.
 */
export function evaluateCommand(
  cmdStr: string,
  prevState: RepoState,
  newState: RepoState,
  handlerResult: HandlerResult,
  scenario: Scenario
): CommandAnalysis {
  const base = explainGitCommand(cmdStr);
  const trimmed = cmdStr.trim();
  const parts = trimmed.split(/\s+/);
  const root = parts[0]?.toLowerCase();
  const sub = parts[1]?.toLowerCase();
  const cmdStage = getCommandStageInfo(root, sub);

  // If the command failed with a real syntax/execution error
  if (handlerResult.error) {
    let suggestion = "Check command spelling, flags, and arguments.";
    let corrected: string | undefined = undefined;
    let correctionReason: string | undefined = undefined;

    // Typo matching dictionary for subcommands
    const typoMap: Record<string, { cmd: string; reason: string }> = {
      comit: { cmd: 'git commit -m "feat: add feature"', reason: "Fixed typo 'comit' -> 'commit' (spelled with double 'm') and added -m message flag." },
      commt: { cmd: 'git commit -m "feat: add feature"', reason: "Fixed typo 'commt' -> 'commit' and added -m message flag." },
      ci: { cmd: 'git commit -m "feat: add feature"', reason: "In standard Git, write 'git commit -m \"...\"' to record a commit." },
      cm: { cmd: 'git commit -m "feat: add feature"', reason: "Write 'git commit -m \"...\"' instead of shorthand 'cm'." },
      chekout: { cmd: 'git checkout -b feature-name', reason: "Fixed typo 'chekout' -> 'checkout' and added -b to create a branch." },
      checout: { cmd: 'git checkout -b feature-name', reason: "Fixed typo 'checout' -> 'checkout' and added -b flag." },
      co: { cmd: 'git checkout -b feature-name', reason: "Use 'git checkout -b <branch>' to create and switch to a branch." },
      stat: { cmd: 'git status', reason: "Fixed abbreviation 'stat' -> 'status'." },
      st: { cmd: 'git status', reason: "Use 'git status' to inspect modified and staged files." },
      stats: { cmd: 'git status', reason: "Fixed typo 'stats' -> 'status'." },
      pul: { cmd: 'git pull upstream main', reason: "Fixed typo 'pul' -> 'pull' (double 'l')." },
      pus: { cmd: 'git push origin feature-name', reason: "Fixed typo 'pus' -> 'push'." },
      psh: { cmd: 'git push origin feature-name', reason: "Fixed typo 'psh' -> 'push'." },
      br: { cmd: 'git branch', reason: "Use 'git branch' to list or create branches." },
      brnch: { cmd: 'git branch', reason: "Fixed typo 'brnch' -> 'branch'." },
      confg: { cmd: 'git config --global user.name "Your Name"', reason: "Fixed typo 'confg' -> 'config'." },
      clne: { cmd: 'git clone https://github.com/your-username/repo.git', reason: "Fixed typo 'clne' -> 'clone'." },
      clon: { cmd: 'git clone https://github.com/your-username/repo.git', reason: "Fixed typo 'clon' -> 'clone'." },
      rebas: { cmd: 'git rebase upstream/main', reason: "Fixed typo 'rebas' -> 'rebase'." },
      rbase: { cmd: 'git rebase upstream/main', reason: "Fixed typo 'rbase' -> 'rebase'." },
      df: { cmd: 'git diff', reason: "Use 'git diff' to inspect uncommitted changes." },
    };

    if (sub && typoMap[sub]) {
      corrected = typoMap[sub].cmd;
      correctionReason = typoMap[sub].reason;
      suggestion = `Write '${typoMap[sub].cmd}' instead.`;
    } else if (handlerResult.error.includes("pathspec")) {
      const targetBranch = parts[parts.length - 1] || "feature-name";
      corrected = `git checkout -b ${targetBranch}`;
      correctionReason = `The branch '${targetBranch}' does not exist yet. Use '-b' to create and switch in one step.`;
      suggestion = `Run: git checkout -b ${targetBranch}`;
    } else if (handlerResult.error.includes("user.name requires a value")) {
      corrected = 'git config --global user.name "Your Name"';
      correctionReason = "You must provide your name in quotes after 'user.name'.";
      suggestion = 'Run: git config --global user.name "Your Name"';
    } else if (handlerResult.error.includes("user.email requires a value")) {
      corrected = 'git config --global user.email "your.email@example.com"';
      correctionReason = "You must provide your email in quotes after 'user.email'.";
      suggestion = 'Run: git config --global user.email "your.email@example.com"';
    } else if (handlerResult.error.includes("command not found")) {
      if (root.startsWith("git")) {
        corrected = `git ${root.slice(3)} ${parts.slice(1).join(" ")}`.trim();
        correctionReason = "Missing space between 'git' and subcommand.";
        suggestion = `Include a space: '${corrected}'`;
      } else {
        suggestion = `The command '${root}' is not recognized. In this lab, use 'git', 'cd', 'echo', 'ls', or 'clear'.`;
      }
    } else if (handlerResult.error.includes("You must specify a repository to clone")) {
      corrected = "git clone https://github.com/your-username/repo.git";
      correctionReason = "The 'git clone' command requires the repository URL.";
      suggestion = "Run: git clone https://github.com/your-username/repo.git";
    }

    const currentStep = scenario.steps.find((st) => !st.check(prevState));

    return {
      rawCommand: cmdStr,
      commandName: base.commandName,
      syntaxValid: false,
      status: "incorrect",
      badgeText: "Syntax / Execution Error ❌",
      summary: base.summary,
      commandMeaning: base.commandMeaning,
      breakdown: base.breakdown,
      details: base.details,
      gitConcept: base.gitConcept,
      feedback: handlerResult.error,
      suggestion,
      correctedCommand: corrected,
      correctionReason,
      scenarioTargetCommand: currentStep?.exampleCommand,
    };
  }

  // Inspection / Informational commands (neutral, valid but don't mutate state)
  const isInspection =
    (root === "git" && (sub === "status" || sub === "log" || sub === "diff" || (sub === "remote" && parts[2] === "-v") || (sub === "config" && trimmed.includes("--list")))) ||
    root === "ls" ||
    root === "pwd" ||
    root === "clear";

  if (isInspection) {
    return {
      rawCommand: cmdStr,
      commandName: base.commandName,
      syntaxValid: true,
      status: "neutral",
      badgeText: "Informational ℹ️",
      summary: base.summary,
      commandMeaning: base.commandMeaning,
      breakdown: base.breakdown,
      details: base.details,
      gitConcept: base.gitConcept,
      feedback: "Great habit! Checking repository state before and after commands helps prevent mistakes in open source.",
    };
  }

  // Evaluate progress against Scenario Steps
  const prevCompletedSteps = scenario.steps.filter((st) => st.check(prevState)).length;
  const newCompletedSteps = scenario.steps.filter((st) => st.check(newState)).length;

  if (newCompletedSteps > prevCompletedSteps) {
    // Advanced the scenario!
    const newlyCompleted = scenario.steps.find(
      (st) => !st.check(prevState) && st.check(newState)
    );
    const isFinished = scenario.checkGoal(newState);

    return {
      rawCommand: cmdStr,
      commandName: base.commandName,
      syntaxValid: true,
      status: "correct",
      badgeText: isFinished ? "Scenario Solved! 🎉" : "Correct Step ✓",
      summary: base.summary,
      commandMeaning: base.commandMeaning,
      breakdown: base.breakdown,
      details: base.details,
      gitConcept: base.gitConcept,
      feedback: isFinished
        ? `Outstanding! You successfully completed all requirements for Scenario ${scenario.id}.`
        : `Step achieved: ${newlyCompleted?.label || "Progress updated!"}`,
      suggestion: isFinished
        ? "Click 'Next Scenario' to continue learning."
        : `Next goal: ${scenario.steps.find((st) => !st.check(newState))?.label || "Finish remaining steps."}`,
    };
  }

  // OUT-OF-SEQUENCE DETECTION: The syntax is valid, but the command belongs to a different workflow stage!
  if (scenario.id === 1) {
    if (root === "git" && sub === "config") {
      return {
        rawCommand: cmdStr,
        commandName: base.commandName,
        syntaxValid: true,
        status: "correct",
        badgeText: "Config Updated ✓",
        summary: base.summary,
        commandMeaning: base.commandMeaning,
        breakdown: base.breakdown,
        details: base.details,
        gitConcept: base.gitConcept,
        feedback: "Git configuration updated successfully.",
      };
    }

    // Newcomer ran branching, committing, cloning, or pushing in Scenario 1
    const prerequisites: CommandPrerequisite[] = [
      {
        cmd: 'git config --global user.name "Your Name"',
        reason: "Git requires your author name so every commit you write is stamped with your identity.",
      },
      {
        cmd: 'git config --global user.email "your.email@example.com"',
        reason: "GitHub uses this email to link your commits and PRs to your GitHub profile.",
      },
    ];

    return {
      rawCommand: cmdStr,
      commandName: base.commandName,
      syntaxValid: true,
      status: "out-of-sequence",
      badgeText: "Syntax Valid • Out of Sequence ⚡",
      summary: base.summary,
      commandMeaning: base.commandMeaning,
      breakdown: base.breakdown,
      details: base.details,
      gitConcept: base.gitConcept,
      feedback: `✅ Syntax is valid! '${base.commandName}' is a legitimate Git command. However, in the standard open source contribution format, we must complete our prerequisite identity configuration first before working on branches or commits.`,
      suggestion: "Please run the required setup commands below to complete Scenario 1.",
      correctedCommand: 'git config --global user.name "Alex Dev"',
      sequenceInfo: {
        isOutOfSequence: true,
        currentStageName: scenario.stageName,
        commandStageName: cmdStage.stageName,
        stageNumber: scenario.id,
        explanation: "In open source projects, if you branch or commit before configuring your identity, Git will assign commits to 'anonymous' or your machine hostname, which causes GitHub contribution graphs and PR checks to fail.",
        prerequisites,
      },
    };
  }

  if (scenario.id === 2) {
    if (root === "git" && sub === "clone") {
      return {
        rawCommand: cmdStr,
        commandName: base.commandName,
        syntaxValid: true,
        status: "correct",
        badgeText: "Cloned Fork ✓",
        summary: base.summary,
        commandMeaning: base.commandMeaning,
        breakdown: base.breakdown,
        details: base.details,
        gitConcept: base.gitConcept,
        feedback: "Fork cloned! Remember to `cd repo` before configuring remotes.",
        suggestion: "Next: cd repo",
        correctedCommand: "cd repo",
      };
    }
    if (root === "cd" && newState.cwd === "/home/user/repo") {
      return {
        rawCommand: cmdStr,
        commandName: base.commandName,
        syntaxValid: true,
        status: "correct",
        badgeText: "Entered Directory ✓",
        summary: base.summary,
        commandMeaning: base.commandMeaning,
        breakdown: base.breakdown,
        details: base.details,
        gitConcept: base.gitConcept,
        feedback: "Now in /home/user/repo directory. Next connect the maintainer repository as upstream.",
        suggestion: "Next: git remote add upstream https://github.com/original/repo.git",
        correctedCommand: "git remote add upstream https://github.com/original/repo.git",
      };
    }
    if (root === "git" && sub === "remote" && prevState.cwd !== "/home/user/repo") {
      return {
        rawCommand: cmdStr,
        commandName: base.commandName,
        syntaxValid: true,
        status: "out-of-sequence",
        badgeText: "Syntax Valid • Wrong Directory ⚠️",
        summary: base.summary,
        commandMeaning: base.commandMeaning,
        breakdown: base.breakdown,
        details: base.details,
        gitConcept: base.gitConcept,
        feedback: "✅ Syntax is correct! But you must enter the cloned folder (`cd repo`) first before adding remotes.",
        suggestion: "Run 'cd repo' first, then add the upstream remote.",
        correctedCommand: "cd repo",
        sequenceInfo: {
          isOutOfSequence: true,
          currentStageName: scenario.stageName,
          commandStageName: "Stage 2: Remote Configuration",
          stageNumber: scenario.id,
          explanation: "Remote aliases are stored inside the project's local `.git/config` file. You must navigate inside the project directory first.",
          prerequisites: [
            { cmd: "cd repo", reason: "Navigates into the local repository." },
          ],
        },
      };
    }
  }

  if (scenario.id === 3) {
    if (root === "git" && sub === "commit" && prevState.staged.length === 0) {
      return {
        rawCommand: cmdStr,
        commandName: base.commandName,
        syntaxValid: true,
        status: "out-of-sequence",
        badgeText: "Syntax Valid • Empty Staging Area ⚠️",
        summary: base.summary,
        commandMeaning: base.commandMeaning,
        breakdown: base.breakdown,
        details: base.details,
        gitConcept: base.gitConcept,
        feedback: "✅ Commit syntax is correct! However, in Git's 3-tree format, you must first stage your modified files with `git add` before committing.",
        suggestion: "Stage your file with: git add hello.txt",
        correctedCommand: "git add hello.txt",
        sequenceInfo: {
          isOutOfSequence: true,
          currentStageName: scenario.stageName,
          commandStageName: "Stage 3: Commit Snapshot",
          stageNumber: scenario.id,
          explanation: "Git separates modified working files from the Staging Area (Index). Commits only record what is currently staged.",
          prerequisites: [
            { cmd: 'echo "Hello Open Source" >> hello.txt', reason: "Create or edit a project file." },
            { cmd: "git add hello.txt", reason: "Stage your file into the Git Index." },
          ],
        },
      };
    }
  }

  // Default valid fallback
  return {
    rawCommand: cmdStr,
    commandName: base.commandName,
    syntaxValid: true,
    status: "neutral",
    badgeText: "Valid Command ℹ️",
    summary: base.summary,
    commandMeaning: base.commandMeaning,
    breakdown: base.breakdown,
    details: base.details,
    gitConcept: base.gitConcept,
    feedback: "Command syntax is valid and executed cleanly in your virtual Git environment.",
  };
}

// Engine that executes Git & Shell commands and returns outputs + full pedagogical analysis
export function executeCommand(
  cmdStr: string,
  state: RepoState,
  scenario?: Scenario
): HandlerResult {
  const parts = cmdStr.trim().split(/\s+/);
  const out: string[] = [];
  const newState: RepoState = {
    ...state,
    remotes: { ...state.remotes },
    branches: { ...state.branches },
    files: { ...state.files },
    commits: { ...state.commits },
    config: { ...state.config },
    staged: [...state.staged],
    modified: [...state.modified],
  };
  let error: string | undefined;

  const root = parts[0]?.toLowerCase();
  const sub = parts[1]?.toLowerCase();

  if (root === "clear") {
    const res: HandlerResult = { out: ["__CLEAR__"], state: newState };
    if (scenario) {
      res.analysis = evaluateCommand(cmdStr, state, newState, res, scenario);
    }
    return res;
  }

  if (root === "next") {
    const res: HandlerResult = {
      out: ["__NEXT_SCENARIO__", "Advancing to next scenario..."],
      state: newState,
    };
    return res;
  }

  if (root === "pwd") {
    out.push(newState.cwd);
  } else if (root === "ls") {
    if (newState.cwd === "/home/user") {
      if (newState.remotes["origin"]) {
        out.push("repo/");
      } else {
        out.push("(empty directory)");
      }
    } else {
      const allFiles = Object.keys(newState.files);
      if (allFiles.length > 0) {
        out.push(allFiles.join("  "));
      } else {
        out.push("README.md  CONTRIBUTING.md");
      }
    }
  } else if (root === "cd") {
    const target = parts[1]?.replace(/\/$/, "");
    if (target === "repo" || target === "first-contributions" || target === "./repo" || target === "./first-contributions") {
      newState.cwd = "/home/user/repo";
      out.push("Entered directory: /home/user/repo");
      if (scenario?.id === 2) {
        out.push("✅ [Task 2/3 Complete] In project directory.");
        out.push("👉 Next Task 3/3: Run 'git remote add upstream https://github.com/maintainer/first-contributions.git'");
      }
    } else if (target === ".." || target === "~" || !target) {
      newState.cwd = "/home/user";
      out.push("Navigated to: /home/user");
    } else {
      error = `bash: cd: ${target}: No such file or directory`;
    }
  } else if (root === "echo") {
    const fileIndex = parts.indexOf(">>");
    const singleIndex = parts.indexOf(">");
    const targetIndex = fileIndex !== -1 ? fileIndex : singleIndex;

    if (targetIndex !== -1 && parts[targetIndex + 1]) {
      const filename = parts[targetIndex + 1];
      newState.files = { ...newState.files, [filename]: "content" };
      if (!newState.modified.includes(filename) && !newState.staged.includes(filename)) {
        newState.modified = [...newState.modified, filename];
      }
      out.push(`Wrote content to ${filename}`);
      if (scenario?.id === 3) {
        out.push(`✅ [Task 2/4 Complete] Modified '${filename}' in working directory.`);
        out.push(`👉 Next Task 3/4: Run 'git add ${filename}' (or 'git add .') to stage your changes before committing!`);
      }
    } else {
      out.push(parts.slice(1).join(" ").replace(/["']/g, ""));
    }
  } else if (root === "touch") {
    const filename = parts[1] || "hello.txt";
    newState.files = { ...newState.files, [filename]: "" };
    if (!newState.modified.includes(filename) && !newState.staged.includes(filename)) {
      newState.modified = [...newState.modified, filename];
    }
    out.push(`Created empty file '${filename}'`);
    if (scenario?.id === 3) {
      out.push(`✅ [Task 2/4 Complete] Created '${filename}' in working directory.`);
      out.push(`👉 Next Task 3/4: Run 'git add ${filename}' (or 'git add .') to stage your changes before committing!`);
    }
  } else if (root === "cat") {
    const file = parts[1];
    if (newState.files[file]) {
      out.push(newState.files[file]);
    } else {
      error = `cat: ${file}: No such file or directory`;
    }
  } else if (root === "git") {
    if (!sub || sub === "--help" || sub === "help") {
      out.push("FirstPR Virtual Git Engine — Open Source Practice Lab");
      out.push("Supported commands: config, clone, remote, checkout, switch, branch, add, commit, push, fetch, rebase, status, log, diff");
    } else if (sub === "config") {
      if (parts.includes("--list") || parts.includes("-l")) {
        out.push(`user.name=${newState.config.name || "(not set)"}`);
        out.push(`user.email=${newState.config.email || "(not set)"}`);
      } else if (parts.includes("user.name")) {
        const nameMatch = cmdStr.match(/user\.name\s+["']?([^"'\n]+)["']?/);
        if (nameMatch && nameMatch[1]) {
          const val = nameMatch[1].trim();
          newState.config = { ...newState.config, name: val };
          out.push(`Configured global user.name = "${val}"`);
          if (scenario?.id === 1) {
            out.push("✅ [Task 1/2 Complete] Set author name.");
            out.push("👉 Next Task 2/2: Run 'git config --global user.email \"your.email@example.com\"'");
          }
        } else {
          error = "error: user.name requires a value. Example: git config --global user.name \"Alex Dev\"";
        }
      } else if (parts.includes("user.email")) {
        const emailMatch = cmdStr.match(/user\.email\s+["']?([^"'\n]+)["']?/);
        if (emailMatch && emailMatch[1]) {
          const val = emailMatch[1].trim();
          newState.config = { ...newState.config, email: val };
          out.push(`Configured global user.email = "${val}"`);
          if (scenario?.id === 1) {
            out.push("✅ [Task 2/2 Complete] Set author email.");
            out.push("🎉 Scenario 1 Solved! Identity configured.");
          }
        } else {
          error = "error: user.email requires a value. Example: git config --global user.email \"alex@example.com\"";
        }
      } else {
        error = "error: specify 'user.name' or 'user.email' to configure.";
      }
    } else if (sub === "clone") {
      const url = parts[2];
      if (url) {
        out.push(`Cloning into 'repo'...`);
        out.push(`remote: Enumerating objects: 120, done.`);
        out.push(`remote: Total 120 (delta 42), reused 115 (delta 37)`);
        out.push(`Receiving objects: 100% (120/120), 45.20 KiB | 2.10 MiB/s, done.`);
        newState.remotes = { ...newState.remotes, origin: url };
        if (scenario?.id === 2) {
          out.push("✅ [Task 1/3 Complete] Cloned fork into /home/user/repo");
          out.push("👉 Next Task 2/3: Run 'cd repo' to enter the cloned folder.");
        }
      } else {
        error = "fatal: You must specify a repository to clone. Example: git clone https://github.com/user/repo.git";
      }
    } else if (sub === "remote") {
      const action = parts[2]?.toLowerCase();
      if (action === "add") {
        const name = parts[3];
        const url = parts[4];
        if (name && url) {
          newState.remotes = { ...newState.remotes, [name]: url };
          out.push(`Added remote '${name}' -> ${url}`);
          if (scenario?.id === 2 && name === "upstream") {
            out.push("✅ [Task 3/3 Complete] Upstream maintainer remote connected!");
            out.push("🎉 Scenario 2 Solved! Fork & Upstream configured.");
          }
        } else {
          error = "usage: git remote add <name> <url>";
        }
      } else if (action === "-v" || action === "--verbose" || !action) {
        if (Object.keys(newState.remotes).length === 0) {
          out.push("(no remotes configured)");
        } else {
          for (const [name, url] of Object.entries(newState.remotes)) {
            out.push(`${name}\t${url} (fetch)`);
            out.push(`${name}\t${url} (push)`);
          }
        }
      }
    } else if (sub === "checkout" || sub === "switch") {
      const isNew = parts.includes("-b") || parts.includes("-c");
      const branchName = parts[parts.length - 1];
      if (!branchName || branchName.startsWith("-")) {
        error = `fatal: missing branch name for git ${sub}`;
      } else if (isNew) {
        newState.branches = {
          ...newState.branches,
          [branchName]: [...(newState.branches[newState.head] || ["c1"])],
        };
        newState.head = branchName;
        out.push(`Switched to a new branch '${branchName}'`);
        if (scenario?.id === 3) {
          out.push(`✅ [Task 1/4 Complete] Created and switched to branch '${branchName}'`);
          out.push(`👉 Next Task 2/4: Modify or create a file with 'echo "Hello Open Source" >> hello.txt'`);
        }
      } else {
        if (newState.branches[branchName]) {
          newState.head = branchName;
          out.push(`Switched to branch '${branchName}'`);
        } else {
          error = `error: pathspec '${branchName}' did not match any file(s) known to git. Use '-b' if creating a new branch.`;
        }
      }
    } else if (sub === "branch") {
      if (parts.length === 2) {
        for (const b of Object.keys(newState.branches)) {
          out.push(b === newState.head ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`);
        }
      } else {
        const branchName = parts[2];
        newState.branches = {
          ...newState.branches,
          [branchName]: [...(newState.branches[newState.head] || ["c1"])],
        };
        out.push(`Created branch '${branchName}'`);
      }
    } else if (sub === "add") {
      if (parts.includes(".") || parts.includes("-A") || parts.includes("--all")) {
        if (newState.modified.length === 0 && newState.staged.length === 0) {
          out.push("No modified files found to stage. Create or edit a file first (e.g. echo \"Hello\" >> hello.txt).");
        } else {
          newState.staged = [...new Set([...newState.staged, ...newState.modified])];
          newState.modified = [];
          out.push(`Staged all modified changes.`);
          if (scenario?.id === 3) {
            out.push("✅ [Task 3/4 Complete] Staged changes into the Git Staging Area (Index).");
            out.push("👉 Next Task 4/4: Run 'git commit -m \"feat: add greeting message\"' to commit your staged files.");
          }
        }
      } else {
        const filename = parts[2];
        if (!filename) {
          error = "Nothing specified, nothing added. Maybe you wanted to say 'git add .' ?";
        } else {
          newState.staged = [...new Set([...newState.staged, filename])];
          newState.modified = newState.modified.filter((f) => f !== filename);
          out.push(`Staged '${filename}'`);
          if (scenario?.id === 3) {
            out.push(`✅ [Task 3/4 Complete] Staged '${filename}' into the Git Staging Area (Index).`);
            out.push("👉 Next Task 4/4: Run 'git commit -m \"feat: add greeting message\"' to commit your staged files.");
          }
        }
      }
    } else if (sub === "commit") {
      if (newState.staged.length === 0) {
        out.push("error: nothing to commit, working tree clean");
        out.push("⚠️ Prerequisite Required: In Git, you must stage your modified files with 'git add <file>' first before running 'git commit'!");
        out.push("👉 Run: git add hello.txt");
      } else {
        const msgMatch = cmdStr.match(/-m\s+["']([^"']+)["']/);
        const msg = msgMatch ? msgMatch[1] : "Update project files";
        const id = "c" + Math.random().toString(36).slice(2, 7);
        newState.commits = {
          ...newState.commits,
          [id]: { msg, parent: newState.branches[newState.head]?.slice(-1)[0] },
        };
        newState.branches = {
          ...newState.branches,
          [newState.head]: [...(newState.branches[newState.head] || []), id],
        };
        const count = newState.staged.length;
        newState.staged = [];
        out.push(`[${newState.head} ${id}] ${msg}`);
        out.push(` ${count} file${count > 1 ? "s" : ""} changed, 1 insertion(+)`);
        if (scenario?.id === 3) {
          out.push(`✅ [Task 4/4 Complete] Committed staged changes to branch '${newState.head}' with commit ID [${id}]!`);
          out.push("🎉 Scenario 3 Solved! You successfully created a branch, modified a file, staged with 'git add', and committed with 'git commit'.");
        }
      }
    } else if (sub === "push") {
      const remote = parts[2] || "origin";
      const branch = parts[3] || newState.head;
      out.push(`Enumerating objects: 5, done.`);
      out.push(`Counting objects: 100% (5/5), done.`);
      out.push(`Writing objects: 100% (3/3), done.`);
      out.push(`To ${newState.remotes[remote] || "https://github.com/user/repo.git"}`);
      out.push(` * [new branch]      ${branch} -> ${branch}`);
      out.push(`Branch '${branch}' set up to track remote branch '${branch}' from '${remote}'.`);
      newState.pushed = branch;
      if (scenario?.id === 4) {
        out.push(`✅ [Task 1/1 Complete] Pushed branch '${branch}' to remote 'origin'!`);
        out.push("🎉 Scenario 4 Solved! Your branch is live on GitHub, ready for a Pull Request.");
      }
    } else if (sub === "fetch") {
      const remote = parts[2] || "upstream";
      out.push(`From ${newState.remotes[remote] || "https://github.com/maintainer/repo.git"}`);
      out.push(` * [new branch]      main       -> ${remote}/main`);
      (newState as any).fetchedUpstream = true;
      if (scenario?.id === 5) {
        out.push("✅ [Task 1/2 Complete] Fetched latest updates from upstream.");
        out.push("👉 Next Task 2/2: Run 'git rebase upstream/main' to reapply your commits on top.");
      }
    } else if (sub === "rebase") {
      const target = parts[2] || "upstream/main";
      out.push(`Successfully rebased and updated refs/heads/${newState.head} on top of ${target}.`);
      (newState as any).rebased = true;
      if (scenario?.id === 5) {
        out.push(`✅ [Task 2/2 Complete] Successfully rebased '${newState.head}' on top of ${target}.`);
        out.push("🎉 Scenario 5 Solved! Clean linear history achieved.");
      }
    } else if (sub === "status") {
      out.push(`On branch ${newState.head}`);
      if (newState.staged.length > 0) {
        out.push(`Changes to be committed:`);
        out.push(`  (use "git restore --staged <file>..." to unstage)`);
        newState.staged.forEach((f) => out.push(`\t\x1b[32mnew file:   ${f}\x1b[0m`));
      }
      if (newState.modified.length > 0) {
        out.push(`Changes not staged for commit:`);
        out.push(`  (use "git add <file>..." to update what will be committed)`);
        newState.modified.forEach((f) => out.push(`\t\x1b[31mmodified:   ${f}\x1b[0m`));
      }
      if (newState.staged.length === 0 && newState.modified.length === 0) {
        out.push("nothing to commit, working tree clean");
      }
    } else if (sub === "log") {
      const branchCommits = newState.branches[newState.head] || [];
      if (branchCommits.length === 0) {
        out.push("(no commits on this branch yet)");
      } else {
        [...branchCommits].reverse().forEach((cId) => {
          const commitObj = newState.commits[cId] || { msg: "Commit" };
          out.push(`\x1b[33mcommit ${cId}\x1b[0m`);
          out.push(`Author: ${newState.config.name || "User"} <${newState.config.email || "user@example.com"}>`);
          out.push(`    ${commitObj.msg}`);
          out.push("");
        });
      }
    } else {
      error = `git: '${sub}' is not a git command. See 'git --help'.`;
    }
  } else {
    error = `bash: ${parts[0]}: command not found`;
  }

  const result: HandlerResult = { out, state: newState, error };
  if (scenario) {
    result.analysis = evaluateCommand(cmdStr, state, newState, result, scenario);
  }
  return result;
}
