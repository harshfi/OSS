export type BlockType = 
  | "Prose" 
  | "Callout" 
  | "Code" 
  | "Diagram" 
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
    title: "Why contribute",
    description: "Learn what open source is and why you should care.",
    blocks: [
      {
        id: "m1-1",
        type: "Prose",
        content: "Open source software is code that is designed to be publicly accessible—anyone can see, modify, and distribute the code as they see fit. But why should you contribute?"
      },
      {
        id: "m1-2",
        type: "Cards",
        title: "Myths vs Facts",
        items: [
          { myth: "I have to be a senior developer", fact: "Many first contributions are documentation fixes or small typos. Everyone starts somewhere!" },
          { myth: "It takes too much time", fact: "Even fixing a broken link that takes 5 minutes is a valuable contribution." },
          { myth: "People will be mean to me", fact: "While some communities are harsh, the vast majority (especially those with 'good first issue' tags) are welcoming to beginners." }
        ]
      }
    ]
  },
  {
    id: "02",
    title: "Key terms",
    description: "Fork, Pull Request, Upstream... what does it all mean?",
    blocks: [
      {
        id: "m2-1",
        type: "Prose",
        content: "Before we start pushing code, let's make sure we speak the same language."
      },
      {
        id: "m2-2",
        type: "MatchGame",
        items: [
          { term: "Fork", meaning: "A personal copy of another user's repository." },
          { term: "Upstream", meaning: "The original repository you forked from." },
          { term: "Origin", meaning: "Your fork on GitHub." },
          { term: "Pull Request", meaning: "Asking the original repository to pull your changes in." }
        ]
      }
    ]
  },
  {
    id: "03",
    title: "One-time setup",
    description: "Get Git and your SSH keys ready.",
    blocks: [
      {
        id: "m3-1",
        type: "Prose",
        content: "You only need to do this once per computer."
      },
      {
        id: "m3-2",
        type: "Checklist",
        items: [
          "Install Git",
          "Configure your name and email",
          "Generate an SSH key",
          "Add the SSH key to your GitHub account"
        ]
      },
      {
        id: "m3-3",
        type: "Code",
        language: "bash",
        title: "Configure Git",
        content: "git config --global user.name \"Your Name\"\ngit config --global user.email \"youremail@example.com\""
      }
    ]
  },
  {
    id: "04",
    title: "Finding an issue",
    description: "How to find a project and an issue that is right for you.",
    blocks: [
      {
        id: "m4-1",
        type: "Prose",
        content: "The best place to start is a project you already use. If you don't have one, look for tags like `good first issue` or `help wanted`."
      },
      {
        id: "m4-2",
        type: "Callout",
        variant: "warning",
        title: "Don't just say 'assign me'",
        content: "Instead of just asking to be assigned, mention how you plan to solve the issue. Maintainers love initiative!"
      }
    ]
  },
  {
    id: "05",
    title: "Forking a repository",
    description: "Creating your own personal copy of the project.",
    blocks: [
      {
        id: "m5-1",
        type: "Prose",
        content: "A fork is your own copy of the repository that lives on your account. You have full read and write access to your fork."
      },
      {
        id: "m5-2",
        type: "Code",
        title: "Clone your fork",
        language: "bash",
        content: "git clone https://github.com/YOUR-USERNAME/repository-name.git\ncd repository-name"
      }
    ]
  },
  {
    id: "06",
    title: "Keeping in sync",
    description: "Adding the original repository as the 'upstream' remote.",
    blocks: [
      {
        id: "m6-1",
        type: "Prose",
        content: "The original project is called the 'upstream'. You need to connect your local clone to it so you can get updates."
      },
      {
        id: "m6-2",
        type: "Code",
        title: "Add upstream remote",
        language: "bash",
        content: "git remote add upstream https://github.com/ORIGINAL-OWNER/repository-name.git\ngit fetch upstream"
      }
    ]
  },
  {
    id: "07",
    title: "Branching out",
    description: "Never work on the main branch.",
    blocks: [
      {
        id: "m7-1",
        type: "Prose",
        content: "Before making changes, always create a new branch. This keeps your work organized and isolated."
      },
      {
        id: "m7-2",
        type: "Code",
        title: "Create and switch to a branch",
        language: "bash",
        content: "git checkout -b fix-broken-link"
      },
      {
        id: "m7-3",
        type: "Callout",
        variant: "info",
        title: "Naming conventions",
        content: "Use descriptive names like 'fix-typo-readme' or 'add-login-button' instead of 'patch-1' or 'my-changes'."
      }
    ]
  },
  {
    id: "08",
    title: "Making changes",
    description: "Editing code and saving your progress.",
    blocks: [
      {
        id: "m8-1",
        type: "Prose",
        content: "Now you can make your changes in your code editor. Once you are done, you need to stage and commit them."
      },
      {
        id: "m8-2",
        type: "Code",
        title: "Stage and commit",
        language: "bash",
        content: "git add .\ngit commit -m \"Fix broken link in README\""
      }
    ]
  },
  {
    id: "09",
    title: "Writing a good commit message",
    description: "Communicate clearly what you changed.",
    blocks: [
      {
        id: "m9-1",
        type: "Prose",
        content: "A good commit message explains 'what' and 'why', not 'how'."
      },
      {
        id: "m9-2",
        type: "Cards",
        title: "Good vs Bad",
        items: [
          { myth: "Bad: fixed stuff", fact: "Good: fix(ui): correct alignment in the header" },
          { myth: "Bad: update readme", fact: "Good: docs: add installation instructions" }
        ]
      }
    ]
  },
  {
    id: "10",
    title: "Pushing to your fork",
    description: "Uploading your local changes to GitHub.",
    blocks: [
      {
        id: "m10-1",
        type: "Prose",
        content: "Your commits are still only on your local computer. You need to push them to your fork on GitHub (origin)."
      },
      {
        id: "m10-2",
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
    description: "Asking the maintainers to accept your code.",
    blocks: [
      {
        id: "m11-1",
        type: "Prose",
        content: "Go to the original repository on GitHub. You should see a green button saying 'Compare & pull request'. Click it!"
      },
      {
        id: "m11-2",
        type: "Checklist",
        items: [
          "Reference the issue number (e.g., 'Fixes #123')",
          "Fill out the pull request template if there is one",
          "Include screenshots if it's a visual change"
        ]
      }
    ]
  },
  {
    id: "12",
    title: "The Code Review",
    description: "What happens after you open the PR.",
    blocks: [
      {
        id: "m12-1",
        type: "Prose",
        content: "Maintainers will review your code. They might ask for changes. This is normal and happens to everyone!"
      },
      {
        id: "m12-2",
        type: "Code",
        title: "Updating a PR",
        language: "bash",
        content: "# Make the requested changes in your editor\ngit add .\ngit commit -m \"Address review comments\"\ngit push origin fix-broken-link"
      },
      {
        id: "m12-3",
        type: "Callout",
        variant: "success",
        title: "Merge!",
        content: "Once the maintainer approves, they will merge your PR. Congratulations on your open source contribution!"
      }
    ]
  }
];
