import { Navigate } from "react-router";

function AuthGuard({ children }) {
	const isAuthenticated = localStorage.getItem("admin"); //just use localstorage for store token
	console.log({ isAuthenticated });

	return isAuthenticated ? (
		<>{children}</>
	) : (
		<Navigate to='/dashboard/login' replace />
	);
}

export default AuthGuard;
