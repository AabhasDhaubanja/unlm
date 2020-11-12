import axios from "axios";
import { Button } from "react-bootstrap";
import LoggedOut from "../client/redirects/loggedOut";

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
    <LoggedOut>
      <div>
        <h1>Profile</h1>

        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </LoggedOut>
  );
};

export default Profile;
