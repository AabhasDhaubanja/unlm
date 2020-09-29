import axios from "axios";
import err from "../helpers/err";

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    user: null,
    accessToken: null,
  };

  componentDidMount() {
    this.checkHandler();
  }

  checkHandler = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/auth/check`, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          user: res.data.user,
          accessToken: res.data.accessToken,
        });
      })
      .catch(err);
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
