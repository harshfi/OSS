import { z } from "zod";

export const categorySchema = z.enum([
  "Commits", "Branches", "Remotes & forks", "Pushing & auth", 
  "Conflicts & rebase", "Files & secrets", "Setup & errors", "Pull requests"
]);

export const rescueSituationSchema = z.object({
  id: z.string(),
  title: z.string(),
  chipLabel: z.string(),
  category: categorySchema,
  keywords: z.array(z.string()),
  severity: z.enum(["info", "warning", "danger"]),
  whyItHappens: z.string(),
  beforeYouStart: z.string().optional(),
  banner: z.string().optional(),
  errorPatterns: z.array(z.string()).optional(),
  related: z.array(z.string()).optional(),
  steps: z.array(
    z.object({
      text: z.string(),
      command: z.string().optional(),
      note: z.string().optional(),
      destructive: z.boolean().optional(),
      when: z.object({
        pushed: z.boolean().optional(),
        prOpen: z.boolean().optional()
      }).optional(),
      osNotes: z.object({
        windows: z.string().optional(),
        mac: z.string().optional(),
        linux: z.string().optional()
      }).optional()
    })
  ),
  verify: z.string().optional(),
  labScenarioId: z.string().optional(),
  relatedModuleSlug: z.string().optional(),
});
export type RescueSituation = z.infer<typeof rescueSituationSchema>;

export const wizardNodeSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.object({
    label: z.string(),
    next: z.string().optional(),
    scenarioId: z.string().optional(),
    setContext: z.object({ pushed: z.boolean().optional(), prOpen: z.boolean().optional() }).optional()
  }))
});
export type WizardNode = z.infer<typeof wizardNodeSchema>;

