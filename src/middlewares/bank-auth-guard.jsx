import { Navigate } from "react-router";

function BankAuthGuard({ children }) {
  const isAuthenticated = localStorage.getItem("bank_admin"); //just use localstorage for store token
  console.log({ isAuthenticated });

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/bank-dashboard/login" replace />
  );
}

export default BankAuthGuard;
