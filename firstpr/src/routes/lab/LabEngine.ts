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
};

export type HandlerResult = {
  out: string[];
  state: RepoState;
  error?: string;
  hint?: string;
};

export type Scenario = {
  id: number;
  title: string;
  description: string;
  initialState: RepoState;
  checkGoal: (state: RepoState) => boolean;
  hints: string[];
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
    description: "Before you can commit, Git needs to know who you are. Configure your user.name and user.email.",
    initialState: createEmptyState(),
    checkGoal: (s) => !!s.config.name && !!s.config.email,
    hints: [
      "Use 'git config --global user.name \"Your Name\"'",
      "Use 'git config --global user.email \"email@example.com\"'",
    ],
  },
  {
    id: 2,
    title: "Clone and set upstream",
    description: "You've forked a repo to your account. Clone it, and then add the original repo as a remote called 'upstream'.",
    initialState: {
      ...createEmptyState(),
      config: { name: "User", email: "user@example.com" },
    },
    checkGoal: (s) => 
      s.cwd === "/home/user/repo" && 
      !!s.remotes["origin"] && 
      s.remotes["upstream"] === "https://github.com/original/repo.git",
    hints: [
      "Use 'git clone https://github.com/yourname/repo.git'",
      "Then 'cd repo'",
      "Use 'git remote add upstream https://github.com/original/repo.git'",
    ],
  },
  {
    id: 3,
    title: "Create branch, edit, commit",
    description: "Create a branch called 'feature', create a file 'hello.txt', add it, and commit it.",
    initialState: {
      ...createEmptyState(),
      cwd: "/home/user/repo",
      config: { name: "User", email: "user@example.com" },
      commits: { "c1": { msg: "Initial commit" } },
      branches: { main: ["c1"] },
      head: "main",
    },
    checkGoal: (s) => s.head === "feature" && s.branches["feature"]?.length === 2,
    hints: [
      "Create branch: 'git checkout -b feature'",
      "Create file: 'echo \"hello\" >> hello.txt'",
      "Stage file: 'git add hello.txt'",
      "Commit: 'git commit -m \"msg\"'",
    ],
  },
  {
    id: 4,
    title: "Push to origin",
    description: "You've made a commit on your feature branch. Push it to your fork on GitHub (origin).",
    initialState: {
      ...createEmptyState(),
      cwd: "/home/user/repo",
      config: { name: "User", email: "user@example.com" },
      commits: { "c1": { msg: "Init" }, "c2": { msg: "Add feature", parent: "c1" } },
      branches: { main: ["c1"], feature: ["c1", "c2"] },
      head: "feature",
      remotes: { origin: "https://github.com/user/repo.git" },
    },
    // We mock "pushed" state by tracking a remote branch or just by checking if the command was run.
    // For simplicity, let's track a remote branch in a special property or assume the goal is met by the command return.
    // Since checkGoal only looks at state, let's add `pushedBranches: Record<string, string[]>` to state.
    // We'll augment RepoState dynamically for lab purposes.
    checkGoal: (s) => (s as any).pushed === "feature",
    hints: ["Use 'git push origin feature'"],
  },
];

