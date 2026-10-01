import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Home from "@/routes/home/Home";

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
        element: <div className="p-4">Learn Hub (Coming soon)</div>,
      },
      {
        path: "lab",
        element: <div className="p-4">Terminal Lab (Coming soon)</div>,
      },
      {
        path: "workflow",
        element: <div className="p-4">Workflow Visualizer (Coming soon)</div>,
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
