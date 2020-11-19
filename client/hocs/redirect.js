import React from "react";
import Loading from "../components/Loading";

export const loggedIn = (Component, link) => {
  return ({ initialReduxState: { users } }) => {
    React.useEffect(() => {
      if (users.authenticated) {
        window.location.href = link;
      }
    }, []);

    if (users.authenticated) {
      return <Loading />;
    }

    return <Component />;
  };
};

export const loggedOut = (Component, link) => {
  return ({ initialReduxState: { users } }) => {
    React.useEffect(() => {
      if (!users.authenticated) {
        window.location.href = link;
      }
    }, []);

    if (!users.authenticated) {
      return <Loading />;
    }

    return <Component />;
  };
};

export const nonAdmin = (Component, link) => {
  return (props) => {
    let {
      initialReduxState: { users },
    } = props;

    React.useEffect(() => {
      if (
        !users.authenticated ||
        !users.user.role ||
        users.user.role !== "admin"
      ) {
        window.location.href = link;
      }
    }, []);

    if (
      !users.authenticated ||
      !users.user.role ||
      users.user.role !== "admin"
    ) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
};
