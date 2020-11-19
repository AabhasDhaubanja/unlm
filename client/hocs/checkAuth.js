import axios from "axios";
import { initializeStore } from "../../redux/store";
import { AUTHENTICATE } from "../../redux/actionTypes";
import { initializeApollo } from "../../lib/apolloClient";

export const checkAuthFunction = async (ctx, dispatch) => {
  const config = ctx.req.headers.cookie
    ? {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      }
    : {
        withCredentials: true,
      };

  const {
    data: { user, accessToken },
  } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/check`,
    {},
    config
  );

  dispatch({
    type: AUTHENTICATE,
    payload: {
      user,
      accessToken,
      authenticated: true,
    },
  });
};

export const checkAuth = (QUERY) => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  let token;

  return async (ctx) => {
    try {
      const config = ctx.req.headers.cookie
        ? {
            withCredentials: true,
            headers: {
              Cookie: ctx.req.headers.cookie,
            },
          }
        : {
            withCredentials: true,
          };

      const {
        data: { user, accessToken },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/check`,
        {},
        config
      );

      token = accessToken;

      dispatch({
        type: AUTHENTICATE,
        payload: {
          user,
          accessToken,
          authenticated: true,
        },
      });
    } catch (error) {
      console.log("-------------------------------");
      console.log(Object.keys(error), error.message);
      console.log("-------------------------------");

      dispatch({
        type: AUTHENTICATE,
        payload: {
          user: null,
          accessToken: null,
          authenticated: false,
        },
      });
    }

    if (QUERY) {
      const apolloClient = initializeApollo();

      await apolloClient.query({
        query: QUERY,
        variables: ctx.params,
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      return {
        props: {
          initialReduxState: reduxStore.getState(),
          initialApolloState: apolloClient.cache.extract(),
        },
      };
    }

    return {
      props: {
        initialReduxState: reduxStore.getState(),
      },
    };
  };
};
