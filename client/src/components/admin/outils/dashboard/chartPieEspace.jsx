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
      marginTop:isMobile ? '69vw': '10vw',
      marginLeft: '22vw',
    },
    chart1: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop:isMobile ? '-21vw': '5vw',
      marginLeft:isMobile ? '-2vw': '0vw',
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    h3: {
      fontSize: isMobile?'15px':'20px',
textAlign: 'center',fontFamily: 'Constantia',fontWeight:"bold"
    }
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
        fill: '#777777',
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
        radialLabelsTextColor={theme.palette.mode}
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor={theme.palette.mode}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
      </div>
    </div>
    
  );
};

export default ChartPieEspace;
