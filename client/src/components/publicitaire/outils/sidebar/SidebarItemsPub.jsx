import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import {
  IconBell,
  IconBuildingSkyscraper,
   IconChargingPile,
   IconHelp,
   IconHexagonLetterA,
   IconLayoutDashboard,
   IconLayoutSidebarLeftCollapse,
} from '@tabler/icons';
import {  useParams } from "react-router-dom";
import { uniqueId } from 'lodash';
const SidebarItemsPub = () => {
  const { email } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const tokenValue = Cookies.get("token");
 
  const Menuitems = [
  
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: `/pub/dashboardPub/${window.btoa(email)}`,
    },
    {
      navlabel: true,
      subheader: 'Utilities',
    },
    {
      id: uniqueId(),
      title: 'Reclamations',
      icon: IconBell,
      href: `/pub/ReclamationsPub/${window.btoa(email)}`,
    },
    {
      id: uniqueId(),
      title: 'Espaces',
      icon: IconBuildingSkyscraper,
      href: `/pub/espacesPub/${window.btoa(email)}`,
    },

        {
          id: uniqueId(),
          title: 'Publicité',
          icon: IconBuildingSkyscraper,
          href: `/pub/publicitesManagementPub/${window.btoa(email)}`,
        }
     
    
  ];
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }} >
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItemsPub;