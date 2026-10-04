export type Node = "upstream" | "origin" | "local";

export interface Commit {
  id: string;
  hash: string;
  message?: string;
  branch: string;
}

export interface Branch {
  name: string;
  commits: string[]; // array of commit ids
}

export interface Remote {
  name: string;
  url: string;
}

export interface GraphState {
  commits: Commit[];
  branches: Branch[];
  remotes: Remote[];
}

export interface CommandFlag {
  flag: string;
  description: string;
}

export interface LocalWorkingState {
  workingDirectory: "Clean" | "Modified" | "Untracked";
  stagingArea: "Empty" | "Staged Snapshots";
  activeBranch: string;
  headCommit: string;
}

export interface Step {
  id: number;
  stageBadge: string;
  title: string;
  subtitle: string;
  command?: string;
  commandExplanation?: string;
  commandFlags?: CommandFlag[];
  stdout?: string[];
  explain: string;
  underTheHood: string[];
  proTip: string;
  pitfall: string;
  learnModuleId: string;
  learnModuleTitle: string;
  learnLessonSummary: string;
  graph: Record<Node, GraphState | null>; // State of the graph at each node
  highlight: Node[];
  edge?: { from: Node; to: Node; label: string; active?: boolean };
  localState?: LocalWorkingState;
}

const baseGraph: GraphState = {
  commits: [
    { id: "c1", hash: "9e4a1b0", message: "Initial project setup", branch: "main" },
    { id: "c2", hash: "3f8d2c1", message: "Release v1.2.0 docs", branch: "main" },
  ],
  branches: [{ name: "main", commits: ["c1", "c2"] }],
  remotes: [],
};

