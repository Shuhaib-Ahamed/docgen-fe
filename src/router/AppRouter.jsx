import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "@/pages/Dashboard")
);
const Admin = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Admin")
);

const Documents = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Documents")
);

const Generate = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Generate")
);

const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "@/pages/Logout")
);

const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "@/pages/NotFound")
);

export default function AppRouter() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          <PrivateRoute component={Admin} path="/users" exact />
          <PrivateRoute component={Admin} path="/settings" exact />
          <PrivateRoute component={Documents} path="/documents" exact />
          <PrivateRoute component={Generate} path="/generate" exact />
          <PrivateRoute component={Logout} path="/logout" exact />
          <PublicRoute path="/login" render={() => <Redirect to="/" />} />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/404" />}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}
