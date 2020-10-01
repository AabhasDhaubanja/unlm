import Link from "next/link";

import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

import { GoSearch } from "react-icons/go";
// import { FaRegUserCircle } from "react-icons/fa";
// import { AiOutlineHeart } from "react-icons/ai";

const DefaultNavbar = () => {
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
                <GoSearch />
                <span className="pl-2">
                  <input type="text" placeholder="search" />
                </span>
              </div>
            </div>
          </Nav>
          <Nav>
            <Link href="/culture">
              <a href="/culture" className="nav-item nav-link">
                <span className="cultureForU">CULTURE FOR YOU</span>
              </a>
            </Link>
            <Link href="/signin">
              <a className="nav-item nav-link">LOGIN</a>
            </Link>
            <Link href="/cart">
              <a className="nav-item nav-link">CART</a>
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
