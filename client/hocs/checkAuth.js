import axios from "axios";
import { initializeStore } from "../../redux/store";
import { AUTHENTICATE } from "../../redux/actionTypes";
import { initializeApollo } from "../../lib/apolloClient";

export const checkAuth = (QUERY) => {
  return async (ctx) => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;

    try {
      const {
        data: { user, accessToken },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/check`,
        {},
        {
          withCredentials: true,
          headers: {
            Cookie: ctx.req.headers.cookie,
          },
        }
      );

      dispatch({
        type: AUTHENTICATE,
        payload: {
          user,
          accessToken,
          authenticated: true,
        },
      });
    } catch (error) {
      console.log(Object.keys(error), error.message);
    }

    if (QUERY) {
      const apolloClient = initializeApollo();

      await apolloClient.query({
        query: QUERY,
        variables: ctx.params,
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
