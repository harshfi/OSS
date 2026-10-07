export interface AnimationStep {
  caption: string;
  command?: string;
  duration?: number; // Defaults to 2000ms
}

export interface ModuleAnimationConfig {
  id: string;
  steps: AnimationStep[];
}

export const animationConfigs: Record<string, ModuleAnimationConfig> = {
  "01": {
    id: "01",
    steps: [
      { caption: "The internet is built on Open Source", duration: 2500 },
      { caption: "Anyone can view and modify the code", duration: 2500 },
      { caption: "You build skills and a public portfolio", duration: 3000 },
    ]
  },
  "02": {
    id: "02",
    steps: [
      { caption: "Upstream is the original repo", duration: 2500 },
      { caption: "Fork is your personal copy", duration: 2500 },
      { caption: "Origin is your fork on GitHub", duration: 2500 },
      { caption: "Local is your machine clone", duration: 2500 },
    ]
  },
  "03": {
    id: "03",
    steps: [
      { caption: "Install Git on your computer", duration: 2000 },
      { caption: "Configure your name and email", command: 'git config --global user.name "You"\ngit config --global user.email "you@ext.com"', duration: 3000 },
      { caption: "Generate and add an SSH key", duration: 2500 },
    ]
  },
  "04": {
    id: "04",
    steps: [
      { caption: "Find a project you use or love", duration: 2500 },
      { caption: "Look for 'good first issue' labels", duration: 3000 },
      { caption: "Comment to show initiative", duration: 2500 },
    ]
  },
  "05": {
    id: "05",
    steps: [
      { caption: "Original Repo exists on GitHub", duration: 1500 },
      { caption: "Click Fork to copy to your account", duration: 2500 },
      { caption: "GitHub creates Your Fork", duration: 2000 },
      { caption: "Clone it to your local machine", command: "git clone https://github.com/...", duration: 2500 },
    ]
  },
  "06": {
    id: "06",
    steps: [
      { caption: "Your clone knows only your fork", duration: 2000 },
      { caption: "Find the original repository URL", duration: 2500 },
      { caption: "Add it as the 'upstream' remote", command: "git remote add upstream https://...", duration: 3000 },
      { caption: "Fetch new commits from upstream", command: "git fetch upstream", duration: 3500 },
      { caption: "Your fork can now stay current", duration: 2000 },
    ]
  },
  "07": {
    id: "07",
    steps: [
      { caption: "You are on the main branch", duration: 1500 },
      { caption: "Create and checkout a new feature branch", command: "git checkout -b fix-broken-link", duration: 2500 },
      { caption: "You are now isolated from main", duration: 2000 },
    ]
  },
  "08": {
    id: "08",
    steps: [
      { caption: "You modified a file in Working Directory", duration: 1500 },
      { caption: "Stage the changes", command: "git add .", duration: 2000 },
      { caption: "Commit the changes", command: "git commit -m 'Fix broken link'", duration: 2500 },
      { caption: "New commit is saved locally", duration: 1500 },
    ]
  },
  "09": {
    id: "09",
    steps: [
      { caption: "A bad commit message is vague", duration: 2500 },
      { caption: "A good commit message explains 'what' and 'why'", duration: 3000 },
      { caption: "Conventional commits add structure", command: "git commit -m 'fix(ui): correct alignment'", duration: 3500 },
    ]
  },
  "10": {
    id: "10",
    steps: [
      { caption: "Local branch is ahead by 1 commit", duration: 1500 },
      { caption: "Push to your fork on GitHub", command: "git push -u origin fix-broken-link", duration: 3000 },
      { caption: "Commit is safely stored in Your Fork", duration: 1500 },
    ]
  },
  "11": {
    id: "11",
    steps: [
      { caption: "Compare & pull request on GitHub", duration: 1500 },
      { caption: "Fill out the PR template checklist", duration: 2500 },
      { caption: "Submit Pull Request to Original Repo", duration: 2500 },
    ]
  },
  "12": {
    id: "12",
    steps: [
      { caption: "Maintainer opens your pull request", duration: 2000 },
      { caption: "Reviewer comments on specific lines", duration: 2500 },
      { caption: "You fix the code and push", command: "git add .\ngit commit -m 'Fix'\ngit push origin", duration: 4500 },
      { caption: "Comments resolved, review approved", duration: 2500 },
      { caption: "Maintainer merges into main", duration: 3000 },
    ]
  },
  "13": {
    id: "13",
    steps: [
      { caption: "Merge conflict occurs", duration: 2000 },
      { caption: "Git stops the merge and marks the file", duration: 2500 },
      { caption: "You resolve markers in your editor", duration: 3000 },
      { caption: "Commit the resolved file", command: "git commit -m 'Resolve merge conflict'", duration: 2500 },
    ]
  },
  "14": {
    id: "14",
    steps: [
      { caption: "Upstream main moves forward", duration: 2000 },
      { caption: "Merge creates a merge commit", command: "git merge main", duration: 3000 },
      { caption: "Rebase rewrites your commits", command: "git rebase main", duration: 3000 },
      { caption: "History is now linear", duration: 2000 },
    ]
  },
  "15": {
    id: "15",
    steps: [
      { caption: "Write clear PR descriptions", duration: 2000 },
      { caption: "Keep pull requests small", duration: 2000 },
      { caption: "Accept feedback gracefully", duration: 2000 },
      { caption: "Your PR is merged!", duration: 2500 },
    ]
  }
};
