import { Link } from "react-router-dom"
import "../css/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faHeart } from "@fortawesome/free-solid-svg-icons"
  import { useLocation } from "react-router-dom";


 function NavBar() {

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <nav className={`navbar ${isHomePage ? "absolute-nav" : ""}`}>
       <div className="navbar-brand">
        <Link to="/"><span>Valid</span><span>Stream</span></Link>
      </div>

      <div className="navbar-links">
        <Link to="/"><FontAwesomeIcon className="fa" icon={faHouse} size="2x" color="white
        " /></Link>
        
        <Link to="/favorites"><FontAwesomeIcon icon={faHeart} size="2x" color="white" /></Link>
      </div>
    </nav>
  );


 }



 

export default NavBar