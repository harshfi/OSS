# Module Animations

This directory contains the data-driven animation system for the Learn page modules.

## How to add a new scene

1. **Add config**: Open `config.ts` and add a new entry to `animationConfigs` for your `moduleId` (e.g. `"12"`). Define your steps, captions, and optional durations/commands.
   ```ts
   "12": {
     id: "12",
     steps: [
       { caption: "Step 1 description", duration: 2000 },
       { caption: "Step 2 description", duration: 2500 }
     ]
   }
   ```
2. **Create the scene file**: Create a new file in `scenes/` (e.g. `Module12Review.tsx`). Export a component that receives `{ step: number }`.
3. **Use Primitives**: Import shared components from `../primitives.tsx` like `<RepoCard>`, `<CommitNode>`, `<Terminal>`, or `<Cursor>` to keep the aesthetic consistent.
4. **Register the scene**: Open `ModuleAnimationShell.tsx` and import your new scene. Add it to the `scenes` map:
   ```ts
   const scenes = {
     // ...
     "12": Module12Review,
   };
   ```
5. **Animate**: Use `framer-motion` to animate elements based on the current `step`. Sync terminal typing using the same effect seen in `Module05Fork.tsx`.
