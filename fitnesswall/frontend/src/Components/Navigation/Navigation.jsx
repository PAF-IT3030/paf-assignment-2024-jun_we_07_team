import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Create Mui Custom Theme
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#05c653", //background color
          "&:hover": {
            backgroundColor: "#04c353", //hover color
          },
        },
      },
    },
  },
});

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout=() =>{
    console.log("logout")
    handleClose()
  }

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <img src="../logo.png" alt="logo" height={50} width={50} />
        </div>
        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${5}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="py-10">
          <ThemeProvider theme={theme}>
            <Button
              sx={{
                width: "100%",
                borderRadius: "30px",
                py: "15px",
                bgcolor: "#05c653",
              }}
              variant="contained"
            >
              <b>Post</b>
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar alt="username" src="/UserAvatar.png" />
        </div>
        <div>
          <span>Tharaka Madushanka Wanshathilaka</span>
          <span className="opacity-70">@TheLionKing</span>
        </div>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navigation;
