import React from "react";
import { Route, Redirect } from "react-router-dom";

import { withAuthentication } from "react/contexts/authentication.js";

const PrivateRoute = ({ isAuthenticated, path, component }) => {
  return isAuthenticated() ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default withAuthentication(PrivateRoute);
