import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GoSearch } from "react-icons/go";
import { AuthContext } from "../../hocs/AuthProvider";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
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
            <span className="ps-2">
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
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {authenticated ? (
              <Link href="/profile">
                <span className="nav-item nav-link pointer">PROFILE</span>
              </Link>
            ) : (
              <Link href="/login">
                <span className="nav-item nav-link pointer">LOGIN</span>
              </Link>
            )}
            <Link href="/culture">
              <span className="cultureForU nav-item nav-link pointer">
                CULTURE OF U
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
