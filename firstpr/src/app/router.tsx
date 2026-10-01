import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Home from "@/routes/home/Home";
import ModulePage from "@/routes/learn/ModulePage";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "learn",
        element: <div className="p-4 text-center mt-20 text-muted-foreground">Redirecting to learn hub...</div>,
      },
      {
        path: "learn/:id",
        element: <ModulePage />,
      },
      {
        path: "lab",
        element: <div className="p-4">Terminal Lab (Coming soon)</div>,
      },
      {
        path: "workflow",
        element: (
          <div className="container mx-auto p-4 md:p-12">
            <h1 className="text-4xl font-bold mb-8">Workflow Visualizer</h1>
            <WorkflowVisualizer />
          </div>
        ),
      },
      {
        path: "issues",
        element: <div className="p-4">Find an Issue (Coming soon)</div>,
      },
      {
        path: "orgs",
        element: <div className="p-4">Org Explorer (Coming soon)</div>,
      },
      {
        path: "programs",
        element: <div className="p-4">Programs & Planner (Coming soon)</div>,
      },
      {
        path: "progress",
        element: <div className="p-4">My Progress (Coming soon)</div>,
      },
    ],
  },
]);
