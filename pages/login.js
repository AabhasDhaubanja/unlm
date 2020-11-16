import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { checkAuth } from "../client/hocs/checkAuth";
import { loggedIn } from "../client/hocs/redirect";
import err from "../client/helpers/err";

const Login = () => {
  const [state, setState] = React.useState({
    email: null,
    password: null,
  });

  const loginHandler = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
        { ...state },
        { withCredentials: true }
      )
      .then((_) => {
        window.location.reload();
      })
      .catch(err);
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
    <div>
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
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button onClick={loginHandler} variant="dark">
            SignIn
          </Button>
        </Container>
      </div>
    </div>
  );
};

export const getServerSideProps = checkAuth();

export default loggedIn(Login, "/profile");
