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
  beginnerTitle: string;
  title: string;
  subtitle: string;
  analogy: string;
  safetyGuarantee: string;
  whereIsMyCode: string;
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
    stageBadge: "Step 1",
    beginnerTitle: "Make Your Safe Cloud Copy",
    title: "Fork the Upstream Repository",
    subtitle: "Create a personal duplicate of the project in your own GitHub account",
    analogy: "Like clicking 'Make a Copy' on a shared Google Doc. You get your very own document to experiment with, while the author's original file stays 100% untouched.",
    safetyGuarantee: "Zero risk! You cannot break the original project. You don't have write permissions there anyway, so it's impossible to harm it.",
    whereIsMyCode: "On GitHub in your account (no code downloaded to your laptop yet).",
    command: "gh repo fork original-owner/project --clone=false",
    commandExplanation: "Creates a copy in your personal GitHub account so you have full permission to push code and test ideas.",
    commandFlags: [
      { flag: "--clone=false", description: "Creates only the cloud copy on GitHub for now; we'll download it in the next step." }
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
    edge: { from: "upstream", to: "origin", label: "Cloud Copy (Fork)", active: true },
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
    stageBadge: "Step 2",
    beginnerTitle: "Download Code to Your Laptop",
    title: "Clone Your Fork to Your Computer",
    subtitle: "Download the files so you can edit them in VS Code or your favorite editor",
    analogy: "Like downloading the document to your laptop desktop. Now you can read the files, install packages, and write code even when you are offline.",
    safetyGuarantee: "All files sit privately on your computer. Nothing is sent to the internet until you decide to push.",
    whereIsMyCode: "On your laptop's hard drive and in your cloud fork.",
    command: "git clone https://github.com/your-username/project.git && cd project",
    commandExplanation: "Downloads the complete project files and folder structure from your GitHub fork onto your laptop.",
    commandFlags: [
      { flag: "git clone <url>", description: "Downloads all files, commit history, and branches." },
      { flag: "cd project", description: "Enters the project folder on your computer." }
    ],
    stdout: [
      "Cloning into 'project'...",
      "remote: Enumerating objects: 1240, done.",
      "remote: Counting objects: 100% (342/342), done.",
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
    pitfall: "Cloning the original author's repository instead of your fork. If you clone upstream, your remote 'origin' will point to the original repo, preventing you from pushing your branches.",
    learnModuleId: "05",
    learnModuleTitle: "Module 05: Forking & Cloning",
    learnLessonSummary: "Complete guide on Git clones, SSH vs HTTPS, and local workspace directory architecture.",
    highlight: ["origin", "local"],
    edge: { from: "origin", to: "local", label: "Download (Clone)", active: true },
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
    stageBadge: "Step 3",
    beginnerTitle: "Connect to Original Project",
    title: "Connect the Upstream Remote",
    subtitle: "Give your laptop a link to the original project so you can receive future updates",
    analogy: "Like bookmarking the original author's website. Whenever they publish new improvements, you can grab them with a single click so your laptop never falls behind.",
    safetyGuarantee: "This link is strictly read-only. It only pulls updates down to you; it can never push or alter the original project.",
    whereIsMyCode: "On your laptop, now linked to both your fork and the original repo.",
    command: "git remote add upstream https://github.com/original-owner/project.git",
    commandExplanation: "Tells your local Git about the original project (called 'upstream') so you can sync future bug fixes and features.",
    commandFlags: [
      { flag: "remote add", description: "Registers a new remote web address in your project settings." },
      { flag: "upstream", description: "Standard community nickname for the original project repository." }
    ],
    stdout: [
      "$ git remote -v",
      "origin    https://github.com/your-username/project.git (fetch & push)",
      "upstream  https://github.com/original-owner/project.git (fetch only)",
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
    edge: { from: "local", to: "upstream", label: "Sync Link (Upstream)", active: true },
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
    stageBadge: "Step 4",
    beginnerTitle: "Create a Dedicated Workspace",
    title: "Sync Main & Create Feature Branch",
    subtitle: "Never work directly on main; create an isolated branch for your fix",
    analogy: "Like placing a sheet of tracing paper over the original blueprint. You sketch your changes on the tracing paper, keeping the original blueprint 100% clean and untouched.",
    safetyGuarantee: "Your 'main' branch stays pristine. If you make a mistake on your feature branch, you can delete it with zero risk.",
    whereIsMyCode: "On your laptop, inside a new isolated branch.",
    command: "git checkout main && git pull upstream main && git checkout -b feat/fix-nav-contrast",
    commandExplanation: "Grabs any fresh updates from the project, then creates a new draft branch called 'feat/fix-nav-contrast'.",
    commandFlags: [
      { flag: "pull upstream main", description: "Brings any newly merged commits into your local copy." },
      { flag: "-b <branch-name>", description: "Creates a brand new branch and switches to it immediately." }
    ],
    stdout: [
      "Switched to branch 'main'",
      "Already up to date with upstream/main.",
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
    stageBadge: "Step 5",
    beginnerTitle: "Write Code in Your Editor",
    title: "Implement Your Changes & Verify",
    subtitle: "Open VS Code, edit the files, and run tests locally",
    analogy: "Writing the draft of your essay. You can edit paragraphs, fix typos, and preview the results until you're completely satisfied.",
    safetyGuarantee: "Your edits are 100% private on your laptop. No one can see them yet, and you haven't uploaded anything.",
    whereIsMyCode: "Modified only in your laptop's editor (working directory).",
    command: "git status && git diff",
    commandExplanation: "Shows you exactly which files you changed and what lines were added or removed.",
    commandFlags: [
      { flag: "git status", description: "Shows files you have modified or created." },
      { flag: "git diff", description: "Shows green (+) additions and red (-) deletions in your files." }
    ],
    stdout: [
      "On branch feat/fix-nav-contrast",
      "Changes not staged for commit:",
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
    stageBadge: "Step 6",
    beginnerTitle: "Package Your Changes",
    title: "Stage Files & Create Atomic Commit",
    subtitle: "Seal your changes into a permanent snapshot with a friendly message",
    analogy: "Like hitting a video game save checkpoint and writing a sticky note explaining what you accomplished. You can always rewind back to this moment.",
    safetyGuarantee: "This snapshot is saved exclusively on your laptop's local Git history. Still zero cloud exposure.",
    whereIsMyCode: "Committed into your laptop's local Git history.",
    command: "git add src/components/Navbar.tsx src/styles/theme.css && git commit -m \"fix(nav): improve contrast ratio for WCAG AA compliance\"",
    commandExplanation: "Puts the modified files into the 'staging box', then takes a permanent snapshot labeled with your message.",
    commandFlags: [
      { flag: "git add <files>", description: "Selects specific files to include in this snapshot." },
      { flag: "-m \"<message>\"", description: "Attaches a clear summary of what this snapshot does." }
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
    stageBadge: "Step 7",
    beginnerTitle: "Upload to Your GitHub Fork",
    title: "Push Branch to Your Fork (Origin)",
    subtitle: "Send your local commits up to your personal cloud repository on GitHub",
    analogy: "Like uploading your saved document up to your personal Google Drive or cloud backup. Now your work is safely backed up on GitHub.",
    safetyGuarantee: "You are uploading only to YOUR personal fork. The original project is still untouched.",
    whereIsMyCode: "On your laptop AND safely backed up in your GitHub fork.",
    command: "git push -u origin feat/fix-nav-contrast",
    commandExplanation: "Uploads your feature branch and its commits from your laptop to your GitHub account ('origin').",
    commandFlags: [
      { flag: "-u", description: "Links your laptop branch to your GitHub branch for quick future pushes." },
      { flag: "origin", description: "Your personal GitHub fork (the target destination)." }
    ],
    stdout: [
      "Enumerating objects: 7, done.",
      "Writing objects: 100% (4/4), 582 bytes, done.",
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
    edge: { from: "local", to: "origin", label: "Upload (Push)", active: true },
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
    stageBadge: "Step 8",
    beginnerTitle: "Ask Maintainers to Review",
    title: "Open a Pull Request on Upstream",
    subtitle: "Politely submit your work so the project owners can review and merge it",
    analogy: "Like sending a message to the original document author: 'Hey! I found this issue and drafted a clean fix on my copy. Would you like to review and include it in your project?'",
    safetyGuarantee: "The maintainers review every line before accepting. Nothing changes in the official project until they click 'Approve & Merge'.",
    whereIsMyCode: "Under review on GitHub's official Pull Request page.",
    command: "gh pr create --repo original-owner/project --base main --head your-username:feat/fix-nav-contrast --title \"fix(nav): improve contrast ratio\" --body \"Fixes #142\"",
    commandExplanation: "Opens a Pull Request proposing to merge your branch into the original project's main branch.",
    commandFlags: [
      { flag: "--base main", description: "The destination branch in the original project." },
      { flag: "--head <user>:<branch>", description: "Your branch residing in your personal fork." },
      { flag: "--body", description: "Your friendly explanation of what you fixed and why." }
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
    edge: { from: "origin", to: "upstream", label: "Propose (Pull Request #482)", active: true },
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
    stageBadge: "Step 9",
    beginnerTitle: "Merged & Celebrated!",
    title: "Address Feedback, Merge & Clean Up",
    subtitle: "The maintainers approve and merge your PR into the official project!",
    analogy: "The author accepts your draft! Your changes are now woven into the official book used by thousands or millions of developers worldwide.",
    safetyGuarantee: "Your work is now permanent in the project. You can safely delete your temporary branch.",
    whereIsMyCode: "Official part of the upstream codebase for everyone to use!",
    command: "git checkout main && git pull upstream main && git branch -d feat/fix-nav-contrast",
    commandExplanation: "Switches back to main, pulls down the newly merged code, and deletes your temporary feature branch.",
    commandFlags: [
      { flag: "checkout main", description: "Switches back to your local primary branch." },
      { flag: "pull upstream main", description: "Downloads your newly merged commit from the official project." },
      { flag: "-d <branch>", description: "Deletes your temporary feature branch cleanly." }
    ],
    stdout: [
      "Switched to branch 'main'",
      "Updating 3f8d2c1..a7c8e91",
      "Fast-forward",
      " src/components/Navbar.tsx | 18 +++++++++++++++---",
      " src/styles/theme.css      | 18 +++++++++++++-----",
      "Deleted branch feat/fix-nav-contrast.",
      "🎉 Congratulations! You are now an open-source contributor!",
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
    edge: { from: "upstream", to: "local", label: "Sync Merged Code (Pull)", active: true },
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
