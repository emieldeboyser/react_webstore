import "./Header.css";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContainer";

const Header = ({ onLogout }) => {
  const { user } = useAuthContext();

  return (
    <header className="header">
      <div className="logo">
        <img src="../images/logo.png" alt="logo" />
        <Link to="/">
          <h1 className="title">KLJ Keerbergen</h1>
        </Link>
      </div>
      <div className="header__submenu">
        <Link to="/catalogus">Catalogus</Link>
        <Link to="/wishlist">Wishlist</Link>
        {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
        <Button color="alert" onClick={onLogout}>
          Logout
        </Button>{" "}
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
