import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, IconButton, Badge, Menu, MenuItem, List, ListItem, ListItemText, Avatar, Grid } from '@mui/material';
import Profile from './profile';
import LightModeOutlinedIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { ColorModeContext, useMode } from '../../../theme';
import io from 'socket.io-client';

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:9090';
const socket = io(`${appUrl}`);

const Header = () => {
  const [user, setUser] = useState(null);
  const [theme, colorMode] = useMode();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const MAX_NOTIFICATIONS = 7;

  const logoPath =
    theme.palette.mode === 'dark'
      ? '/images/RemoteHub.png'
      : '/images/Voltwise-noir.png';

  const getLogoStyle = () => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    return {
      height: isMobile ? '40px' : '70px',
      display: 'block',
      maxWidth: '100%',
    };
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const notificationTime = new Date(createdAt);
  
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
  
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInWeeks < 4) {
      return `Il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
    } else if (diffInMonths < 12) {
      return `Il y a ${diffInMonths} mois${diffInMonths > 1 ? 's' : ''}`;
    } else {
      return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
    }
  };
  

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get("token");
      const decodedToken = token ? jwtDecode(token) : null;
      if (!token || !decodedToken) return;

      const response = await axios.get(`${appUrl}/notification/notificationsCount`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.data.status === 'SUCCESS') {
        const fetchedNotifications = response.data.data.slice(0, MAX_NOTIFICATIONS);
        setNotifications(fetchedNotifications);
        setUnreadCount(response.data.data.filter(notification => !notification.read).length);
      } else {
        console.error('Statut de la réponse non valide:', response.data.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error.response ? error.response.data : error.message);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      await axios.post(`${appUrl}/notification/${notificationId}/read`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount(prevUnreadCount => prevUnreadCount - 1);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('notification', (notification) => {
      setNotifications(prevNotifications => {
        const updatedNotifications = [notification, ...prevNotifications];
        if (updatedNotifications.length > MAX_NOTIFICATIONS) {
          updatedNotifications.pop();
        }
        return updatedNotifications;
      });
      setUnreadCount(prevUnreadCount => prevUnreadCount + 1);
    });

    socket.on('notificationRead', ({ notificationId }) => {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount(prevUnreadCount => prevUnreadCount - 1);
    });

    const token = Cookies.get('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const email = decodedToken ? decodedToken.email : '';
    if (token && email) {
      socket.emit('subscribeToNotifications', email);
    }

    return () => {
      socket.off('notification');
      socket.off('notificationRead');
    };
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  let email;
  const token = Cookies.get('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    email = decodedToken.email;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header id="header" className="header fixed-top d-flex align-items-center">
          <Grid container alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <a
                href={`/dashboard/${window.btoa(email)}`}
                className="logo d-flex align-items-center"
                style={{ height: '20px' }}
              >
                <span>
                  <img
                    src={logoPath}
                    height="70px"
                    alt="Logo"
                    loading="lazy"
                    style={getLogoStyle()}
                  />
                </span>
              </a>
            </Grid>
            <Grid item xs={6} sm={8} md={9} lg={10}>
              <nav className="header-nav ms-auto" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                <ul className="d-flex align-items-center" style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                  <li>
                    <IconButton onClick={colorMode.toggleColorMode}>
                      {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                      ) : (
                        <LightModeOutlinedIcon />
                      )}
                    </IconButton>
                  </li>
                  <li>
                    <IconButton onClick={handleOpenMenu}>
                      <Badge badgeContent={unreadCount} color="error">
                        <NotificationsOutlinedIcon />
                      </Badge>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          maxHeight: 400,
                          width: '100%',
                          maxWidth: '300px',
                        },
                      }}
                    >
                      {notifications.length > 0 ? (
                        <List>
                          {notifications.map(notification => (
                            <ListItem
                              key={notification._id}
                              button
                              onClick={() => {
                                markNotificationAsRead(notification._id);
                                handleCloseMenu();
                              }}
                            >
                              <Avatar>{(notification.type && notification.type[0])}</Avatar>
                              <ListItemText
                                primary={notification.message}
                                secondary={formatTimeAgo(notification.createdAt)}
                                style={{ color: notification.read ? 'gray' : 'white' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <MenuItem>0 notifications</MenuItem>
                      )}
                    </Menu>
                  </li>
                  <li>
                    <Profile />
                  </li>
                </ul>
              </nav>
            </Grid>
          </Grid>
        </header>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Header;
