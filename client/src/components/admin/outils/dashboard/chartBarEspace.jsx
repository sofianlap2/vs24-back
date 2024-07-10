import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header';
import Sidebarrr from '../Sidebar';
import {  useParams } from "react-router-dom";

import { tokens } from "../../../../theme";
import { ResponsiveBar } from '@nivo/bar';
const ChartBarEspace = () => {
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


const { email } = useParams();
const tokenValue = Cookies.get("token");
    const [data, setData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
          }
        };
    
        fetchData();
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
        },
        chart: {
          flex: 1,
          height: '100%',
          width:'100%',
          marginLeft: '22vw',
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
    <h3 style={{textAlign: 'center',fontFamily: 'Constantia',fontWeight:"bold"}}>Espace Public par Gouvernorat</h3>
    <ResponsiveBar
      data={data}
      keys={['value']}
      indexBy="id"
      margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
      padding={0.5}
      theme={getTheme()}
      colors={{ scheme: 'set2' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: -35,
        legend: 'Gouvernorat',
        legendPosition: 'middle',
        legendOffset: 42,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'N° Espace Public',
        legendPosition: 'middle',
        legendOffset: -40,
        tickValues: [0, 1, 2, 3, 4, 5],
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={theme.palette.text.secondary}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: true,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemTextColor: theme.palette.primary,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: theme.palette.secondary,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
  )
}

export default ChartBarEspace
