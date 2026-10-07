export type BlockType = 
  | "Prose" 
  | "Callout" 
  | "Code" 
  | "Diagram" 
  | "GitGraph"
  | "Try" 
  | "Quiz"
  | "Cards"
  | "MatchGame"
  | "Checklist";

export interface Block {
  id: string;
  type: BlockType;
  content?: string | string[]; // Prose text or code
  title?: string;
  variant?: "info" | "warning" | "success" | "destructive"; // for callouts
  items?: any[]; // for lists, cards, games
  language?: string; // for code
  stepIndex?: number; // for diagram workflow steps
  cardLabels?: { left: string, right: string }; // Custom labels for Cards blocks
}

export interface Module {
  id: string; // e.g. "01"
  title: string;
  description: string;
  blocks: Block[];
}

export const modules: Module[] = [
  {
    id: "01",
    title: "Why Contribute to Open Source?",
    description: "Learn what open source is, how it accelerates your career, and why you should care.",
    blocks: [
      {
        id: "m1-1",
        type: "Prose",
        content: "Open source software (OSS) is code that is designed to be publicly accessible—anyone can see, modify, and distribute the code as they see fit. Most of the modern internet is built on OSS, including Linux, React, Python, and countless tools you use every day."
      },
      {
        id: "m1-1-b",
        type: "Prose",
        content: "Contributing to OSS isn't just about charity; it's one of the fastest ways to level up your engineering skills, build a public portfolio, and network with world-class developers."
      },
      {
        id: "m1-2",
        type: "Cards",
        title: "Myths vs Facts",
        cardLabels: { left: "Myth", right: "Fact" },
        items: [
          { left: "I need to be a senior developer to contribute.", right: "False! Many first contributions are documentation fixes, typo corrections, or small CSS tweaks. Everyone starts somewhere!" },
          { left: "It takes too much time.", right: "False. Even fixing a broken link that takes 5 minutes provides immense value to the community." },
          { left: "Maintainers will be mean to me.", right: "While intimidating at first, the vast majority of communities (especially those using 'good first issue' tags) are incredibly welcoming to beginners." }
        ]
      },
      {
        id: "m1-3",
        type: "Callout",
        variant: "info",
        title: "Did you know?",
        content: "Many tech companies look at a candidate's GitHub profile during the hiring process. A strong track record of open source contributions often speaks louder than a traditional resume!"
      }
    ]
  },
  {
    id: "02",
    title: "Key Terminology",
    description: "Fork, Pull Request, Upstream... decode the jargon before you begin.",
    blocks: [
      {
        id: "m2-1",
        type: "Prose",
        content: "Before we start pushing code, let's make sure we speak the same language. Git and GitHub use specific terminology that can be confusing at first."
      },
      {
        id: "m2-2",
        type: "MatchGame",
        items: [
          { term: "Fork", meaning: "A personal, linked copy of another user's repository." },
          { term: "Upstream", meaning: "The original repository you forked from (the source of truth)." },
          { term: "Origin", meaning: "Your personal fork residing on GitHub." },
          { term: "Pull Request (PR)", meaning: "Asking the original repository to pull your changes into their codebase." },
          { term: "Clone", meaning: "Downloading a repository from the internet to your local computer." }
        ]
      }
    ]
  },
  {
    id: "03",
    title: "One-Time Setup",
    description: "Get Git, your credentials, and your SSH keys ready.",
    blocks: [
      {
        id: "m3-1",
        type: "Prose",
        content: "You only need to do this once per computer. Think of this as getting your passport before traveling."
      },
      {
        id: "m3-2",
        type: "Checklist",
        items: [
          "Install Git on your machine.",
          "Configure your global Git name and email.",
          "Generate an SSH key.",
          "Add the SSH key to your GitHub account for passwordless pushing."
        ]
      },
      {
        id: "m3-3",
        type: "Code",
        language: "bash",
        title: "Configure Git",
        content: "git config --global user.name \"Your Name\"\ngit config --global user.email \"youremail@example.com\""
      },
      {
        id: "m3-4",
        type: "Callout",
        variant: "warning",
        title: "Match your email!",
        content: "Make sure the email you configure in Git exactly matches the email attached to your GitHub account. Otherwise, your commits won't link to your profile!"
      }
    ]
  },
  {
    id: "04",
    title: "Finding the Right Issue",
    description: "How to find a project and an issue that perfectly matches your skill level.",
    blocks: [
      {
        id: "m4-1",
        type: "Prose",
        content: "The best place to start is a project or tool you already use and love. If you don't have one in mind, you can search GitHub for issues specifically tailored to newcomers."
      },
      {
        id: "m4-2",
        type: "Checklist",
        title: "What to look for in a good first issue:",
        items: [
          "Labels like 'good first issue', 'help wanted', or 'beginner'.",
          "Recent activity: Check if the repository was updated in the last month.",
          "A clear, welcoming CONTRIBUTING.md file.",
          "An issue that has clear reproduction steps or detailed requirements."
        ]
      },
      {
        id: "m4-3",
        type: "Callout",
        variant: "warning",
        title: "Don't just say 'assign me'",
        content: "Instead of just asking to be assigned, demonstrate initiative. Comment with a brief summary of how you plan to solve it or ask a clarifying question. Maintainers prioritize contributors who show they've investigated the problem."
      }
    ]
  },
  {
    id: "05",
    title: "Forking and Cloning",
    description: "Creating your own personal copy of the project in the cloud and on your laptop.",
    blocks: [
      {
        id: "m5-1",
        type: "Prose",
        content: "A fork is your own copy of the repository that lives on your account. You have full read and write access to your fork, making it the perfect sandbox."
      },
      {
        id: "m5-1-diagram",
        type: "GitGraph",
        content: "fork"
      },
      {
        id: "m5-2",
        type: "Code",
        title: "Clone your fork",
        language: "bash",
        content: "git clone https://github.com/YOUR-USERNAME/repository-name.git\ncd repository-name"
      },
      {
        id: "m5-3-diagram",
        type: "GitGraph",
        content: "clone"
      },
      {
        id: "m5-4",
        type: "Callout",
        variant: "success",
        title: "Workspace Ready",
        content: "You now have a complete, isolated local environment. Any changes you make here will not affect the original project."
      }
    ]
  },
  {
    id: "06",
    title: "Connecting to Upstream",
    description: "Adding the original repository as the 'upstream' remote so you can stay updated.",
    blocks: [
      {
        id: "m6-1",
        type: "Prose",
        content: "The original project is called the 'upstream'. You need to connect your local clone to it so you can get updates. Without this, your fork will quickly fall behind as other developers merge their code."
      },
      {
        id: "m6-2",
        type: "Code",
        title: "Add upstream remote",
        language: "bash",
        content: "git remote add upstream https://github.com/ORIGINAL-OWNER/repository-name.git\ngit fetch upstream"
      },
      {
        id: "m6-3-diagram",
        type: "GitGraph",
        content: "remote"
      }
    ]
  },
  {
    id: "07",
    title: "Branching Out",
    description: "Never work on the main branch. Keep your work organized and isolated.",
    blocks: [
      {
        id: "m7-1",
        type: "Prose",
        content: "Before making changes, always create a new branch. This keeps your work organized, isolated, and ensures your 'main' branch remains a clean mirror of the upstream project."
      },
      {
        id: "m7-2",
        type: "Code",
        title: "Create and switch to a branch",
        language: "bash",
        content: "git checkout -b fix-broken-link"
      },
      {
        id: "m7-3-diagram",
        type: "GitGraph",
        content: "branch"
      },
      {
        id: "m7-4",
        type: "Callout",
        variant: "info",
        title: "Naming conventions",
        content: "Use descriptive names like 'feat/add-login' or 'fix/typo-readme' instead of 'patch-1' or 'my-changes'."
      }
    ]
  },
  {
    id: "08",
    title: "Making Changes",
    description: "Editing code, debugging, and saving your progress.",
    blocks: [
      {
        id: "m8-1",
        type: "Prose",
        content: "Now you can make your changes in your code editor. Write tests, update documentation, and ensure everything runs locally. Once you are done, you need to stage and commit them."
      },
      {
        id: "m8-2",
        type: "Code",
        title: "Stage and commit",
        language: "bash",
        content: "git add .\ngit commit -m \"Fix broken link in README\""
      },
      {
        id: "m8-3-diagram",
        type: "GitGraph",
        content: "commit"
      }
    ]
  },
  {
    id: "09",
    title: "Writing a Great Commit Message",
    description: "Communicate clearly what you changed and why it matters.",
    blocks: [
      {
        id: "m9-1",
        type: "Prose",
        content: "A good commit message explains 'what' and 'why', not 'how'. Maintainers read these messages to understand the intent behind your changes without having to read every line of code."
      },
      {
        id: "m9-2",
        type: "Cards",
        title: "Good vs Bad",
        cardLabels: { left: "Bad", right: "Good" },
        items: [
          { left: "fixed stuff", right: "fix(ui): correct alignment in the header" },
          { left: "update readme", right: "docs: add installation instructions for macOS" },
          { left: "wooo it works finally", right: "feat(auth): implement OAuth2 login flow" }
        ]
      },
      {
        id: "m9-3",
        type: "Callout",
        variant: "info",
        title: "Conventional Commits",
        content: "Many projects use a standard called Conventional Commits. You prefix your message with the type of change: feat (feature), fix (bug fix), docs (documentation), chore (maintenance), etc."
      }
    ]
  },
  {
    id: "10",
    title: "Pushing to Your Fork",
    description: "Uploading your local changes safely to your GitHub account.",
    blocks: [
      {
        id: "m10-1",
        type: "Prose",
        content: "Your commits are currently sitting only on your local computer's hard drive. You need to push them up to your fork on GitHub (which we named 'origin')."
      },
      {
        id: "m10-2-diagram",
        type: "GitGraph",
        content: "push"
      },
      {
        id: "m10-3",
        type: "Code",
        title: "Push your branch",
        language: "bash",
        content: "git push -u origin fix-broken-link"
      }
    ]
  },
  {
    id: "11",
    title: "Opening a Pull Request",
    description: "Asking the maintainers to accept your code into the official project.",
    blocks: [
      {
        id: "m11-1",
        type: "Prose",
        content: "Go to the original repository on GitHub. You should see a green button saying 'Compare & pull request' appear automatically after you push. Click it!"
      },
      {
        id: "m11-2-diagram",
        type: "GitGraph",
        content: "pull-request"
      },
      {
        id: "m11-3",
        type: "Checklist",
        items: [
          "Write a clear, descriptive title.",
          "Reference the issue number (e.g., 'Fixes #123').",
          "Fill out the pull request template completely.",
          "Include before/after screenshots if it's a visual UI change."
        ]
      }
    ]
  },
  {
    id: "12",
    title: "The Code Review Process",
    description: "What happens after you open the PR and how to respond to feedback.",
    blocks: [
      {
        id: "m12-1",
        type: "Prose",
        content: "Maintainers will review your code. They might ask for changes, suggest improvements, or ask for tests. This is completely normal and happens to senior engineers too! Embrace it as a learning opportunity."
      },
      {
        id: "m12-2",
        type: "Code",
        title: "Updating a PR",
        language: "bash",
        content: "# Make the requested changes in your editor\ngit add .\ngit commit -m \"Address review comments\"\ngit push origin fix-broken-link"
      },
      {
        id: "m12-3-diagram",
        type: "GitGraph",
        content: "review"
      },
      {
        id: "m12-4",
        type: "Callout",
        variant: "success",
        title: "Merge!",
        content: "Once the maintainer approves, they will merge your PR. Congratulations, your code is now running in production! You are officially an open-source contributor."
      }
    ]
  },
  {
    id: "13",
    title: "Resolving Merge Conflicts",
    description: "Don't panic! Here is how to handle it when Git gets confused.",
    blocks: [
      {
        id: "m13-1",
        type: "Prose",
        content: "A merge conflict happens when you and another developer edit the exact same lines of code in a file. Git doesn't know whose changes to keep, so it pauses and asks you to decide."
      },
      {
        id: "m13-2",
        type: "Code",
        title: "What a conflict looks like in a file:",
        language: "javascript",
        content: "<<<<<<< HEAD\nconst buttonColor = 'blue';\n=======\nconst buttonColor = 'red';\n>>>>>>> feature-branch"
      },
      {
        id: "m13-3",
        type: "Prose",
        content: "To fix it, simply open the file, delete the `<<<<<<<`, `=======`, and `>>>>>>>` markers, and leave only the code you want to keep. Then, add and commit the file."
      },
      {
        id: "m13-4",
        type: "Callout",
        variant: "info",
        title: "VS Code makes this easy",
        content: "Modern editors like VS Code provide buttons like 'Accept Current Change' or 'Accept Incoming Change' right above the conflict to resolve it in one click."
      },
      {
        id: "m13-5",
        type: "GitGraph",
        content: "merge-conflict"
      }
    ]
  },
  {
    id: "14",
    title: "Rebasing vs Merging",
    description: "Advanced techniques for keeping your feature branch up to date.",
    blocks: [
      {
        id: "m14-1",
        type: "Prose",
        content: "When the upstream `main` branch moves forward, you need to bring those new changes into your feature branch. You have two options: Merging or Rebasing."
      },
      {
        id: "m14-2",
        type: "Cards",
        title: "Merge vs Rebase",
        cardLabels: { left: "Command", right: "Behavior" },
        items: [
          { left: "git merge main", right: "Creates a 'merge commit'. It's safe and non-destructive, but can make your commit history look messy with lots of intersecting lines." },
          { left: "git rebase main", right: "Rewrites your commits as if you started them from the absolute latest version of main. It keeps history perfectly linear and clean, but rewrites history." }
        ]
      },
      {
        id: "m14-3",
        type: "Callout",
        variant: "warning",
        title: "The Golden Rule of Rebasing",
        content: "Never rebase commits that exist outside your repository (commits that other people have already based their work on). Only rebase your own local, unpublished feature branches."
      },
      {
        id: "m14-4",
        type: "GitGraph",
        content: "rebase"
      }
    ]
  },
  {
    id: "15",
    title: "Open Source Etiquette",
    description: "How to be a standout contributor that maintainers love to work with.",
    blocks: [
      {
        id: "m15-1",
        type: "Prose",
        content: "Open source maintainers are often unpaid volunteers managing projects in their free time. Being polite, patient, and respectful goes a long way."
      },
      {
        id: "m15-2",
        type: "Checklist",
        title: "Golden Rules of Etiquette:",
        items: [
          "Be Patient: Do not ping or @mention maintainers demanding a review within 24 hours.",
          "Over-communicate: Explain WHY you are making a change, not just what it is.",
          "Keep PRs small: A PR that adds 50 lines is reviewed quickly. A PR that adds 5,000 lines will sit unreviewed for months.",
          "Accept feedback gracefully: Leave your ego at the door. If a maintainer requests a change, make the change or politely explain your reasoning."
        ]
      },
      {
        id: "m15-3",
        type: "Callout",
        variant: "success",
        title: "You are ready!",
        content: "You now have all the knowledge, tools, and etiquette needed to make high-impact contributions to the open-source world. Go find an issue and make your first PR!"
      },
      {
        id: "m15-4",
        type: "GitGraph",
        content: "etiquette"
      }
    ]
  }
];
