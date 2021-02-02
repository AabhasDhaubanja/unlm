import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
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
        <Container>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={emailHandler}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={passwordHandler}
              onKeyUp={enterHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button onClick={loginHandler} variant="dark">
            {loading ? (
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden"> </span>
              </div>
            ) : (
              <span>SignIn</span>
            )}
          </Button>
          <div className="pointer py-5">
            <span>Don't have an account?</span>
            <Link href="/comming">
              <u>
                {" "}
                <b>Sign up</b> here
              </u>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default loggedIn(Login);
