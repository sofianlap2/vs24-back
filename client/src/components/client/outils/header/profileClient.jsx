import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { IconListCheck, IconMail, IconUser, IconCircleDashed } from '@tabler/icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  // Retrieve email from token
  const token = Cookies.get("token");
  let email = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    email = decodedToken.email;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${appUrl}/users/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${appUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
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
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        {user && user.image?.data && user.image?.contentType ? (
          <Avatar
            src={`data:${user.image.contentType};base64,${user.image.data}`}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        ) : (
          <Avatar
            src="/src/assets/man.jpg"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        )}
      </IconButton>

      {/* Message Dropdown */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser />
          </ListItemIcon>
          <ListItemText>
            {user && (
              <span style={{ fontFamily: 'Constantia' }}>
                {user.fullName}
              </span>
            )}
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
                cursor: user && !user.verified ? "pointer" : "default", // Set cursor to pointer if not verified
                fontFamily: 'Constantia'
              }}
              onClick={() => {
                if (!user || !user.verified) {
                  // Only navigate if user is not verified
                  window.location.href = `/verification/${window.btoa(email)}`;
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
          {email && (
            <Link
              to={`/consulterClient/${window.btoa(email)}`}
              className="dropdown-item d-flex align-items-center"
              style={{ textDecoration: 'none', color: 'inherit' }} // Ensure link styles are reset
            >
              <ListItemText primaryTypographyProps={{ style: { fontFamily: 'Constantia' } }}>My Account</ListItemText>
            </Link>
          )}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <Link
            to="/passwordClient"
            className="dropdown-item d-flex align-items-center"
            style={{ textDecoration: 'none', color: 'inherit' }} // Ensure link styles are reset
          >
            <ListItemText primaryTypographyProps={{ style: { fontFamily: 'Constantia' } }}>Mot de Passe</ListItemText>
          </Link>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button to="/" variant="outlined" color="primary" style={{ background: '#fff',fontWeight:'bold',fontFamily:'Constantia' }} component={Link} onClick={handleLogout} fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
