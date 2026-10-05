# FirstPR 🚀

A guided, animated, hands-on website that takes students from "what is a fork?" to "my first merged pull request" and then to open-source programs like GSoC and LFX. 

FirstPR solves the main problem for beginners stalling on the three-copy mental model (upstream/origin/local) and the fear of breaking git by teaching through *showing* and *letting them practice* safely.

## ✨ Features

- **Workflow Visualizer**: Interactive 9-step fork-to-PR animation to build a strong mental model.
- **Terminal Lab**: A simulated shell and virtual git repo running fully in the browser where you can practice scenarios safely.
- **Learn Hub**: 12-module learning path covering everything from key terms to handling code review.
- **Rescue**: "I messed up" guides providing fixes to common git mistakes.
- **Find an issue**: Live GitHub "good first issue" search proxy.
- **Org Explorer**: Directory of 100 open source organizations filterable by tech stack, tier, and programs.
- **Programs & Planner**: Track GSoC, LFX, and other open-source programs, stipends, and deadlines.
- **Git Cheatsheet & PR Checklist**: Essential tools for everyday contributing.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui
- **Animation**: motion
- **State Management**: Zustand, TanStack Query
- **Routing**: React Router
- **Backend**: Node.js, Express (for GitHub search proxy and directory data)
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/firstpr.git
   cd firstpr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start both the Vite frontend (usually on port 5173) and the backend API server (on port 3001) concurrently.

4. Open your browser and navigate to `http://localhost:5173`.

## 🤝 Contributing

We welcome contributions to make FirstPR better! Since this project is meant to teach open source, we are dedicated to making this a great place for your first contribution.

1. Check out the issues page for `good first issue` tags.
2. Fork the repo, create a branch, make your changes, and open a Pull Request!

## 📜 License

This project is open source and available under the MIT License.
