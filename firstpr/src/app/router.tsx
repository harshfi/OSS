import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Home from "@/routes/home/Home";
import LearnHub from "@/routes/learn/LearnHub";
import ModulePage from "@/routes/learn/ModulePage";
import WorkflowPage from "@/routes/workflow/WorkflowPage";
import LabPage from "@/routes/lab/LabPage";
import RescuePage from "@/routes/rescue/RescuePage";
import OrgExplorerPage from "@/routes/orgs/OrgExplorerPage";
import ProgramsPlannerPage from "@/routes/programs/ProgramsPlannerPage";
import GsocInsightsPage from "@/routes/gsoc/GsocInsightsPage";
import GsocAllOrgsPage from "@/routes/gsoc/GsocAllOrgsPage";
import LfxInsightsPage from "@/routes/lfx/LfxInsightsPage";
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
        element: <WorkflowPage />,
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
        path: "gsoc/orgs",
        element: <GsocAllOrgsPage />,
      },
      {
        path: "lfx",
        element: <LfxInsightsPage />,
      },
      {
        path: "programs",
        element: <ProgramsPlannerPage />,
      },
      {
        path: "plan",
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
