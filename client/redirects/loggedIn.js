import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const LoggedIn = ({ children }) => {
  const router = useRouter();

  const { authenticated } = useSelector((state) => state.users);
  console.log(authenticated);

  React.useEffect(() => {
    if (authenticated) {
      router.push("/profile");
    }
  }, [authenticated]);

  return <div>{children}</div>;
};

export default LoggedIn;
