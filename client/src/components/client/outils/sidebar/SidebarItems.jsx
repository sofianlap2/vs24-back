import React from 'react';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import {
  IconBell,
  IconBuildingSkyscraper,
  IconExclamationCircle,
   IconLayoutDashboard,
   IconLayoutSidebarLeftCollapse,
} from '@tabler/icons';
import {  useParams } from "react-router-dom";
import { uniqueId } from 'lodash';
const SidebarItems = () => {
  const { email } = useParams();

  const Menuitems = [
  
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      href: '/dashboardClient',
    },
    {
      navlabel: true,
      subheader: 'Utilities',
    },
    {
      id: uniqueId(),
      title: 'Reclamations',
      icon: IconBell,
      href: `/ReclamationsClient/${window.btoa(email)}`,
    },
    {
      id: uniqueId(),
      title: 'Espaces',
      icon: IconBuildingSkyscraper,
      href: `/espacesClient/${window.btoa(email)}`,
    },
   
    
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
