import { useState, useEffect, createContext } from "react";
import axios from "axios";
import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    accessToken: null,
    authenticated: false,
    checked: false,
    error: false,
  });

  const authenticate = (credentials) => {
    setState({
      ...state,
      ...credentials,
      checked: true,
    });
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/check`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        const { user, accessToken } = data;
        authenticate({ user, accessToken, authenticated: true });
      })
      .catch((err) => {
        authenticate({});
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authenticate,
      }}
    >
      {state.checked ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