export const situationsData: RescueSituation[] = [
  // 1-10: Existing Migrated & New Commits
  {
    id: "committed-to-main",
    title: "Committed to main",
    chipLabel: "Committed to main",
    category: "Commits",
    keywords: ["committed to main", "pushed to main", "wrong branch", "oops", "main branch commit"],
    severity: "warning",
    whyItHappens: "You made commits on main instead of a feature branch.",
    beforeYouStart: "Commit or stash any unsaved changes.",
    errorPatterns: ["On branch (main|master)[\\s\\S]*Your branch is ahead of"],
    steps: [
      { text: "Check out main", command: "git checkout main" },
      { text: "Saves your commits on a new branch", command: "git branch <your-branch>" },
      { text: "Fetch upstream changes", command: "git fetch upstream" },
      { text: "Makes main match the original again", command: "git reset --hard upstream/main", destructive: true },
      { text: "Switch to your new branch", command: "git checkout <your-branch>" },
      { text: "Push the branch to origin", command: "git push -u origin <your-branch>" },
      { text: "Only if you already pushed those commits to your fork's main:", command: "git push origin main --force-with-lease", note: "Warning: if a PR is already open from main, the force-push removes commits from it. Close that PR and open a new one from your branch.", when: { pushed: true }, destructive: true },
    ],
    verify: "Check with `git status` and `git log --oneline` (main should match upstream/main).",
    labScenarioId: "fix-commit-on-main",
  },
  {
    id: "wrong-commit-message",
    title: "Wrong commit message",
    chipLabel: "Wrong commit message",
    category: "Commits",
    keywords: ["typo in commit", "wrong message", "change commit msg"],
    severity: "info",
    whyItHappens: "You made a typo in your last commit message or need to follow a convention.",
    steps: [
      { text: "Amend the commit message", command: 'git commit --amend -m "<commit-message>"' },
      { text: "Only if already pushed:", command: "git push --force-with-lease", destructive: true, note: "Tip: for this project use Conventional Commits, e.g. fix(orders): reduce stock after order is placed.", when: { pushed: true } }
    ],
  },
  {
    id: "forgot-a-file",
    title: "Forgot a file",
    chipLabel: "Forgot a file",
    category: "Files & secrets",
    keywords: ["forgot file", "missed file", "add to commit"],
    severity: "info",
    whyItHappens: "You committed but realized a file was left out.",
    steps: [
      { text: "Stage the forgotten file", command: "git add <file>" },
      { text: "Amend the commit without changing the message", command: "git commit --amend --no-edit", note: "Or you can omit --no-edit to change the message." },
      { text: "Only if already pushed:", command: "git push --force-with-lease", destructive: true, when: { pushed: true } }
    ],
  },
  {
    id: "pushed-a-secret",
    title: "Pushed a secret",
    chipLabel: "Pushed a secret",
    category: "Files & secrets",
    keywords: ["leaked key", "pushed password", "secret in git", "api key"],
    severity: "danger",
    banner: "Revoke or rotate the key/password IMMEDIATELY. Deleting the file or rewriting history is not enough because it may already have been copied.",
    whyItHappens: "You accidentally pushed an API key or password to a public repository.",
    steps: [
      { text: "Rotate or revoke the secret at the provider." },
      { text: "Stop tracking the file without deleting it locally", command: "git rm --cached <file>", destructive: true },
      { text: "Add the file to .gitignore and commit that." },
      { text: "If this is for a graded assignment, tell your mentor right away." }
    ],
  },
  {
    id: "merge-conflict",
    title: "Merge conflict",
    chipLabel: "Merge conflict",
    category: "Conflicts & rebase",
    keywords: ["conflict", "cannot merge", "rebase conflict"],
    severity: "warning",
    whyItHappens: "You and someone else changed the same lines. You'll see conflict markers (<<<<<<< HEAD / ======= / >>>>>>>).",
    errorPatterns: ["CONFLICT \\(", "Automatic merge failed", "fix conflicts and then commit"],
    steps: [
      { text: "Edit the file so it holds the correct final version and delete the <, =, and > marker lines." },
      { text: "Stage the resolved file", command: "git add <file>" },
      { text: "Continue the rebase (or commit if merging)", command: "git rebase --continue", note: "Escape hatch: `git rebase --abort` or `git merge --abort` returns you to where you started." }
    ],
    labScenarioId: "resolve-merge-conflict",
  },
  {
    id: "need-to-squash",
    title: "Need to squash commits",
    chipLabel: "Need to squash",
    category: "Commits",
    keywords: ["squash", "combine commits", "too many commits", "interactive rebase"],
    severity: "info",
    whyItHappens: "The maintainer asked you to combine several small commits into one.",
    steps: [
      { text: "Start an interactive rebase (change <n> to your number of commits)", command: "git rebase -i HEAD~<n>" },
      { text: "In the editor, keep 'pick' on the first line and change the others to 'squash' (or 's'). Save and close." },
      { text: "Write one final commit message, save again." },
      { text: "Force push if already pushed", command: "git push --force-with-lease", destructive: true, when: { pushed: true } }
    ],
    labScenarioId: "squash-commits",
  },
  {
    id: "undo-local-changes",
    title: "Undo local changes",
    chipLabel: "Undo local changes",
    category: "Commits",
    keywords: ["undo changes", "discard local", "revert uncommitted", "stash"],
    severity: "info",
    whyItHappens: "You want to undo some uncommitted work or temporarily put it aside.",
    steps: [
      { text: "Discard changes to one unstaged file", command: "git restore <file>", destructive: true },
      { text: "Unstage a file but keep the changes", command: "git restore --staged <file>" },
      { text: "Undo last commit but keep the changes", command: "git reset --soft HEAD~<n>" },
      { text: "Put work aside temporarily", command: "git stash" },
      { text: "Later, retrieve the stashed work", command: "git stash pop" }
    ],
  },
  {
    id: "lost-a-commit",
    title: "Lost a commit",
    chipLabel: "Lost a commit",
    category: "Commits",
    keywords: ["lost commit", "missing commit", "reflog", "recover commit"],
    severity: "info",
    whyItHappens: "You reset or switched and a commit seems gone. Git usually still has it.",
    steps: [
      { text: "List recent positions to find the commit hash", command: "git reflog" },
      { text: "Bring it back on a new branch", command: "git checkout -b <new-name> <hash>" }
    ],
  },
  {
    id: "pr-has-extra-changes",
    title: "PR has extra changes",
    chipLabel: "PR has extra changes",
    category: "Pull requests",
    keywords: ["extra commits", "pull request mixed", "stacked PRs", "cherry-pick"],
    severity: "warning",
    whyItHappens: "You pushed to main, or stacked two fixes on one branch, so the PR contains commits from other work. (Rule: one branch = one issue, always start from an up-to-date main.)",
    steps: [
      { text: "Fetch upstream changes", command: "git fetch upstream" },
      { text: "Create a fresh branch from the up-to-date main", command: "git checkout -b fix/clean upstream/main" },
      { text: "Cherry-pick only your specific commits", command: "git cherry-pick <hash>", note: "Find your commit hashes with `git log --oneline`. Repeat for each commit." },
      { text: "Push the new branch", command: "git push -u origin fix/clean" },
      { text: "Open a new PR from fix/clean and close the old one." }
    ],
  },
  {
    id: "branch-behind-main",
    title: "Branch behind main",
    chipLabel: "Branch behind main",
    category: "Pull requests",
    keywords: ["rebase branch", "update branch", "behind main", "sync fork"],
    severity: "info",
    whyItHappens: "The original main moved ahead while your PR was open (or the maintainer asked you to 'rebase on main').",
    steps: [
      { text: "Check out your branch", command: "git checkout <your-branch>" },
      { text: "Fetch upstream changes", command: "git fetch upstream" },
      { text: "Rebase onto the latest main", command: "git rebase upstream/main", note: "Rebasing rewrites history, so only rebase your own branches, never main." },
      { text: "Force push since history changed", command: "git push --force-with-lease", destructive: true, when: { pushed: true } }
    ],
  },
  
  // NEW SCENARIOS (11 - 34)
  {
    id: "wrong-branch-commits",
    title: "Wrong branch commits",
    chipLabel: "Wrong branch commits",
    category: "Commits",
    keywords: ["pushed wrong branch", "wrong branch", "committed on wrong branch", "oops main"],
    severity: "warning",
    whyItHappens: "You committed on a feature branch but meant another one.",
    steps: [
      { text: "Check out the correct branch", command: "git checkout <correct-branch>" },
      { text: "Cherry-pick the commit", command: "git cherry-pick <hash>", note: "Repeat per commit, find hashes with `git log --oneline`" },
      { text: "Check out the wrong branch", command: "git checkout <wrong-branch>" },
      { text: "Hard reset the wrong branch to discard those commits", command: "git reset --hard HEAD~<n>", destructive: true, note: "Destructive: discards those commits and uncommitted changes there; make a backup branch first." }
    ],
  },
  {
    id: "undo-pushed-commit",
    title: "Undo pushed commit",
    chipLabel: "Undo pushed commit",
    category: "Commits",
    keywords: ["revert", "undo pushed", "rollback", "revert pushed commit"],
    severity: "info",
    whyItHappens: "You pushed a commit that must be undone. Use revert, not reset, because others may have pulled it.",
    steps: [
      { text: "Find the commit hash", command: "git log --oneline" },
      { text: "Revert the commit", command: "git revert <hash>" },
      { text: "Push the revert", command: "git push" }
    ],
  },
  {
    id: "deleted-a-file",
    title: "Deleted a file",
    chipLabel: "Deleted a file",
    category: "Files & secrets",
    keywords: ["deleted file", "restore file", "recover file"],
    severity: "info",
    whyItHappens: "You deleted a file and want it back.",
    steps: [
      { text: "If not committed:", command: "git restore <file>" },
      { text: "If already committed:", command: "git restore --source=<hash>~1 -- <file>", note: "Needs Git 2.23+. Older Git: `git checkout <hash> -- <file>`." }
    ],
  },
  {
    id: "recover-deleted-branch",
    title: "Recover deleted branch",
    chipLabel: "Recover deleted branch",
    category: "Branches",
    keywords: ["deleted branch", "recover branch", "lost branch"],
    severity: "info",
    whyItHappens: "You deleted a branch and need it back.",
    steps: [
      { text: "Find the last commit of that branch", command: "git reflog" },
      { text: "Recreate the branch", command: "git branch <your-branch> <hash>" }
    ],
  },
  {
    id: "stuck-in-vim",
    title: "Stuck in Vim",
    chipLabel: "Stuck in Vim",
    category: "Setup & errors",
    keywords: ["vim", "editor", "stuck in editor", "cant exit", "how to exit vim"],
    severity: "info",
    whyItHappens: "Git opened a text editor (Vim) and you don't know how to exit.",
    errorPatterns: ["-- INSERT --"],
    steps: [
      { text: "Press Esc, type :wq and Enter to save and continue, or :q! to quit without saving." },
      { text: "To change your editor permanently to VS Code:", command: 'git config --global core.editor "code --wait"' }
    ],
  },
  {
    id: "detached-head",
    title: "Detached HEAD",
    chipLabel: "Detached HEAD",
    category: "Branches",
    keywords: ["detached head", "detached HEAD at"],
    severity: "warning",
    whyItHappens: "You checked out a specific commit instead of a branch. You are in 'HEAD detached' state.",
    errorPatterns: ["HEAD detached at", "detached HEAD"],
    steps: [
      { text: "To keep your work:", command: "git switch -c <your-branch>", note: "Needs Git 2.23+. Older Git: `git checkout -b <your-branch>`." },
      { text: "Or to leave without keeping:", command: "git switch main", note: "Needs Git 2.23+. Older Git: `git checkout main`." }
    ],
  },
  {
    id: "rename-branch",
    title: "Rename branch",
    chipLabel: "Rename branch",
    category: "Branches",
    keywords: ["rename branch", "change branch name"],
    severity: "info",
    whyItHappens: "Your branch name breaks the required pattern or you want to change it.",
    steps: [
      { text: "Rename the branch locally", command: "git branch -m <old-name> <new-name>" },
      { text: "Push the new branch", command: "git push -u origin <new-name>" },
      { text: "Delete the old branch from the remote", command: "git push origin --delete <old-name>", destructive: true, note: "Note: a PR opened from the old branch will close; open a new PR from the new branch." }
    ],
  },
  {
    id: "checkout-blocked",
    title: "Checkout blocked",
    chipLabel: "Checkout blocked",
    category: "Branches",
    keywords: ["overwritten by checkout", "checkout blocked", "switch blocked"],
    severity: "info",
    whyItHappens: "'Your local changes would be overwritten by checkout'. You have uncommitted changes that conflict with the branch you're trying to switch to.",
    errorPatterns: ["would be overwritten by (checkout|merge)", "commit your changes or stash them"],
    steps: [
      { text: "Option A: Stash your changes, switch, then pop them.", command: "git stash\ngit switch <your-branch>\ngit stash pop" },
      { text: "Option B: Commit your changes first, then switch." }
    ],
  },
  {
    id: "pr-wrong-base",
    title: "PR wrong base",
    chipLabel: "PR wrong base",
    category: "Pull requests",
    keywords: ["wrong base branch", "pr against wrong branch"],
    severity: "info",
    whyItHappens: "Your Pull Request is targeting the wrong branch (e.g. main instead of dev).",
    steps: [
      { text: "Open the PR on GitHub, click Edit next to the title, and change the base branch." },
      { text: "If it targets the wrong repository entirely, close it and open a new PR against the correct one." }
    ],
  },
  {
    id: "whole-file-changed",
    title: "Whole file changed",
    chipLabel: "Whole file changed",
    category: "Pull requests",
    keywords: ["whole file changed", "line endings", "CRLF", "LF", "all lines changed"],
    severity: "warning",
    whyItHappens: "Your diff shows every line changed. This is usually caused by line endings or auto-formatters.",
    steps: [
      { text: "Check the stats", command: "git diff --stat" },
      { text: "Discard the changes", command: "git restore <file>", destructive: true },
      { text: "Fix line endings (Windows)", command: "git config --global core.autocrlf true", osNotes: { windows: "Run this on Windows to handle CRLF correctly." } },
      { text: "Fix line endings (macOS/Linux)", command: "git config --global core.autocrlf input", osNotes: { mac: "Run this on macOS to handle LF correctly.", linux: "Run this on Linux to handle LF correctly." } },
      { text: "Also turn off 'format on save' in your editor unless the project uses it. Then redo your edit." }
    ],
  },
  {
    id: "cloned-original-not-fork",
    title: "Cloned original repo",
    chipLabel: "Cloned original repo",
    category: "Remotes & forks",
    keywords: ["cloned original", "cant push", "push original", "fork"],
    severity: "warning",
    whyItHappens: "You cloned the original repo, so you cannot push. You need to push to your fork instead.",
    steps: [
      { text: "Fork it on GitHub first." },
      { text: "Rename origin to upstream", command: "git remote rename origin upstream" },
      { text: "Add your fork as origin", command: "git remote add origin https://github.com/<you>/<repo>.git" },
      { text: "Verify remotes", command: "git remote -v" },
      { text: "Push to your fork", command: "git push -u origin <your-branch>" }
    ],
  },
  {
    id: "upstream-missing",
    title: "Upstream missing",
    chipLabel: "Upstream missing",
    category: "Remotes & forks",
    keywords: ["upstream missing", "no upstream", "does not appear to be a git repository"],
    severity: "info",
    whyItHappens: "'upstream does not appear to be a git repository'. You haven't added the original repository as a remote.",
    errorPatterns: ["'upstream' does not appear to be a git repository", "No such remote"],
    steps: [
      { text: "Add the upstream remote", command: "git remote add upstream https://github.com/<original-owner>/<repo>.git" },
      { text: "Verify remotes", command: "git remote -v" }
    ],
  },
  {
    id: "remote-origin-exists",
    title: "Remote origin exists",
    chipLabel: "Remote origin exists",
    category: "Remotes & forks",
    keywords: ["remote origin exists", "already exists"],
    severity: "info",
    whyItHappens: "'remote origin already exists'. You're trying to add a remote that is already defined.",
    errorPatterns: ["remote origin already exists"],
    steps: [
      { text: "Verify remotes", command: "git remote -v" },
      { text: "Change the URL instead of adding", command: "git remote set-url origin <fork-url>" }
    ],
  },
  {
    id: "push-403",
    title: "Push 403 / Denied",
    chipLabel: "Push 403 / Denied",
    category: "Remotes & forks",
    keywords: ["403", "permission denied", "push 403"],
    severity: "warning",
    whyItHappens: "'Permission denied ... 403' means you are pushing to the original repo where you don't have write access.",
    errorPatterns: ["Permission to .+ denied to", "error: 403"],
    steps: [
      { text: "Verify remotes", command: "git remote -v", note: "origin must be YOUR fork." },
      { text: "If it's wrong, fix it", command: "git remote set-url origin https://github.com/<you>/<repo>.git" },
      { text: "Push to your fork", command: "git push -u origin <your-branch>" }
    ],
  },
  {
    id: "unrelated-histories",
    title: "Unrelated histories",
    chipLabel: "Unrelated histories",
    category: "Remotes & forks",
    keywords: ["unrelated histories", "refusing to merge"],
    severity: "warning",
    whyItHappens: "'refusing to merge unrelated histories' usually means a wrong remote or a fresh repo.",
    errorPatterns: ["refusing to merge unrelated histories"],
    steps: [
      { text: "First check your remotes", command: "git remote -v" },
      { text: "Only as a last resort and after asking a mentor:", command: "git pull <remote> <your-branch> --allow-unrelated-histories", destructive: true }
    ],
  },
  {
    id: "push-rejected",
    title: "Push rejected",
    chipLabel: "Push rejected",
    category: "Pushing & auth",
    keywords: ["push rejected", "failed to push", "Updates were rejected", "non-fast-forward"],
    severity: "warning",
    whyItHappens: "'failed to push some refs ... Updates were rejected' (also 'non-fast-forward', 'fetch first', 'have diverged').",
    errorPatterns: ["failed to push some refs", "Updates were rejected", "non-fast-forward", "fetch first", "have diverged"],
    steps: [
      { text: "Fetch and rebase", command: "git fetch origin\ngit rebase origin/<your-branch>\ngit push" },
      { text: "If you had already rewritten history:", command: "git push --force-with-lease", note: "Never plain --force.", destructive: true, when: { pushed: true } }
    ],
  },
  {
    id: "auth-failed",
    title: "Authentication failed",
    chipLabel: "Auth failed",
    category: "Pushing & auth",
    keywords: ["authentication failed", "password auth removed", "publickey"],
    severity: "warning",
    whyItHappens: "'Authentication failed' / password auth removed / 'Permission denied (publickey)'. GitHub no longer accepts your account password.",
    errorPatterns: ["Authentication failed", "Permission denied \\(publickey\\)", "password authentication was removed", "could not read Username"],
    steps: [
      { text: "Easiest: install GitHub CLI and run auth login (GitHub.com, HTTPS, web browser)", command: "gh auth login" },
      { text: "Alternatives: use a Personal Access Token or SSH keys. Then retry the push." }
    ],
  },
  {
    id: "no-upstream-branch",
    title: "No upstream branch",
    chipLabel: "No upstream branch",
    category: "Pushing & auth",
    keywords: ["no upstream branch", "set upstream"],
    severity: "info",
    whyItHappens: "'The current branch has no upstream branch'. Git doesn't know where to push.",
    errorPatterns: ["has no upstream branch"],
    steps: [
      { text: "Set the upstream branch and push", command: "git push -u origin <your-branch>" }
    ],
  },
  {
    id: "refspec-error",
    title: "Refspec error",
    chipLabel: "Refspec error",
    category: "Pushing & auth",
    keywords: ["refspec error", "does not match any", "src refspec"],
    severity: "info",
    whyItHappens: "'src refspec ... does not match any'. You have no commits yet or the branch name differs.",
    errorPatterns: ["src refspec .+ does not match any"],
    steps: [
      { text: "Check your current branch and commits", command: "git branch --show-current\ngit log --oneline" },
      { text: "Commit something first, then push", command: "git push -u origin <your-branch>" }
    ],
  },
  {
    id: "stuck-in-rebase",
    title: "Stuck in rebase",
    chipLabel: "Stuck in rebase",
    category: "Conflicts & rebase",
    keywords: ["rebase in progress", "stuck in rebase"],
    severity: "warning",
    whyItHappens: "Git status says 'rebase in progress'. You are in the middle of resolving conflicts during a rebase.",
    errorPatterns: ["rebase in progress", "You are currently rebasing"],
    steps: [
      { text: "Fix the conflicted files, stage them, and continue", command: "git add <file>\ngit rebase --continue" },
      { text: "To give up safely:", command: "git rebase --abort" },
      { text: "To drop the current commit (use only if you are sure):", command: "git rebase --skip", destructive: true }
    ],
  },
  {
    id: "committed-node-modules",
    title: "Committed node_modules",
    chipLabel: "Committed node_modules",
    category: "Files & secrets",
    keywords: ["committed node modules", "node_modules", "remove node_modules"],
    severity: "warning",
    whyItHappens: "You accidentally committed the node_modules directory which is huge.",
    errorPatterns: ["(new file|modified):\\s+\\S*node_modules/"],
    steps: [
      { text: "Remove the folder from Git cache", command: "git rm -r --cached node_modules", destructive: true },
      { text: "Add node_modules/ to .gitignore and stage it", command: "git add .gitignore" },
      { text: "Commit the removal", command: 'git commit -m "chore: stop tracking node_modules"' },
      { text: "Note: if already pushed, the files stay in history, tell your mentor." }
    ],
  },
  {
    id: "committed-env-not-pushed",
    title: "Committed .env (not pushed)",
    chipLabel: "Committed .env (not pushed)",
    category: "Files & secrets",
    keywords: ["committed .env", "env file"],
    severity: "danger",
    banner: "If it WAS pushed, go to pushed-a-secret and rotate the key.",
    whyItHappens: "You committed your .env file but haven't pushed it yet.",
    errorPatterns: ["(new file|modified):\\s+\\S*\\.env\\b"],
    related: ["pushed-a-secret"],
    steps: [
      { text: "Remove the file from Git cache", command: "git rm --cached .env", destructive: true },
      { text: "Add .env to .gitignore and amend the commit (if it was in the last commit)", command: "git commit --amend --no-edit" }
    ],
  },
  {
    id: "identity-missing",
    title: "Identity missing",
    chipLabel: "Identity missing",
    category: "Setup & errors",
    keywords: ["identity missing", "author identity unknown", "tell me who you are"],
    severity: "info",
    whyItHappens: "'Please tell me who you are' / 'Author identity unknown'. Git doesn't know your name and email.",
    errorPatterns: ["Please tell me who you are", "Author identity unknown", "unable to auto-detect email"],
    steps: [
      { text: "Configure your name and email", command: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"', note: "Use the same email as your GitHub account so commits link to your profile." }
    ],
  },
  {
    id: "not-a-git-repo",
    title: "Not a git repo",
    chipLabel: "Not a git repo",
    category: "Setup & errors",
    keywords: ["not a git repository", "fatal not a git repository"],
    severity: "info",
    whyItHappens: "'not a git repository'. You are in the wrong folder.",
    errorPatterns: ["not a git repository"],
    steps: [
      { text: "Look around", command: "pwd\nls", osNotes: { windows: "Use `cd` instead of `pwd` to print working directory on Windows Command Prompt." } },
      { text: "CD into the project folder that contains the .git folder, or clone it if you have not yet." }
    ],
  },
];

export const wizardNodes: WizardNode[] = [
  {
    id: "start",
    question: "What kind of problem is it?",
    options: [
      { label: "I committed something I should not have", next: "committed-wrong" },
      { label: "A push, pull or login failed", next: "push-pull-failed" },
      { label: "My pull request looks wrong", next: "pr-wrong" },
      { label: "I am stuck in the middle of something", next: "stuck" },
      { label: "I lost or deleted something", next: "lost" },
      { label: "Setup problem", next: "setup" }
    ]
  },
  {
    id: "committed-wrong",
    question: "Which of these best describes what you committed?",
    options: [
      { label: "On main instead of a feature branch", next: "pushed-check-commits-main" },
      { label: "On the wrong feature branch", next: "pushed-check-commits-branch" },
      { label: "Wrong commit message", next: "pushed-check-msg" },
      { label: "Forgot a file", next: "pushed-check-forgot" },
      { label: "A secret or .env file", next: "pushed-check-secret" },
      { label: "node_modules", scenarioId: "committed-node-modules" }
    ]
  },
  { id: "pushed-check-commits-main", question: "Have you pushed it?", options: [ { label: "Yes", scenarioId: "committed-to-main", setContext: { pushed: true } }, { label: "No", scenarioId: "committed-to-main", setContext: { pushed: false } } ] },
  { id: "pushed-check-commits-branch", question: "Have you pushed it?", options: [ { label: "Yes", scenarioId: "wrong-branch-commits", setContext: { pushed: true } }, { label: "No", scenarioId: "wrong-branch-commits", setContext: { pushed: false } } ] },
  { id: "pushed-check-msg", question: "Have you pushed it?", options: [ { label: "Yes", scenarioId: "wrong-commit-message", setContext: { pushed: true } }, { label: "No", scenarioId: "wrong-commit-message", setContext: { pushed: false } } ] },
  { id: "pushed-check-forgot", question: "Have you pushed it?", options: [ { label: "Yes", scenarioId: "forgot-a-file", setContext: { pushed: true } }, { label: "No", scenarioId: "forgot-a-file", setContext: { pushed: false } } ] },
  { id: "pushed-check-secret", question: "Have you pushed it?", options: [ { label: "Yes", scenarioId: "pushed-a-secret", setContext: { pushed: true } }, { label: "No", scenarioId: "committed-env-not-pushed", setContext: { pushed: false } } ] },
  
  {
    id: "push-pull-failed",
    question: "What does the error say?",
    options: [
      { label: "failed to push some refs / Updates were rejected", scenarioId: "push-rejected" },
      { label: "has no upstream branch", scenarioId: "no-upstream-branch" },
      { label: "error: 403 / Permission denied", scenarioId: "push-403" },
      { label: "Authentication failed", scenarioId: "auth-failed" },
      { label: "Something else", next: "paste-box" } // special fallback
    ]
  },
  {
    id: "pr-wrong",
    question: "What looks wrong in your PR?",
    options: [
      { label: "It has extra commits that shouldn't be there", scenarioId: "pr-has-extra-changes" },
      { label: "It's against the wrong base branch or repo", scenarioId: "pr-wrong-base" },
      { label: "I was asked to squash my commits", scenarioId: "need-to-squash" },
      { label: "It's behind main / needs a rebase", scenarioId: "branch-behind-main" },
      { label: "Whole files show as changed (line endings)", scenarioId: "whole-file-changed" }
    ]
  },
  {
    id: "stuck",
    question: "What are you stuck in?",
    options: [
      { label: "Merge conflict", scenarioId: "merge-conflict" },
      { label: "Rebase in progress", scenarioId: "stuck-in-rebase" },
      { label: "Detached HEAD", scenarioId: "detached-head" },
      { label: "Vim editor (can't exit)", scenarioId: "stuck-in-vim" },
      { label: "Checkout blocked", scenarioId: "checkout-blocked" }
    ]
  },
  {
    id: "lost",
    question: "What did you lose?",
    options: [
      { label: "A commit", scenarioId: "lost-a-commit" },
      { label: "A branch", scenarioId: "recover-deleted-branch" },
      { label: "A file", scenarioId: "deleted-a-file" },
      { label: "I want to undo local changes", scenarioId: "undo-local-changes" }
    ]
  },
  {
    id: "setup",
    question: "What setup issue are you seeing?",
    options: [
      { label: "Cloned original instead of fork", scenarioId: "cloned-original-not-fork" },
      { label: "upstream missing", scenarioId: "upstream-missing" },
      { label: "remote origin exists", scenarioId: "remote-origin-exists" },
      { label: "identity missing (Please tell me who you are)", scenarioId: "identity-missing" },
      { label: "not a git repository", scenarioId: "not-a-git-repo" },
      { label: "refusing to merge unrelated histories", scenarioId: "unrelated-histories" }
    ]
  }
];
