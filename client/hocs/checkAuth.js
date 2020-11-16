import axios from "axios";
import { initializeStore } from "../../redux/store";
import { AUTHENTICATE } from "../../redux/actionTypes";

export const checkAuth = () => {
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

    console.log("here");
    return {
      props: {
        initialReduxState: reduxStore.getState(),
      },
    };
  };
};
