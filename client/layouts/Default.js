import { useSelector } from "react-redux";
import Navbar from "../components/navbars/DefaultNavbar";
import AdminNav from "../components/navbars/AdminNav";
import Footer from "../components/Footer";

export default function Default(props) {
  const { user } = useSelector((state) => state.users);

  let navbar = <Navbar />;

  if (user && user.role) {
    if (user.role === "admin" || user.role === "deliverer") {
      navbar = <AdminNav />;
    }
  }

  React.useEffect(() => {}, []);

  return (
    <div>
      {navbar}
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
