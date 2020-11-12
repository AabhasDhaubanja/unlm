import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/actions/users";
import err from "../helpers/err";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/check`, {
        withCredentials: true,
      })
      .then(({ data: { user, accessToken } }) => {
        dispatch(authUser(user, accessToken));
      })
      .catch(err);
  }, []);

  return <>{children}</>;
};

export default CheckAuth;
