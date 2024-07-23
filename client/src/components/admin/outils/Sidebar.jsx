import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { tokens } from "../../../theme";
import {
  AdUnitsOutlined,
  ApartmentOutlined,
  ArchiveOutlined,
  ChatBubbleOutline,
  EvStationOutlined,
  GroupOutlined,
  NotificationImportantOutlined,
  PersonAddOutlined,
  ViewStreamOutlined,
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[1000],
      }}
      onClick={() => setSelected(title)}
    >
      {isCollapsed ? (
        <Link
          to={to}
          style={{ textDecoration: "none", color: colors.primary[100], }}
        >
          {icon}
        </Link>
      ) : (
        <Box display="flex" alignItems="center">
          {icon}
          <Link
            to={to}
            style={{ textDecoration: "none", color: colors.primary[100] }}
          >
            <Typography style={{ fontFamily: 'Constantia',color: colors.primary[100]}}>{title}</Typography>
          </Link>
        </Box>
      )}
    </MenuItem>
  );
};

const Sidebarrr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)"); // Use media query to detect mobile devices
  // Initialize isCollapsed state to true by default for desktop devices
  const [isCollapsed, setIsCollapsed] = useState(!isMobile);
  const [selected, setSelected] = useState("Dashboard");
  const { email } = useParams(); // Get email from route parameter (optional)
  const [verified, setVerified] = useState();
  const [role, setUserRole] = useState("");
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const tokenValue = Cookies.get("token");

  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${email}/userRole`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [tokenValue, email]);

  useEffect(() => {
    const fetchVerified = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${email}/userVerified`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setVerified(response.data.verified);
      } catch (error) {
        console.error("Failed to fetch user verification status:", error);
      }
    };

    fetchVerified();
  }, [tokenValue, email]);
  const shouldShowAddAdmin = (role, verified) => {
    return role === "SUPERADMIN" && verified === true;
  };
  // Update isCollapsed state when screen size changes
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        marginTop: "12vh",
        zIndex: 1000,
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        width={isCollapsed ? (isMobile ? "20px" : "80px") : "265px"} // Adjusted width for mobile and desktop
      >
        <Menu>
          {!isMobile && (
            <MenuItem
              onClick={toggleSidebar}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "10px 0px 10px 0",
                color: colors.primary,
              }}
            />
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to={`/dashboard/${window.btoa(email)}`}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            {shouldShowAddAdmin(role, verified) &&
            <Item
              title="Gestion Users"
              to={`/usersManagement/${window.btoa(email)}`}
              icon={<GroupOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />}
            <Item
              title="Gestion Demandes"
              to={`/demandeManagement/${window.btoa(email)}`}
              icon={<PersonAddOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Gestion Espaces Publics"
              to={`/espacePublicManagement/${window.btoa(email)}`}
              icon={<ApartmentOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Gestions Des Stations"
              to={`/stationsManagement/${window.btoa(email)}`}
              icon={<EvStationOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Gestions Des Cassiers"
              to={`/cassierManagement/${window.btoa(email)}`}
              icon={<ViewStreamOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Gestion Réclamations"
              to={`/reclamationsManagement/${window.btoa(email)}`}
              icon={<NotificationImportantOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Demandes Publicités"
              to={`/pubsManagement/${window.btoa(email)}`}
              icon={<AdUnitsOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Gestions Des Commentaire"
              to="/"
              icon={<ChatBubbleOutline />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            {shouldShowAddAdmin(role, verified) &&
            <Item
              title="Archive Users"
              to={`/archiveUsers/${window.btoa(email)}`}
              icon={<ArchiveOutlined />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />}
            {shouldShowAddAdmin(role, verified) && <Item
              title="Corbeille"
              to={`/corbeilleDemande/${window.btoa(email)}`}
              icon={<DeleteOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />}
            
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarrr;
