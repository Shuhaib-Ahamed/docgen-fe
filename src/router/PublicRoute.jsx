import React from "react";
import { motion } from "framer-motion";
import { Route, Redirect } from "react-router-dom";
import * as authService from "@/auth";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.token.get() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
