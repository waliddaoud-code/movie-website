import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";

function NavBar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <nav className={`navbar ${isHomePage ? "absolute-nav" : ""}`}>
      <div className="navbar-brand">
        <Link to="/">
          <span>Valid</span>
          <span>Stream</span>
        </Link>
      </div>

      <div className="navbar-links">
        <div className="search">
          <FontAwesomeIcon
            icon={faSearch}
            color="white"
            size="2x"
            className="search-icon"
          />
          <SearchBar />
        </div>

        <Link to="/">
          <FontAwesomeIcon
            className="fa"
            icon={faHouse}
            size="2x"
            color="white
        "
          />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
