import axios from "axios";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { loggedOut } from "../client/hocs/redirect";

const Profile = () => {
  const logoutHandler = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <div>
        <div className="d-flex justify-content-center py-5 display-1">
          <FaUserCircle />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default loggedOut(Profile);
