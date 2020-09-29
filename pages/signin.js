import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

class Signin extends React.Component {
  state = {
    email: null,
    password: null,
  };

  loginHandler = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
        { ...this.state },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  emailHandler = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    });
  };
  passwordHandler = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <Form.Group controlId="formBasicEmail"> */}
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
                onChange={this.emailHandler}
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
                onChange={this.passwordHandler}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
            <Button onClick={this.loginHandler} variant="dark">
              SignIn
            </Button>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Signin;
