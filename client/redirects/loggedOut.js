import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const LoggedOut = ({ children }) => {
  const router = useRouter();

  const { authenticated } = useSelector((state) => state.users);

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/signin");
    }
  }, [authenticated]);
  return <div>{children}</div>;
};

export default LoggedOut;
