import { AUTHENTICATE } from "../actionTypes";

const initialState = {
  user: null,
  accessToken: null,
  authenticated: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      const { user, accessToken, authenticated } = action.payload;
      const newUser = { ...state, user, accessToken, authenticated };
      return newUser;

    default:
      return state;
  }
};

export default users;
