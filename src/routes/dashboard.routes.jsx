import DashboardLayout from "@/components/layout/dashboard-layout";
import AuthGuard from "@/middlewares/auth-guard";
import Bank from "@/modules/dashboard/pages/Bank";
import BankCreate from "@/modules/dashboard/pages/BankCreate";
import BankEdit from "@/modules/dashboard/pages/BankEdit";
import BankDetail from "@/modules/dashboard/pages/BankDetail";
import { Navigate } from "react-router";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="banks" replace /> },
      // { index: true, element: <Bank /> },
      // { path: "donors", element: <Donar /> }, // Table Read
      // { path: "donors/create", element: <DonarCreate /> },
      // { path: "donors/update", element: <DonarUpdate /> },
      { path: "banks", element: <Bank /> },
      { path: "banks/create", element: <BankCreate /> },
      { path: "banks/edit/:id", element: <BankEdit /> },
      { path: "banks/detail/:id", element: <BankDetail /> },
    ],
  },
];
