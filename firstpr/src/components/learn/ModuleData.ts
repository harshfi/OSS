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
  }
];
