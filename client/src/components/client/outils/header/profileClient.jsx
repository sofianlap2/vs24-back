import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IconListCheck, IconMail, IconUser, IconCircleDashed } from "@tabler/icons";

const ProfileClient = React.memo(() => {
  const [user, setUser] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          const response = await axios.get(`${appUrl}/users/${email}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(`${appUrl}/logout`, {}, {
        headers: { Authorization: `${token}` },
      });
      Cookies.remove("token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{ ...(typeof anchorEl2 === "object" && { color: "primary.main" }) }}
        onClick={handleClick2}
      >
        {user && user.image?.data && user.image?.contentType ? (
          <Avatar
            src={`data:${user.image.contentType};base64,${user.image.data}`}
            sx={{ width: 35, height: 35 }}
          />
        ) : (
          <Avatar src="/src/assets/man.jpg" sx={{ width: 35, height: 35 }} />
        )}
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: "200px" } }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser />
          </ListItemIcon>
          <ListItemText>
            {user && <span>{user.fullName}</span>}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconCircleDashed />
          </ListItemIcon>
          <ListItemText>
            <span
              style={{
                color: user && user.verified ? "green" : "red",
                display: "flex",
                cursor: user && !user.verified ? "pointer" : "default",
              }}
              onClick={() => {
                if (!user || !user.verified) {
                  window.location.href = `/verification/${window.btoa(user.email)}`;
                }
              }}
            >
              {user && user.verified ? "Vérifié" : "Non vérifié"}
            </span>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          {user && (
            <Link
              to={`/client/consulterClient/${window.btoa(user.email)}`}
              className="dropdown-item d-flex align-items-center"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText>
                My Account
              </ListItemText>
            </Link>
          )}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <Link
            to="/client/passwordClient"
            className="dropdown-item d-flex align-items-center"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText >
              Mot de Passe
            </ListItemText>
          </Link>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            to="/"
            variant="outlined"
            color="primary"
            style={{ background: "#fff", fontWeight: "bold" }}
            component={Link}
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
});

export default ProfileClient;