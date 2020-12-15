import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "../components/Loading";

export function loggedIn(Component) {
  return () => {
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
      if (authenticated) {
        window.location.href = "/profile";
      }
    }, [authenticated]);

    return authenticated ? <Loading /> : <Component />;
  };
}

export function loggedOut(Component) {
  return () => {
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!authenticated) {
        window.location.href = "/login";
      }
    }, [authenticated]);

    return !authenticated ? <Loading /> : <Component />;
  };
}

export const nonAdmin = (Component) => {
  return (props) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user || user.role !== "admin") {
        window.location.href = "/";
      }
    }, [user]);

    return !user || user.role !== "admin" ? (
      <Loading />
    ) : (
      <Component {...props} />
    );
  };
};
