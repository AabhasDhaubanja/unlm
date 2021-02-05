import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { loggedIn } from "../client/hocs/redirect";

const Login = () => {
  const [state, setState] = useState({
    email: null,
    password: null,
  });

  const [loading, setLoading] = useState(false);

  const enterHandler = ({ keyCode }) => {
    if (keyCode === 13) {
      loginHandler();
    }
  };

  const loginHandler = () => {
    setLoading(true);

    axios
      .post(`/auth/login`, { ...state }, { withCredentials: true })
      .then((_) => {
        window.location.reload();
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const emailHandler = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const passwordHandler = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  return (
    <div className="py-5">
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Email address
            </label>
            <input
              onChange={emailHandler}
              type="email"
              className="form-control"
              id="loginEmail"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              onChange={passwordHandler}
              onKeyUp={enterHandler}
              type="password"
              className="form-control"
              id="loginPassword"
              aria-describedby="emailHelp"
            />
          </div>
          <button onClick={loginHandler} className="btn btn-dark">
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden"> </span>
              </div>
            ) : (
              <span>SignIn</span>
            )}
          </button>
          <div className="pointer py-5">
            <span>Don't have an account?</span>
            <Link href="/comming">
              <u>
                {" "}
                <b>Sign up</b> here
              </u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loggedIn(Login);
