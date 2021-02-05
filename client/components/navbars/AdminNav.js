import Link from "next/link";

const AdminNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <div className="pointer navbar-brand">
            <b>UNLM.</b>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarNav"
          aria-controls="adminNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav">
            <Link href="/admin/new">
              <span className="nav-item nav-link pointer">NEW</span>
            </Link>
            <Link href="/discover/1">
              <span className="nav-item nav-link pointer">PRODUCTS</span>
            </Link>
            <Link href="/profile">
              <span className="nav-item nav-link pointer">PROFILE</span>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
