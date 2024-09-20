import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Typography, useTheme, useMediaQuery, IconButton, Drawer } from "@mui/material";
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
            <Typography style={{ color: colors.primary[100]}}>{title}</Typography>
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { email } = useParams(); // Get email from route parameter (optional)
 
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const tokenValue = Cookies.get("token");

  const [selectedUser, setSelectedUser] = useState(null);
 


  const toggleSidebar = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{ position: "fixed", top: 80, left: 20, zIndex: 1100 }}
          style={{color:"white"}}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleSidebar}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Sidebar
          collapsed={false}
          width="265px"
        >
          <Menu>
            <MenuItem
              onClick={toggleSidebar}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "70px 0px 10px 0",
                color: colors.primary,
              }}
            />
            <Box paddingLeft="0%">
              <Item
                title="Dashboard"
                to={`/admin/dashboard/${window.btoa(email)}`}
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestion Users"
                to={`/admin/usersManagement/${window.btoa(email)}`}
                icon={<GroupOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestion Demandes"
                to={`/admin/demandeManagement/${window.btoa(email)}`}
                icon={<PersonAddOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestion Espaces Publics"
                to={`/admin/espacePublicManagement/${window.btoa(email)}`}
                icon={<ApartmentOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestions Des Stations"
                to={`/admin/stationsManagement/${window.btoa(email)}`}
                icon={<EvStationOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestions Des Casiers"
                to={`/admin/cassierManagement/${window.btoa(email)}`}
                icon={<ViewStreamOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestion Réclamations"
                to={`/admin/reclamationsManagement/${window.btoa(email)}`}
                icon={<NotificationImportantOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Demandes Publicités"
                to={`/admin/pubsManagement/${window.btoa(email)}`}
                icon={<AdUnitsOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
              <Item
                title="Gestions Des Commentaire"
                to="/"
                icon={<ChatBubbleOutline />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
             
              <Item
                title="Archive Users"
                to={`/admin/archiveUsers/${window.btoa(email)}`}
                icon={<ArchiveOutlined />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
             <Item
                title="Corbeille"
                to={`/admin/corbeilleDemande/${window.btoa(email)}`}
                icon={<DeleteOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={false}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Drawer>
      {!isMobile && (
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
            width={isCollapsed ? "80px" : "265px"} // Adjusted width for desktop
          >
            <Menu>
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={<MenuOutlinedIcon />}
                style={{
                  margin: "10px 0px 10px 0",
                  color: colors.primary,
                }}
              />
              <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                <Item
                  title="Dashboard"
                  to={`/admin/dashboard/${window.btoa(email)}`}
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
               
                <Item
                  title="Gestion Users"
                  to={`/admin/usersManagement/${window.btoa(email)}`}
                  icon={<GroupOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Gestion Demandes"
                  to={`/admin/demandeManagement/${window.btoa(email)}`}
                  icon={<PersonAddOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Gestion Espaces Publics"
                  to={`/admin/espacePublicManagement/${window.btoa(email)}`}
                  icon={<ApartmentOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Gestions Des Stations"
                  to={`/admin/stationsManagement/${window.btoa(email)}`}
                  icon={<EvStationOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Gestions Des Casiers"
                  to={`/admin/cassierManagement/${window.btoa(email)}`}
                  icon={<ViewStreamOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Gestion Réclamations"
                  to={`/admin/reclamationsManagement/${window.btoa(email)}`}
                  icon={<NotificationImportantOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Demandes Publicités"
                  to={`/admin/pubsManagement/${window.btoa(email)}`}
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
               
                <Item
                  title="Archive Users"
                  to={`/admin/archiveUsers/${window.btoa(email)}`}
                  icon={<ArchiveOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Corbeille"
                  to={`/admin/corbeilleDemande/${window.btoa(email)}`}
                  icon={<DeleteOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
              </Box>
            </Menu>
          </Sidebar>
        </Box>
      )}
    </Box>
  );
};

export default Sidebarrr;
