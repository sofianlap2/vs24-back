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
const SidebarItems = () => {
  const { email } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const Menuitems = [
  
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: `/client/dashboardClient/${window.btoa(email)}`,
    },
    {
      navlabel: true,
      subheader: 'Utilities',
    },
    {
      id: uniqueId(),
      title: 'Reclamations',
      icon: IconBell,
      href: `/client/ReclamationsClient/${window.btoa(email)}`,
    },
    {
      id: uniqueId(),
      title: 'Espaces',
      icon: IconBuildingSkyscraper,
      href: `/client/espacesClient/${window.btoa(email)}`,
    },
    {
          id: uniqueId(),
          title: 'Stations',
          icon: IconChargingPile,
          href: `/client/stationsClient/${window.btoa(email)}`,
        },
        {
          id: uniqueId(),
          title: 'Questionnaire',
          icon: IconHelp,
          href: `/client/questionManagement/${window.btoa(email)}`,
        },
        {
          id: uniqueId(),
          title: 'Publicitee',
          icon: IconBuildingSkyscraper,
          href: `/client/Publicitee/${window.btoa(email)}`,
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
export default SidebarItems;