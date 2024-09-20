import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import { tokens } from "../../../../theme";
import { useParams } from "react-router-dom";

import ChartBarEspace from "./chartBarEspace";
import ChartPieEspace from "./chartPieEspace";
import ChartPieStation from "./chartPieStation";
import ChartGeoEspace from "./chartGeoEspace";
import ChartPieEspaceSecteur from "./ChartPieEspaceSecteur";
import { Margin } from "@mui/icons-material";
import TotalCounts from "./TotalCounts";
import ChartPieStationSecteur from "./ChartPieStationSecteur";
import zIndex from "@mui/material/styles/zIndex";
import DemandStatistics from "./DemandStatistics ";

const Dashboard = () => {
  const { email } = useParams();
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile device


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

    },

    chart: {
      height: "300px",
      maxWidth: isMobile ? "70vw" : "40vw",
      marginTop:"5vh",
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
    <main>
    
      <div >
        <div style={styles.content} className="row">
          <div style={styles.chartContainer}>
           <div style={styles.chart}>
              <TotalCounts/>
            </div>
            <div style={styles.chart}>

        <DemandStatistics/>
        </div>
       
           <div style={styles.chart}>
              <ChartPieEspace />
            </div>
            <div style={styles.chart}>
              <ChartPieEspaceSecteur/>
            </div>
           
            <div style={styles.chart}>
              <ChartPieStation />
            </div>
            <div style={styles.chart}>
              <ChartPieStationSecteur />
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
