import axios from "axios";
import { Button } from "react-bootstrap";
import { checkAuth } from "../client/hocs/checkAuth";
import { loggedOut } from "../client/hocs/redirect";

const Profile = () => {
  const logoutHandler = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Profile</h1>
      <Button variant="danger" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export const getServerSideProps = checkAuth();

export default loggedOut(Profile, "/login");