// Simplified engine that handles Git commands
export function executeCommand(cmdStr: string, state: RepoState): HandlerResult {
  const parts = cmdStr.trim().split(/\s+/);
  const out: string[] = [];
  let newState = { ...state };
  let error: string | undefined;

  if (parts[0] === "clear") {
    return { out: ["__CLEAR__"], state: newState };
  }

  if (parts[0] === "cd") {
    if (parts[1] === "repo") {
      newState.cwd = "/home/user/repo";
    } else if (parts[1] === "..") {
      newState.cwd = "/home/user";
    }
    return { out: [], state: newState };
  }

  if (parts[0] === "echo") {
    const fileIndex = parts.indexOf(">>");
    if (fileIndex !== -1 && parts[fileIndex + 1]) {
      const filename = parts[fileIndex + 1];
      newState.files = { ...newState.files, [filename]: "content" };
      newState.modified = [...newState.modified, filename];
    }
    return { out: [], state: newState };
  }

  if (parts[0] === "git") {
    const sub = parts[1];
    
    if (sub === "config") {
      if (parts.includes("user.name")) {
        const nameMatch = cmdStr.match(/user\.name\s+"?([^"]+)"?/);
        if (nameMatch) {
          newState.config = { ...newState.config, name: nameMatch[1] };
          return { out: [], state: newState };
        }
      } else if (parts.includes("user.email")) {
        const emailMatch = cmdStr.match(/user\.email\s+"?([^"]+)"?/);
        if (emailMatch) {
          newState.config = { ...newState.config, email: emailMatch[1] };
          return { out: [], state: newState };
        }
      }
    }

    if (sub === "clone") {
      const url = parts[2];
      if (url) {
        out.push(`Cloning into 'repo'...`);
        // In real lab we'd create a folder. For simplicity, we just add the remote.
        newState.remotes = { ...newState.remotes, origin: url };
      } else {
        error = "fatal: You must specify a repository to clone.";
      }
      return { out, state: newState, error };
    }

    if (sub === "remote") {
      if (parts[2] === "add") {
        const name = parts[3];
        const url = parts[4];
        if (name && url) {
          newState.remotes = { ...newState.remotes, [name]: url };
        }
      } else if (parts[2] === "-v") {
        for (const [name, url] of Object.entries(newState.remotes)) {
          out.push(`${name}\t${url} (fetch)`);
          out.push(`${name}\t${url} (push)`);
        }
      }
      return { out, state: newState };
    }

    if (sub === "checkout" || sub === "switch") {
      const isNew = parts.includes("-b") || parts.includes("-c");
      const branchName = parts[parts.length - 1];
      if (isNew) {
        newState.branches = { ...newState.branches, [branchName]: [...(newState.branches[newState.head] || [])] };
        newState.head = branchName;
        out.push(`Switched to a new branch '${branchName}'`);
      } else {
        if (newState.branches[branchName]) {
          newState.head = branchName;
          out.push(`Switched to branch '${branchName}'`);
        } else {
          error = `error: pathspec '${branchName}' did not match any file(s) known to git`;
        }
      }
      return { out, state: newState, error };
    }

    if (sub === "add") {
      // simulate staging everything
      if (parts.includes(".") || parts.includes("-A")) {
        newState.staged = [...new Set([...newState.staged, ...newState.modified])];
        newState.modified = [];
      } else {
        const filename = parts[2];
        if (newState.modified.includes(filename)) {
          newState.staged = [...newState.staged, filename];
          newState.modified = newState.modified.filter(f => f !== filename);
        }
      }
      return { out, state: newState };
    }

    if (sub === "commit") {
      if (newState.staged.length === 0) {
        out.push("nothing to commit, working tree clean");
        return { out, state: newState };
      }
      const msgMatch = cmdStr.match(/-m\s+"([^"]+)"/);
      const msg = msgMatch ? msgMatch[1] : "Commit";
      const id = "c" + Math.random().toString(36).substr(2, 5);
      newState.commits = { ...newState.commits, [id]: { msg, parent: newState.branches[newState.head]?.slice(-1)[0] } };
      newState.branches = { ...newState.branches, [newState.head]: [...(newState.branches[newState.head] || []), id] };
      newState.staged = [];
      out.push(`[${newState.head} ${id}] ${msg}`);
      return { out, state: newState };
    }

    if (sub === "push") {
      const remote = parts[2] || "origin";
      const branch = parts[3] || newState.head;
      out.push(`Enumerating objects: 5, done.`);
      out.push(`Counting objects: 100% (5/5), done.`);
      out.push(`Writing objects: 100% (3/3), done.`);
      out.push(`To ${newState.remotes[remote] || "https://github.com/origin/repo.git"}`);
      out.push(` * [new branch]      ${branch} -> ${branch}`);
      out.push(`Branch '${branch}' set up to track remote branch '${branch}' from '${remote}'.`);
      // HACK for scenario 4
      (newState as any).pushed = branch;
      return { out, state: newState };
    }

    if (sub === "status") {
      out.push(`On branch ${newState.head}`);
      if (newState.staged.length > 0) {
        out.push(`Changes to be committed:`);
        newState.staged.forEach(f => out.push(`  new file:   ${f}`));
      }
      if (newState.modified.length > 0) {
        out.push(`Changes not staged for commit:`);
        newState.modified.forEach(f => out.push(`  modified:   ${f}`));
      }
      if (newState.staged.length === 0 && newState.modified.length === 0) {
        out.push(`nothing to commit, working tree clean`);
      }
      return { out, state: newState };
    }

    error = `git: '${sub}' is not a git command. See 'git --help'.`;
    return { out, state: newState, error };
  }

  error = `bash: ${parts[0]}: command not found`;
  return { out, state: newState, error };
}
