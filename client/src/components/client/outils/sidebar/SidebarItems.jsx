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
   IconLayoutDashboard,
   IconLayoutSidebarLeftCollapse,
} from '@tabler/icons';
import {  useParams } from "react-router-dom";
import { uniqueId } from 'lodash';
const SidebarItems = () => {
  const { email } = useParams();
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
  const shouldShowStation = (role, verified) => {
    return role === "CLIENT" && verified === true;
  };
  const shouldShowEspace = (role, verified) => {
    return role === "PUBLICITAIRE" && verified === true;
  };
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
    ...(
      shouldShowStation(role, verified) 
      ? [{
          id: uniqueId(),
          title: 'Stations',
          icon: IconBuildingSkyscraper,
          href: `/stationsClient/${window.btoa(email)}`,
        }]
      : []
    ),
    ...(
      shouldShowEspace(role, verified) 
      ? [{
          id: uniqueId(),
          title: 'Espace sans pub',
          icon: IconBuildingSkyscraper,
          href: `/espacesSansPub/${window.btoa(email)}`,
        },
        {
          id: uniqueId(),
          title: 'Publicité',
          icon: IconBuildingSkyscraper,
          href: `/publicitesManagementPub/${window.btoa(email)}`,
        }
      ]
      : []
    ),
    
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
