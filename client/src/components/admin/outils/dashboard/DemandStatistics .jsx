import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMediaQuery, useTheme } from '@mui/material';
import Select from 'react-select';

const DemandStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const theme = useTheme();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const tokenValue = Cookies.get('token');
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${appUrl}/demandes/getDemandStatistics/${selectedYear}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [selectedYear]);


  const formatStatistics = (data) => {
    const formattedData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      CLIENT: 0,
      PUBLICITAIRE: 0,
    }));

    data.forEach((item) => {
      formattedData[item.month - 1][item.typeDemande] = item.count;
    });

    return formattedData;
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year };
  });

  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      marginLeft: isMobile ?'12vw':'42vw',

    },
    dashboardContainer: {
      display: 'flex',
        height:'400px',
      marginLeft: isMobile ?'-10vw':'2vw',

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
      width: '140%',
      marginTop:  isMobile ?'-12vw':'4vw',
      marginLeft: isMobile ?'6vw':'8vw',
      
    },

    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    h3:{
        textAlign: 'center', 
        
         fontSize: isMobile?'17px':'20px',
          fontWeight: 'bold' ,
        marginLeft: isMobile ?'2vw':'12vw',
        marginTop:isMobile ? '20vw': '-2vw'

    },
    select: {
      container: (provided) => ({
        ...provided,
        zIndex: 1000,
        
        width: isMobile ? '100%' : '50%',
        marginBottom: '5vh',
     


      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        marginLeft: isMobile ?'40vw':'27vw',
        width: isMobile ?'100px':'150px'

      

      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 1000,
        marginLeft: isMobile ?' 40vw':'27vw',
        width: isMobile ?'100px':'150px'

      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? (theme.palette.mode === 'dark' ? '#666' : '#ddd') : (state.isFocused ? (theme.palette.mode === 'dark' ? '#555' : '#eee') : undefined),
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      }),
    },
    
  };
  

  return (
    <div style={styles.chart}>
      <h3 style={styles.h3}>
        Statistiques de demandes par année
      </h3>
      <Select
        options={yearOptions}
        value={yearOptions.find(option => option.value === selectedYear)}
        onChange={option => setSelectedYear(option.value)}
        styles={styles.select}
      />
      <ResponsiveContainer style={styles.dashboardContainer}>
        <LineChart data={formatStatistics(statistics)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"   tickFormatter={(tick) => monthNames[tick - 1]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CLIENT" stroke="#FAB74A" />
          <Line type="monotone" dataKey="PUBLICITAIRE" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandStatistics;
