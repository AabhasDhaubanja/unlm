import React from "react";

export const loggedIn = (Component, link) => {
  return ({ initialReduxState: { users } }) => {
    React.useEffect(() => {
      if (users.authenticated) {
        window.location.href = link;
      }
    }, []);

    if (users.authenticated) {
      return (
        <div>
          <h1>loading...</h1>
        </div>
      );
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
      return (
        <div>
          <h1>loading...</h1>
        </div>
      );
    }

    return <Component />;
  };
};
