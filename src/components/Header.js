import { Link } from "react-router-dom";

import logo from "../assets/marvel-logo.jpg";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo} className="header-logo" alt="marvel-logo" />
      </Link>
      <div className="menu-items">
        <Link to="/characters">
          <p>CHARACTERS</p>
        </Link>
        <Link to="/comics">
          <p>COMICS</p>
        </Link>
        <Link to="/faves">
          <p>FAVES</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
