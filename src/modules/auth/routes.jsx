import BankLoginPage from "./pages/BankLoginPage";
import LoginPage from "./pages/LoginPage";

const authRoutes = [
  { path: "/dashboard/login", element: <LoginPage /> },
  { path: "/bank-dashboard/login", element: <BankLoginPage /> },
];

export default authRoutes;
