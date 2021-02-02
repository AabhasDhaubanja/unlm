import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";
import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children, initialApolloState }) => {
  const [state, setState] = useState({
    user: null,
    accessToken: null,
    authenticated: false,
    checked: false,
    apolloClient: null,
  });

  const authenticate = (credentials) => {
    setState({
      ...state,
      ...credentials,
      checked: true,
    });
  };

  useEffect(() => {
    async function everything() {
      let user = null,
        accessToken = null,
        authenticated = false;

      try {
        const { data } = await axios.post(
          `/auth/check`,
          {},
          {
            withCredentials: true,
          }
        );

        user = data.user;
        accessToken = data.accessToken;
        authenticated = true;
      } catch (err) {
        console.log(err);
      }

      const apolloClient = useApollo(initialApolloState, accessToken);

      setState({
        ...state,
        user,
        accessToken,
        apolloClient,
        authenticated,
        checked: true,
      });
    }

    // useEffect doesn't want to be async
    everything();
    const interval = setInterval(everything, 9 * 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {state.apolloClient ? (
        <AuthContext.Provider
          value={{
            ...state,
            authenticate,
          }}
        >
          <ApolloProvider client={state.apolloClient}>
            {state.checked ? children : <Loading />}
          </ApolloProvider>
        </AuthContext.Provider>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default AuthProvider;
