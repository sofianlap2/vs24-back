import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header';
import Sidebarrr from '../Sidebar';
import { tokens } from "../../../../theme";
import { ResponsivePie } from '@nivo/pie';
import {  useParams } from "react-router-dom";
const ChartPieStation = () => {
    const { email } = useParams();
    const tokenValue = Cookies.get("token");
    const [data1, setData1] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchData1 = async () => {
          try {
            const response = await axios.get(`${appUrl}/station/${email}/dashboardStation`, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `${Cookies.get('token')}`,
              },
            });
    
            const transformedData1 = response.data.map(item => ({
              id: item._id,
              label: item._id,
              value: item.count,
            }));
    
            setData1(transformedData1);
          } catch (error) {
          }
        };
    
        fetchData1();
      }, []);
      const getTheme = () => ({
        axis: {
          ticks: {
            text: {
              fill: colors.primary[400],
            },
          },
        },
        grid: {
          line: {
            stroke: theme.palette.primary.main,
          },
        },
      });
    
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
          width:'100%',
          marginTop: '10vh',
          marginLeft: '22vw',
          sliceLabelsTextColor:'#fff',
        },
        header: {
          textAlign: 'center',

        },
        sidebar: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }
      };
  return (
    <div style={styles.chart}>
    <h3   style={{textAlign: 'center',fontFamily: 'Constantia',fontWeight:"bold"}}    >Stations par Gouvernorat</h3>
    <ResponsivePie
      data={data1}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'set2' }}
      theme={getTheme()}
      borderWidth={1}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor={theme.palette.secondary}
      radialLabelsLinkColor={{ from: 'color' }}
      sliceLabelsSkipAngle={10}
      // sliceLabelsTextColor={theme.palette.text.secondary}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
  )
}

export default ChartPieStation;
