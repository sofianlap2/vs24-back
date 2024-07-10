import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import MapComponent from './mapComponent';
const ChartGeoEspace = () => {
  const { email } = useParams();
  const [data, setData] = useState([]);
  const theme = useTheme();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/${email}/geographieChart`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${Cookies.get('token')}`,
          },
        });


        const transformedData = response.data.map(item => [
          item._id, // Assuming _id is the region
          item.count,
        ]);


        setData(transformedData);
      } catch (error) {
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
      width:'100%',
      marginTop: '10vh',
      marginLeft: '22vw',
      zIndex: 1,

    },
    header: {
      textAlign: 'center',
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
    }
  };


  return (
    <div style={styles.chart}>
    <h3 style={{textAlign: 'center',fontFamily: 'Constantia',fontWeight:"bold"}}>Espace Public par Gouvernorat</h3>
      
        <MapComponent data={data} />
    
    </div>
  );
};

export default ChartGeoEspace;
