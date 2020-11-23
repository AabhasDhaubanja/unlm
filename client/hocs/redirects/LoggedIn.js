import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import Loading from "../../components/Loading";

export default function loggedIn(Component) {
  return () => {
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
      if (authenticated) {
        window.location.href = "/";
      }
    }, [authenticated]);

    return authenticated ? <Loading /> : <Component />;
  };
}
