import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { loggedOut } from "../client/hocs/redirect";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);

    axios
      .post(`/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <div>
        <div className="d-flex justify-content-center py-5 display-1">
          <FaUserCircle />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={logoutHandler}>
            {loading ? (
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden"> </span>
              </div>
            ) : (
              <span>Logout</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default loggedOut(Profile);
