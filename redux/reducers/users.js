import { AUTHENTICATE } from "../actionTypes";

const initialState = {
  user: null,
  accessToken: null,
  authenticated: false,
  checked: false,
  error: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      const { user, accessToken, authenticated } = action.payload;
      const newUser = {
        ...state,
        user,
        accessToken,
        authenticated,
        checked: true,
      };

      return newUser;

    default:
      return state;
  }
};

export default users;
