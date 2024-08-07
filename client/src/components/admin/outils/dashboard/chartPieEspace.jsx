import React, { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../../../theme';
import zIndex from '@mui/material/styles/zIndex';

const ChartPieEspace = () => {
  const { email } = useParams();
  const tokenValue = Cookies.get('token');
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/${email}/geographieChart`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${Cookies.get('token')}`,
          },
        });

        const transformedData = response.data.map(item => ({
          id: item._id,
          label: item._id,
          value: item.count,
        }));

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

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
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop:isMobile ? '50vw': '15vw',
      marginLeft: '22vw',
    },
    chart1: {
      flex: 1,
      height: '100%',
      width: '100%',
      maxWidth:'150%',
      marginTop:isMobile ? '0vw': '5vw',
      marginLeft:isMobile ? '0vw': '0vw',
      zIndex:300
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    h3:{
      textAlign: 'center', 
      fontFamily: 'Constantia',
       fontSize: isMobile?'17px':'20px',
        fontWeight: 'bold' ,
      marginLeft: isMobile ?'2vw':'2vw',
      marginTop:isMobile ? '20vw': '-2vw'

  },
  };

  const getTheme = () => ({
    axis: {
      ticks: {
        text: {
          fill: '#000000',
        },
      },
    },
    labels: {
      text: {
        fill: '#ffffff', // Change this to a color that contrasts better with the background
        fontSize: isMobile ? '12px' : '16px', // Adjust the font size based on the screen size

      },
    },
  });

  return (
    <div style={styles.chart}>
      <h3 style={styles.h3}>
      <b style={{fontFamily:'sans-serif'}}>2-</b> Espace Public par Gouvernorat
      </h3>
      <div style={styles.chart1}>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'set2' }}
        theme={getTheme()}
        borderWidth={1}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#ffffff" // Change this to a color that contrasts better with the background
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#000000"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
      </div>
    </div>
    
  );
};

export default ChartPieEspace;
