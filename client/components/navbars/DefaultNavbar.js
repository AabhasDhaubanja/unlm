import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { GoSearch } from "react-icons/go";

const DefaultNavbar = () => {
  const { authenticated } = useSelector((state) => state.users);

  const router = useRouter();

  let [text, setText] = React.useState("nothing");

  const textHandler = ({ target: { value } }) => {
    setText(value);
  };

  const searchHandler = () => {
    router.push("/search/[text]", `/search/${text}`);
  };

  return (
    <React.Fragment>
      <div className="fixed-top bg-white">
        <Navbar className="justify-content-between align-items-center">
          <Nav>
            <Navbar.Brand>
              <Link href="/">
                <a className="navbar-brand">
                  <b>UNLM.</b>
                </a>
              </Link>
            </Navbar.Brand>
            <div className="searchBoxContainer">
              <div className="searchBox">
                <GoSearch onClick={searchHandler} />
                <span className="pl-2">
                  <input
                    type="text"
                    placeholder="search"
                    onChange={textHandler}
                    onKeyDown={({ key }) => {
                      if (key == "Enter") {
                        searchHandler();
                      }
                    }}
                  />
                </span>
              </div>
            </div>
          </Nav>
          <Nav>
            {/* <Link href="/discover/[id]" as="/discover/1">
              <a className="nav-item nav-link">DISCOVER</a>
            </Link> */}
            {authenticated ? (
              <Link href="/profile">
                <a className="nav-item nav-link">PROFILE</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className="nav-item nav-link">LOGIN</a>
              </Link>
            )}
            <Link href="/culture">
              <a href="/culture" className="nav-item nav-link">
                <span className="cultureForU">CULTURE OF U</span>
              </a>
            </Link>
          </Nav>
        </Navbar>
      </div>
      <div style={{ height: 60, background: "red" }}>
        You are not supposed to see this.
      </div>
    </React.Fragment>
  );
};

export default DefaultNavbar;
