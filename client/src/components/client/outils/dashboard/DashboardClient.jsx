import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { tokens } from "../../../../theme";
import { useParams } from "react-router-dom";

import { Margin } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import SidebarItems from "../sidebar/SidebarItems";
import SidebarClient from "../sidebar/sidebarClient";
import Chartpie from "./chartpie";
import ChartReclamation from "./ChartReclamation";
import HeaderClient from "../header/headerClient";
import Publicitee from "../Publicitee";

const DashboardClient = () => {
  const { email } = useParams();
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile device
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  useEffect(() => {
    const pathName = window.location.pathname;
    setShouldShowHeader(
      !pathName.includes("/signin") &&
        !pathName.includes("/requestResetPassword") &&
        !pathName.includes("/resetPassword/")
    );
  }, []);

  const styles = {
    content: {
      display: "flex",
      flex: 1,
      width: "100%",
      padding: "20px",
    },
    chartContainer: {
      display: "grid",
      gap: "20px",

      marginLeft: "0px",
    },

    chart: {
      height: "300px",
  //    maxWidth: isMobile ? "27vw" : "40vw",
      marginLeft: isMobile ? "1vw" : "10vw",
      zIndex:20,
      
    },
    header: {
      textAlign: "center",
    },
    sidebar: {
      position: "absolute",
      zIndex: 1,
    },
  };

  return (
    <main id="reclamation" className="reclamation">
    {        <HeaderClient toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
    }        
            
            <div style={{ display: 'flex' }}>
         { <SidebarClient isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)} />}
            </div>
            {/* <div className="row" style={styles.chart}>
            <Chartpie/>
            </div> */}
           <div className="row" style={styles.chart}>
            <ChartReclamation/>
            </div>

        
           
    
    </main>
  );
};

export default DashboardClient;
