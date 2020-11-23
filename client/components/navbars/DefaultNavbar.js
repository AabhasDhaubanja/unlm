import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../hocs/AuthProvider";
import { useRouter } from "next/router";
import { Navbar, Nav } from "react-bootstrap";
import { GoSearch } from "react-icons/go";

const DefaultNavbar = () => {
  const { authenticated } = useContext(AuthContext);

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
        <Navbar
          className="justify-content-between align-items-center"
          expand="md"
        >
          <div className="d-flex">
            <div className="customNavBrand">
              <Link href="/">
                <div className="pointer">
                  <b>UNLM.</b>
                </div>
              </Link>
            </div>
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
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* <Link href="/discover/[id]" as="/discover/1">
              <a className="nav-item nav-link">DISCOVER</a>
            </Link> */}
              {authenticated ? (
                <Link href="/profile">
                  <a className="nav-item nav-link">PROFILE</a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className="nav-item nav-link">LOGIN</a>
                </Link>
              )}
              <Link href="/culture">
                <a href="/culture" className="nav-item nav-link">
                  <span className="cultureForU">CULTURE OF U</span>
                </a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div style={{ height: 50, background: "red" }}>
        You are not supposed to see this.
      </div>
    </React.Fragment>
  );
};

export default DefaultNavbar;
