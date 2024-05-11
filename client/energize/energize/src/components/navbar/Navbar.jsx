import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import logo from "../../assets/logo5.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  //Signout
  const handleSignout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img src={logo} alt="Logo" style={{ width: "190px", height: "50px" }} />
        </Link>
        
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
     
      <div className="right">
        <div className="username" onClick={() => setShowDropdown(!showDropdown)}>
          <PersonOutlinedIcon />
          <span>Hi ! {username}</span>
        </div>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="dropdown">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <PersonOutlinedIcon />
                <span>Profile</span>
              </div>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="dropdown-item" onClick={handleSignout}>
              <ExitToAppOutlinedIcon />
              <span>Sign out</span>
            </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
