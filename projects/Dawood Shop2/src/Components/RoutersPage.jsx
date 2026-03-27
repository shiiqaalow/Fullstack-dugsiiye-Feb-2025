import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { NotFound } from "../Components/NotFound";
import { Home } from "../Pages/Home";
import { SignUp } from "../Pages/SignUp";
import { SignIn } from "../Pages/SignIn";
import { UnProtectedRoutes } from "./UnProtectedRoutes";
import { ProtectedRoutes } from "../Components/ProtectedRoutes";
import { DashboardLayout } from "../Components/DashboardLayout";
import { Dashboard } from "../Pages/Dashboard";
import { Analytics } from "../Pages/Analytics";
import { Transaction } from "../Pages/Transaction";
import { Reports } from "../Pages/Reports";
import { Records } from "../Pages/Records";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "signup",
        element: (
          <UnProtectedRoutes>
            <SignUp />
          </UnProtectedRoutes>
        ),
      },

      {
        path: "signin",
        element: (
          <UnProtectedRoutes>
            <SignIn />
          </UnProtectedRoutes>
        ),
      },

      // 🔒 DASHBOARD (LOCKED + SIDEBAR)
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true, 
            element: <Dashboard />,
          },
          {
            path: "analytics", // /dashboard/analytics
            element: <Analytics />,
          },
          {
            path: "transactions", // /dashboard/transactions
            element: <Transaction />,
          },
          {
            path: "reports", // /dashboard/reports
            element: <Reports />,
          },
          {
            path: "records", // /dashboard/reports
            element: <Records />,
          },
          {
            path: "records", // /dashboard/reports
            element: <Records />,
          },
          // later:
          // { path: "transactions", element: <Transactions /> },
          // { path: "customers", element: <Customers /> },
        ],
      },
    ],
  },
]);
