import React, { Suspense } from "react";

import { BrowserRouter as Router, useRoutes, Navigate } from "react-router";
import Loading from "../components/ui/loading";
import NotFoundPage from "../pages/NotFoundPage";
import { authCollection } from "./auth.collection.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { bankDashboardRoutes } from "./bankdashboard.routes";
import { mainRoutes } from "./main.routes";

const routes = [
	...authCollection,
	...dashboardRoutes,
	...bankDashboardRoutes,
	...mainRoutes,
	{ path: "/", element: <Navigate to='/main' replace /> },
	{ path: "*", element: <NotFoundPage /> },
];

const Routes = () => useRoutes(routes);

export default function AppRoutes() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes />
			</Suspense>
		</Router>
	);
}
