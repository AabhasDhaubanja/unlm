import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const AdminNav = () => {
  return (
    <React.Fragment>
      <div className="fixed-top bg-white">
        <Navbar
          className="justify-content-between align-items-center"
          expand="md"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand>
            <Link href="/">
              <div className="pointer">
                <b>UNLM.</b>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link href="/admin/new">
                <a href="/admin/new" className="nav-item nav-link">
                  <span>NEW</span>
                </a>
              </Link>
              <Link href="/discover/1">
                <a href="/discover/1" className="nav-item nav-link">
                  <span>PRODUCTS</span>
                </a>
              </Link>
              <Link href="/profile">
                <a href="/profile" className="nav-item nav-link">
                  <span>PROFILE</span>
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

export default AdminNav;
