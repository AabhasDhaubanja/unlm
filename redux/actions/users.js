import { AUTHENTICATE } from "../actionTypes";

export const authUser = (user, accessToken) => async (dispatch) => {
  dispatch({
    type: AUTHENTICATE,
    payload: {
      user,
      accessToken,
      authenticated: true,
    },
  });
};
