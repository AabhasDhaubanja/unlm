import Navbar from "../components/navbars/DefaultNavbar";
import AdminNav from "../components/navbars/AdminNav";
import Footer from "../components/Footer";

import { AuthContext } from "../contexts/auth";

export default function Default(props) {
  const authContext = React.useContext(AuthContext);
  let navbar = <Navbar />;

  if (authContext.user && authContext.user.role) {
    if (
      authContext.user.role === "admin" ||
      authContext.user.role === "deliverer"
    ) {
      navbar = <AdminNav />;
    }
  }

  return (
    <div>
      {navbar}
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
