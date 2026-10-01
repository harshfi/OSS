import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Home from "@/routes/home/Home";
import LearnHub from "@/routes/learn/LearnHub";
import ModulePage from "@/routes/learn/ModulePage";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";
import LabPage from "@/routes/lab/LabPage";
import RescuePage from "@/routes/rescue/RescuePage";
import OrgExplorerPage from "@/routes/orgs/OrgExplorerPage";
import ProgramsPlannerPage from "@/routes/programs/ProgramsPlannerPage";
import GsocInsightsPage from "@/routes/gsoc/GsocInsightsPage";
import AiPolicyPage from "@/routes/ai-policy/AiPolicyPage";
import { IssuesPage } from "@/routes/issues/IssuesPage";
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
        element: <LearnHub />,
      },
      {
        path: "learn/:id",
        element: <ModulePage />,
      },
      {
        path: "lab",
        element: <LabPage />,
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
        path: "rescue",
        element: <RescuePage />,
      },
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "orgs",
        element: <OrgExplorerPage />,
      },
      {
        path: "gsoc",
        element: <GsocInsightsPage />,
      },
      {
        path: "programs",
        element: <ProgramsPlannerPage />,
      },
      {
        path: "ai-policy",
        element: <AiPolicyPage />,
      },
      {
        path: "progress",
        element: <div className="p-4">My Progress (Coming soon)</div>,
      },
    ],
  },
]);
