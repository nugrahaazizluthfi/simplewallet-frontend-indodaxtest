import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

function ProtectedRoute(props) {
    const { component: Component, ...rest } = props;

    return props.isLoggedIn ? (
        <Route {...rest} component={Component} />
    ) : (
        <Redirect push to="/" />
    );
}

export default withAuth(ProtectedRoute);
