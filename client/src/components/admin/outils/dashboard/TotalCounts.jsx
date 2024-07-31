import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMediaQuery, useTheme } from '@mui/material';

const TotalCounts = () => {
  const [totals, setTotals] = useState({ totalEspacesPublics: 0, totalStations: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/getTotalCounts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        setTotals(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [appUrl]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;


  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      
    },
    dashboardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '20px',
    },
    chartContainer: {
      flex: '1 1 50%',
      height: '300px',
      maxWidth: '400px',
      margin: '10px',
      marginTop: '10vh',
    },
    chart: {
      marginLeft:isMobile ? '70px': '550px',
      marginTop:isMobile?'80px':'40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px', // Space between elements
      textAlign: 'center',
      fontSize: isMobile?'10px':'20px',
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    statItem: {
      flex: '1',
      margin:isMobile? '0px 0px -12px 40px': '10px -112px 10px 0px',
      border: '2px solid #ccc', // Add border
    borderRadius: '8px', // Optional: Add border radius for rounded corners
    padding: '10px', // Optional: Add padding for better spacing inside the item
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transition for transform and box-shadow
    cursor: 'pointer', // Change cursor on hover
  },
  statItemHover: {
    transform: 'scale(1.05)', // Scale up slightly on hover
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow on hover
  },
  h4:{
 fontFamily: 'Constantia', fontWeight: 'bold',
 fontSize: isMobile?'10px':'20px',

  }
  };
  return (
    <div style={styles.chart}>
    <div 
      style={{ ...styles.statItem, ...(isHovered1 ? styles.statItemHover : {}) }}
      onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}
    >
      <h4 style={styles.h4}>
        Totale :
      </h4>
      <br />
      <p style={{ color: 'red', fontFamily: 'Constantia', fontWeight: 'bold' }}>Espaces publics: </p>
      <h5 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>{totals.totalEspacesPublics}</h5>
      <p style={{ color: 'green', fontFamily: 'Constantia', fontWeight: 'bold' }}>Stations: </p>
      <h5 style={{ fontFamily: 'Constantia', fontWeight: 'bold' }}>{totals.totalStations}</h5>
  </div>
  </div>

);
};

export default TotalCounts;
