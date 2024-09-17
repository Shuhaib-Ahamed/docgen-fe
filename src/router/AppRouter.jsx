import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";
import AdminOnlyRoute from "./AdminOnlyRoute";
import { fetchUserData } from "@/redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth/selectors";

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "@/pages/Dashboard")
);
const Admin = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Admin")
);

const Order = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Order")
);

const Importers = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Importers")
);

const Shippers = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Shippers")
);

const Surveyor = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Surveyor")
);

const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "@/pages/Logout")
);

const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "@/pages/NotFound")
);

export default function AppRouter() {
  const { current } = useSelector(selectAuth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (current?.id) {
      dispatch(fetchUserData(current?.id));
    }
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          <AdminOnlyRoute component={Admin} path="/users" exact />
          <PrivateRoute component={Admin} path="/settings" exact />
          <PrivateRoute component={Order} path="/orders" exact />
          <PrivateRoute component={Importers} path="/importers" exact />
          <PrivateRoute component={Shippers} path="/shippers" exact />
          <PrivateRoute component={Surveyor} path="/surveyors" exact />
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