export const workflowSteps: Step[] = [
  {
    id: 1,
    stageBadge: "Stage 1: Fork",
    title: "Fork the Upstream Repository",
    subtitle: "Create your cloud-hosted workspace on GitHub",
    command: "gh repo fork original-owner/project --clone=false",
    commandExplanation: "Creates a server-side mirror in your personal GitHub account with full write permissions while keeping upstream reference tracking.",
    commandFlags: [
      { flag: "--clone=false", description: "Creates only the remote fork in GitHub; we clone explicitly in the next step." }
    ],
    stdout: [
      "✓ Created fork your-username/project",
      "? Would you like to clone the repository? No",
      "✓ Fork ready at https://github.com/your-username/project",
    ],
    explain: "A fork is your own personal copy of the repository on GitHub. It lives in your account with full administrator access, allowing you to test changes without risking the upstream codebase.",
    underTheHood: [
      "GitHub creates a server-side mirror of all refs and Git object databases.",
      "An upstream connection link is stored in GitHub to facilitate future Pull Requests.",
      "Your account receives full write permissions to this new fork.",
    ],
    proTip: "Check the original project's default branch before starting. Some repositories use 'main', while others use 'develop' or 'trunk'.",
    pitfall: "Trying to clone the upstream repository directly with write intentions. Without maintainer privileges, 'git push' will fail with HTTP 403 Forbidden.",
    learnModuleId: "05",
    learnModuleTitle: "Module 05: Forking a repository",
    learnLessonSummary: "Hands-on walkthrough of GitHub repository forking, permissions, and initial remote topology.",
    highlight: ["upstream", "origin"],
    edge: { from: "upstream", to: "origin", label: "Server-side Fork", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: null,
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "None (Uninitialized)",
      headCommit: "None",
    },
  },
  {
    id: 2,
    stageBadge: "Stage 2: Clone",
    title: "Clone Your Fork to Your Local Computer",
    subtitle: "Download the codebase and full Git history to your machine",
    command: "git clone https://github.com/your-username/project.git && cd project",
    commandExplanation: "Downloads the complete repository files and .git object history from your GitHub fork into a local directory.",
    commandFlags: [
      { flag: "git clone <url>", description: "Fetches all commits, trees, and blobs and checks out the default branch." },
      { flag: "cd project", description: "Changes current terminal directory into the cloned project folder." }
    ],
    stdout: [
      "Cloning into 'project'...",
      "remote: Enumerating objects: 1240, done.",
      "remote: Counting objects: 100% (342/342), done.",
      "remote: Compressing objects: 100% (180/180), done.",
      "Receiving objects: 100% (1240/1240), 2.45 MiB | 8.20 MiB/s, done.",
      "Resolving deltas: 100% (712/712), done.",
    ],
    explain: "Cloning downloads the repository from GitHub to your computer. It creates the working tree files you edit and configures a remote named 'origin' pointing to your fork.",
    underTheHood: [
      "Git creates a local remote named 'origin' pointing to your GitHub URL in .git/config.",
      "Stores remote tracking branches in .git/refs/remotes/origin/main.",
      "Checks out the working tree files and sets HEAD to refs/heads/main.",
    ],
    proTip: "Set up SSH keys instead of HTTPS if you use Two-Factor Authentication (2FA) on GitHub. It eliminates repeated personal access token prompts.",
    pitfall: "Cloning the upstream repository instead of your fork. If you clone upstream, your remote 'origin' will point to the original repo, preventing you from pushing your branches.",
    learnModuleId: "05",
    learnModuleTitle: "Module 05: Forking & Cloning",
    learnLessonSummary: "Complete guide on Git clones, SSH vs HTTPS, and local workspace directory architecture.",
    highlight: ["origin", "local"],
    edge: { from: "origin", to: "local", label: "Clone Objects", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        remotes: [{ name: "origin", url: "https://github.com/your-username/project.git" }],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "main",
      headCommit: "3f8d2c1",
    },
  },
  {
    id: 3,
    stageBadge: "Stage 3: Upstream",
    title: "Connect the Upstream Remote",
    subtitle: "Establish a direct synchronization link to the original project",
    command: "git remote add upstream https://github.com/original-owner/project.git",
    commandExplanation: "Registers the original parent repository as a secondary remote named 'upstream' so you can pull future updates.",
    commandFlags: [
      { flag: "remote add", description: "Registers a new remote name and target URL in local .git/config." },
      { flag: "upstream", description: "Standard community naming convention for the canonical parent repository." }
    ],
    stdout: [
      "$ git remote -v",
      "origin    https://github.com/your-username/project.git (fetch)",
      "origin    https://github.com/your-username/project.git (push)",
      "upstream  https://github.com/original-owner/project.git (fetch)",
      "upstream  https://github.com/original-owner/project.git (push)",
    ],
    explain: "By default, your local repo only knows about 'origin' (your fork). Adding 'upstream' establishes a direct bridge to the original repository so you can fetch fresh maintainer code at any time.",
    underTheHood: [
      "Appends a new [remote \"upstream\"] block inside .git/config.",
      "Configures remote refspecs: 'fetch = +refs/heads/*:refs/remotes/upstream/*'.",
      "Enables isolated fetching without altering your local working directory.",
    ],
    proTip: "Run 'git remote -v' immediately after adding to verify both 'origin' (your fork) and 'upstream' (original project) are correctly configured.",
    pitfall: "Typing 'upstream' with a typo or linking your fork URL twice. Ensure 'upstream' points to the original maintainer's URL.",
    learnModuleId: "06",
    learnModuleTitle: "Module 06: Keeping in sync",
    learnLessonSummary: "Mastering remote topologies: difference between origin and upstream remotes and how to inspect them.",
    highlight: ["local", "upstream"],
    edge: { from: "local", to: "upstream", label: "Register Remote", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "main",
      headCommit: "3f8d2c1",
    },
  },
  {
    id: 4,
    stageBadge: "Stage 4: Branch",
    title: "Sync Main & Create Feature Branch",
    subtitle: "Always isolate changes on a dedicated branch; never touch main",
    command: "git checkout main && git pull upstream main && git checkout -b feat/fix-nav-contrast",
    commandExplanation: "Pulls latest commits from the upstream project into main, then cuts an isolated feature branch.",
    commandFlags: [
      { flag: "pull upstream main", description: "Fetches new upstream commits and fast-forwards your local main branch." },
      { flag: "-b <branch>", description: "Creates a new branch pointer and immediately switches HEAD to it." }
    ],
    stdout: [
      "Switched to branch 'main'",
      "From https://github.com/original-owner/project",
      " * branch            main       -> FETCH_HEAD",
      "Already up to date.",
      "Switched to a new branch 'feat/fix-nav-contrast'",
    ],
    explain: "Open source moves quickly. Always sync your local main with upstream before branching. Isolating your work on a feature branch prevents merge conflicts and lets you submit multiple independent PRs.",
    underTheHood: [
      "Creates a new reference file in .git/refs/heads/feat/fix-nav-contrast pointing to commit 3f8d2c1.",
      "Updates .git/HEAD file to 'ref: refs/heads/feat/fix-nav-contrast'.",
      "Leaves the 'main' branch untouched and clean.",
    ],
    proTip: "Use meaningful prefixes for branch names: 'feat/', 'fix/', 'docs/', or 'refactor/'. Include the issue ticket if available (e.g., 'fix/issue-104').",
    pitfall: "Committing directly onto 'main'. When upstream merges new code, your main branch will diverge, causing messy merge conflicts that require painful rebasing.",
    learnModuleId: "07",
    learnModuleTitle: "Module 07: Branching out",
    learnLessonSummary: "Feature branch strategy, branch naming best practices, and why working on main is dangerous.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2"] },
        ],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "feat/fix-nav-contrast",
      headCommit: "3f8d2c1",
    },
  },
  {
    id: 5,
    stageBadge: "Stage 5: Code",
    title: "Implement Your Changes & Verify",
    subtitle: "Edit files in your IDE, verify diffs, and run test suites",
    command: "git status && git diff",
    commandExplanation: "Inspects which files were modified and reviews the exact line-by-line diff before staging.",
    commandFlags: [
      { flag: "git status", description: "Shows modified, staged, and untracked files in your working directory." },
      { flag: "git diff", description: "Outputs unified line-by-line additions (+) and deletions (-) in unstaged files." }
    ],
    stdout: [
      "On branch feat/fix-nav-contrast",
      "Changes not staged for commit:",
      "  (use \"git add <file>...\" to update what will be committed)",
      "	modified:   src/components/Navbar.tsx",
      "	modified:   src/styles/theme.css",
      "",
      "no changes added to commit (use \"git add\" to stage)",
    ],
    explain: "You edit the code in your preferred editor. At this step, the modifications live only in your working directory. Git detects the changes, but no permanent snapshot has been recorded yet.",
    underTheHood: [
      "Git compares file modification timestamps and hashes against the index cache.",
      "Calculates cryptographic SHA hashes of the modified files to compute the exact diff.",
      "Working tree is in 'modified' state; .git object store is unchanged.",
    ],
    proTip: "Run project tests and linters locally before staging anything (e.g., 'npm test' or 'cargo test'). Catching lint errors early speeds up PR review.",
    pitfall: "Accidentally modifying irrelevant files like OS files (.DS_Store), package manager locks, or personal debug console logs. Inspect 'git status' frequently.",
    learnModuleId: "08",
    learnModuleTitle: "Module 08: Making changes",
    learnLessonSummary: "The 3 states of Git: Working directory, Staging index, and Commit tree, plus reading git diffs.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2"] },
        ],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Modified",
      stagingArea: "Empty",
      activeBranch: "feat/fix-nav-contrast",
      headCommit: "3f8d2c1",
    },
  },
  {
    id: 6,
    stageBadge: "Stage 6: Commit",
    title: "Stage Files & Create Atomic Commit",
    subtitle: "Take a permanent snapshot with a concise Conventional Commit message",
    command: "git add src/components/Navbar.tsx src/styles/theme.css && git commit -m \"fix(nav): improve contrast ratio for WCAG AA compliance\"",
    commandExplanation: "Adds selected files to the staging index, then records an immutable commit object in local history.",
    commandFlags: [
      { flag: "git add <files>", description: "Stages specified files into the index (avoids blind 'git add .')." },
      { flag: "-m \"<message>\"", description: "Assigns a clear, imperative commit message following conventional standards." }
    ],
    stdout: [
      "[feat/fix-nav-contrast a7c8e91] fix(nav): improve contrast ratio for WCAG AA compliance",
      " 2 files changed, 28 insertions(+), 8 deletions(-)",
    ],
    explain: "Staging lets you curate precisely which files belong in the snapshot. Committing permanently seals this snapshot with an author name, timestamp, and explanation in your local repository.",
    underTheHood: [
      "Git creates compressed blob objects for staged files in .git/objects/.",
      "Constructs a tree object reflecting directory state and links it to commit a7c8e91.",
      "Advances the branch pointer .git/refs/heads/feat/fix-nav-contrast to commit a7c8e91.",
    ],
    proTip: "Follow the Conventional Commits specification: 'type(scope): summary'. Use imperative verbs ('Add feature', not 'Added feature'). Keep commits atomic.",
    pitfall: "Committing with vague messages like 'fixed stuff' or 'update'. Maintainers rely on clear commit logs when running git bisect to diagnose regressions.",
    learnModuleId: "09",
    learnModuleTitle: "Module 09: Writing a good commit message",
    learnLessonSummary: "Conventional Commits standard, writing informative summaries, and why atomic commits matter.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "feat/fix-nav-contrast" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Staged Snapshots",
      activeBranch: "feat/fix-nav-contrast",
      headCommit: "a7c8e91",
    },
  },
  {
    id: 7,
    stageBadge: "Stage 7: Push",
    title: "Push Branch to Your Fork (Origin)",
    subtitle: "Upload your commit objects from your local computer to GitHub",
    command: "git push -u origin feat/fix-nav-contrast",
    commandExplanation: "Uploads commits to your remote fork ('origin') and sets up remote branch tracking.",
    commandFlags: [
      { flag: "-u (--set-upstream)", description: "Links local branch to origin/feat/fix-nav-contrast for easy subsequent pulls/pushes." },
      { flag: "origin", description: "The destination remote (your personal GitHub fork)." },
      { flag: "feat/fix-nav-contrast", description: "The specific branch to push." }
    ],
    stdout: [
      "Enumerating objects: 7, done.",
      "Counting objects: 100% (7/7), done.",
      "Compressing objects: 100% (4/4), done.",
      "Writing objects: 100% (4/4), 582 bytes | 582.00 KiB/s, done.",
      "Total 4 (delta 3), reused 0 (delta 0), pack-reused 0",
      "To https://github.com/your-username/project.git",
      " * [new branch]      feat/fix-nav-contrast -> feat/fix-nav-contrast",
      "branch 'feat/fix-nav-contrast' set up to track 'origin/feat/fix-nav-contrast'.",
    ],
    explain: "Your commits are still only on your local hard drive. Pushing uploads your commit objects to your fork on GitHub (origin). The original upstream repository is still completely untouched.",
    underTheHood: [
      "Client and server negotiate missing packfiles via SSH/HTTPS transfer.",
      "Origin server unpacks objects and validates commit integrity.",
      "Updates refs/heads/feat/fix-nav-contrast on GitHub.",
    ],
    proTip: "The '-u' flag configures upstream tracking. Once configured, you can simply type 'git push' or 'git pull' without typing remote and branch names.",
    pitfall: "Accidentally pushing to 'upstream' directly ('git push upstream feat/...'). Unless you are a repository owner with write permissions, this will be rejected.",
    learnModuleId: "10",
    learnModuleTitle: "Module 10: Pushing to your fork",
    learnLessonSummary: "Remote branch tracking, resolving authentication challenges, and understanding push mechanics.",
    highlight: ["local", "origin"],
    edge: { from: "local", to: "origin", label: "Push Packfile", active: true },
    graph: {
      upstream: baseGraph,
      origin: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "feat/fix-nav-contrast" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2", "c3"] },
        ],
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "feat/fix-nav-contrast" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "feat/fix-nav-contrast",
      headCommit: "a7c8e91",
    },
  },
  {
    id: 8,
    stageBadge: "Stage 8: Pull Request",
    title: "Open a Pull Request on Upstream",
    subtitle: "Ask the maintainers to review and pull your commits into canonical main",
    command: "gh pr create --repo original-owner/project --base main --head your-username:feat/fix-nav-contrast --title \"fix(nav): improve contrast ratio\" --body \"Fixes #142\"",
    commandExplanation: "Submits a Pull Request to the upstream project linking your fork's branch into upstream main.",
    commandFlags: [
      { flag: "--base main", description: "The destination branch in the upstream project." },
      { flag: "--head <user>:<branch>", description: "The source branch residing in your personal fork." },
      { flag: "--body", description: "Markdown text describing changes, motivations, and closing keywords ('Fixes #142')." }
    ],
    stdout: [
      "Creating pull request for your-username:feat/fix-nav-contrast into main in original-owner/project",
      "https://github.com/original-owner/project/pull/482",
      "✓ Pull Request #482 created successfully!",
    ],
    explain: "A Pull Request (PR) asks the original project maintainers to review your proposed changes. GitHub automatically compares the differences, runs automated CI checks, and provides an interface for discussion.",
    underTheHood: [
      "GitHub generates a three-way diff between upstream/main and origin/feat/fix-nav-contrast.",
      "Fires webhook events to trigger continuous integration (CI) tests and linter pipelines.",
      "Assigns designated CODEOWNERS or reviewers according to repository rules.",
    ],
    proTip: "Always link related issues in your PR description using keywords like 'Fixes #142' or 'Closes #142'. When your PR merges, GitHub automatically closes the corresponding issue.",
    pitfall: "Submitting massive PRs that change unrelated files. Small, single-purpose PRs with fewer than 200 lines get reviewed and merged significantly faster.",
    learnModuleId: "11",
    learnModuleTitle: "Module 11: Opening a Pull Request",
    learnLessonSummary: "Writing high-converting PR descriptions, filling PR templates, linking issues, and passing CI checks.",
    highlight: ["origin", "upstream"],
    edge: { from: "origin", to: "upstream", label: "Pull Request #482", active: true },
    graph: {
      upstream: baseGraph,
      origin: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "feat/fix-nav-contrast" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2", "c3"] },
        ],
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "feat/fix-nav-contrast" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feat/fix-nav-contrast", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "feat/fix-nav-contrast",
      headCommit: "a7c8e91",
    },
  },
  {
    id: 9,
    stageBadge: "Stage 9: Merge & Clean",
    title: "Address Feedback, Merge & Clean Up",
    subtitle: "Complete review iterations, pull merged commits into main, and tidy up",
    command: "git checkout main && git pull upstream main && git branch -d feat/fix-nav-contrast",
    commandExplanation: "Switches back to main, downloads the merged commit from upstream, and safely removes the local feature branch.",
    commandFlags: [
      { flag: "checkout main", description: "Switches local HEAD back to the primary branch." },
      { flag: "pull upstream main", description: "Brings the newly merged commits into your local main." },
      { flag: "-d <branch>", description: "Deletes the local branch safely now that its commits have been incorporated." }
    ],
    stdout: [
      "Switched to branch 'main'",
      "Updating 3f8d2c1..a7c8e91",
      "Fast-forward",
      " src/components/Navbar.tsx | 18 +++++++++++++++---",
      " src/styles/theme.css      | 18 +++++++++++++-----",
      " 2 files changed, 28 insertions(+), 8 deletions(-)",
      "Deleted branch feat/fix-nav-contrast (was a7c8e91).",
    ],
    explain: "Review comments are completely routine in open source! Once the maintainers approve and merge your PR, you pull the latest upstream main branch and delete your feature branch to keep your environment pristine.",
    underTheHood: [
      "Upstream repository incorporates commit a7c8e91 into upstream/main.",
      "Local main advances to include the new commit via fast-forward.",
      "Branch reference in .git/refs/heads/feat/fix-nav-contrast is safely deleted.",
    ],
    proTip: "Delete the remote branch on GitHub after merge as well ('git push origin --delete feat/fix-nav-contrast' or click the 'Delete branch' button on the PR).",
    pitfall: "Continuing to develop new features on the old feature branch after it has merged. Always start future tasks from an updated main branch.",
    learnModuleId: "12",
    learnModuleTitle: "Module 12: The Code Review",
    learnLessonSummary: "Navigating review feedback, pushing incremental fixes, and post-merge maintenance routines.",
    highlight: ["upstream", "local"],
    edge: { from: "upstream", to: "local", label: "Fast-forward Sync", active: true },
    graph: {
      upstream: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "main" },
        ],
        branches: [{ name: "main", commits: ["c1", "c2", "c3"] }],
      },
      origin: {
        ...baseGraph,
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", hash: "a7c8e91", message: "fix(nav): improve contrast ratio", branch: "main" },
        ],
        branches: [{ name: "main", commits: ["c1", "c2", "c3"] }],
        remotes: [
          { name: "origin", url: "https://github.com/your-username/project.git" },
          { name: "upstream", url: "https://github.com/original-owner/project.git" },
        ],
      },
    },
    localState: {
      workingDirectory: "Clean",
      stagingArea: "Empty",
      activeBranch: "main",
      headCommit: "a7c8e91",
    },
  },
];
