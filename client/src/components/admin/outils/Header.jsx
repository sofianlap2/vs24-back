import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, IconButton, Badge, Menu, MenuItem, List, ListItem, ListItemText, Avatar, Grid } from '@mui/material';
import Profile from './profile';
import LightModeOutlinedIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { ColorModeContext, useMode } from '../../../theme';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:9090';
const socket = io(`${appUrl}`);

const Header = () => {
  const [user, setUser] = useState(null);
  const [theme, colorMode] = useMode();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const MAX_NOTIFICATIONS = 7;
  const navigate = useNavigate(); // Initialize useNavigate

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

  const markNotificationAsRead = async (notification) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      await axios.post(`${appUrl}/notification/${notification._id}/read`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n._id === notification._id ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prevUnreadCount => prevUnreadCount - 1);

      // Navigate if the notification type is "stopPub"
      if (notification.type === 'stopPub') {
        navigate(`/admin/publicite/${notification.referenceId}/details`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      await axios.delete(`${appUrl}/notification/${notificationId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification._id !== notificationId)
      );
      setUnreadCount(prevUnreadCount => prevUnreadCount > 0 ? prevUnreadCount - 1 : 0);
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
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
                href={`/admin/dashboard/${window.btoa(email)}`}
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
                      <List dense>
                        {notifications.length === 0 ? (
                          <MenuItem onClick={handleCloseMenu}>
                            <ListItemText primary="0 notifications" />
                          </MenuItem>
                        ) : (
                          notifications.map((notification) => (
                            <ListItem
                              key={notification._id}
                              button
                              onClick={() => {
                                markNotificationAsRead(notification); // Updated function call
                                handleCloseMenu();
                              }}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: notification.read ? '#ffffff' : '#000000',
                              }}
                            >
                              <ListItemText
                                primary={
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{notification.message}</span>
                                    <span style={{ fontSize: '0.8em', color: '#888' }}>{formatTimeAgo(notification.createdAt)}</span>
                                  </div>
                                }
                              />
                              <IconButton onClick={() => deleteNotification(notification._id)}>
                                <CloseIcon />
                              </IconButton>
                            </ListItem>
                          ))
                        )}
                      </List>
                    </Menu>
                  </li>
                  <li>
                        <Profile/>
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
