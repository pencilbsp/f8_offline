import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// components
import Loadable from "@/components/Loadable";
// paths
import { ROOT, ROOT_AUTH } from "./paths";
// guards
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
// layout
import MainLayout from "@/layouts/MainLayout";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: ROOT_AUTH,
      element: <MainLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // Main Routes
    {
      path: ROOT,
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        {
          path: "kanban",
          element: (
            <AuthGuard>
              <KanbanPage />
            </AuthGuard>
          ),
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/auth/Login")));

// MAIN
const HomePage = Loadable(lazy(() => import("../pages/Home")));
const KanbanPage = Loadable(lazy(() => import("../pages/Kanban")));
