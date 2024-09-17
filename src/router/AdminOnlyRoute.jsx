import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as authService from "@/auth";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "@/redux/auth/selectors";
import { ROLE } from "@/modules/UserManagement/constants/userConstants";

const AdminOnlyRoute = ({ component: Component, ...rest }) => {
  const { role } = useSelector(selectCurrentAdmin);
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.token.get() && role === ROLE.ADMIN ? (
          <Component {...props} />
        ) : (
          <Redirect to="/404" />
        )
      }
    />
  );
};

export default AdminOnlyRoute;
