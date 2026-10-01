export type Node = "upstream" | "origin" | "local";

export interface Commit {
  id: string;
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

export interface Step {
  id: number;
  title: string;
  command?: string;
  explain: string;
  graph: Record<Node, GraphState | null>; // State of the graph at each node
  highlight: Node[];
  edge?: { from: Node; to: Node; label: string; active?: boolean };
}

const baseGraph: GraphState = {
  commits: [
    { id: "c1", message: "Initial commit", branch: "main" },
    { id: "c2", message: "Add docs", branch: "main" },
  ],
  branches: [{ name: "main", commits: ["c1", "c2"] }],
  remotes: [],
};

export const workflowSteps: Step[] = [
  {
    id: 1,
    title: "Fork the repository",
    command: "gh repo fork original/repo",
    explain: "A fork is your own personal copy of the repository on GitHub. It lives in your account and you have full control over it.",
    highlight: ["upstream", "origin"],
    edge: { from: "upstream", to: "origin", label: "fork", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: null,
    },
  },
  {
    id: 2,
    title: "Clone your fork",
    command: "git clone https://github.com/yourusername/repo.git",
    explain: "Cloning downloads the repository from GitHub to your local computer so you can edit the files.",
    highlight: ["origin", "local"],
    edge: { from: "origin", to: "local", label: "clone", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        remotes: [{ name: "origin", url: "https://github.com/yourusername/repo.git" }],
      },
    },
  },
  {
    id: 3,
    title: "Add upstream remote",
    command: "git remote add upstream https://github.com/original/repo.git",
    explain: "To keep your local copy up to date, you connect it to the original repository (upstream).",
    highlight: ["local", "upstream"],
    edge: { from: "local", to: "upstream", label: "add remote", active: true },
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        remotes: [
          { name: "origin", url: "https://github.com/yourusername/repo.git" },
          { name: "upstream", url: "https://github.com/original/repo.git" },
        ],
      },
    },
  },
  {
    id: 4,
    title: "Sync and create branch",
    command: "git pull upstream main && git checkout -b feature-branch",
    explain: "Always create a new branch for your work. Never commit directly to main. We sync with upstream first to avoid conflicts.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2"] },
        ],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
  {
    id: 5,
    title: "Make changes",
    explain: "Edit files in your code editor. Git tracks these changes but they aren't saved to history yet.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2"] },
        ],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
  {
    id: 6,
    title: "Stage and commit",
    command: "git add . && git commit -m \"Add new feature\"",
    explain: "Staging tells Git which files you want to include. Committing takes a snapshot of your changes.",
    highlight: ["local"],
    graph: {
      upstream: baseGraph,
      origin: baseGraph,
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "feature-branch" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
  {
    id: 7,
    title: "Push to your fork",
    command: "git push origin feature-branch",
    explain: "Upload your local commits to your fork on GitHub (origin).",
    highlight: ["local", "origin"],
    edge: { from: "local", to: "origin", label: "push", active: true },
    graph: {
      upstream: baseGraph,
      origin: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "feature-branch" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2", "c3"] },
        ],
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "feature-branch" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
  {
    id: 8,
    title: "Open a Pull Request",
    explain: "On GitHub, you ask the original maintainers to pull your changes into their repository.",
    highlight: ["origin", "upstream"],
    edge: { from: "origin", to: "upstream", label: "Pull Request", active: true },
    graph: {
      upstream: baseGraph,
      origin: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "feature-branch" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2", "c3"] },
        ],
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "feature-branch" },
        ],
        branches: [
          { name: "main", commits: ["c1", "c2"] },
          { name: "feature-branch", commits: ["c1", "c2", "c3"] },
        ],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
  {
    id: 9,
    title: "Review, merge, clean up",
    explain: "After review, they merge your PR. You can now delete your branch and pull the latest changes.",
    highlight: ["upstream", "local"],
    edge: { from: "upstream", to: "local", label: "sync", active: true },
    graph: {
      upstream: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "main" }, // simplified merge
        ],
        branches: [{ name: "main", commits: ["c1", "c2", "c3"] }],
      },
      origin: {
        ...baseGraph, // origin branches can be deleted
      },
      local: {
        ...baseGraph,
        commits: [
          ...baseGraph.commits,
          { id: "c3", message: "Add new feature", branch: "main" },
        ],
        branches: [{ name: "main", commits: ["c1", "c2", "c3"] }],
        remotes: [
          { name: "origin", url: "..." },
          { name: "upstream", url: "..." },
        ],
      },
    },
  },
];
