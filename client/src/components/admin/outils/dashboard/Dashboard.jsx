import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../Header";
import Sidebarrr from "../Sidebar";
import { tokens } from "../../../../theme";
import { useParams } from "react-router-dom";

import ChartBarEspace from "./chartBarEspace";
import ChartPieEspace from "./chartPieEspace";
import ChartPieStation from "./chartPieStation";
import ChartGeoEspace from "./chartGeoEspace";

const Dashboard = () => {
  const { email } = useParams();
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile device

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
      flex: 1,
      height: "300px",
      maxWidth: isDesktop ? "250px" : "70vw",
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
    <main>
      {shouldShowHeader && <Header />}
      <div >
      <div className="row" style={{ position: "absolute",top: 0,right: 1,zIndex: 1,}}>{shouldShowHeader && <Sidebarrr />}</div>
        <div style={styles.content} className="row">
          <div style={styles.chartContainer}>
           
            <div style={styles.chart}>
              <ChartPieEspace />
            </div>
            <div style={styles.chart}>
              <ChartPieStation />
            </div>
            <div style={styles.chart}>
              <ChartGeoEspace />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
