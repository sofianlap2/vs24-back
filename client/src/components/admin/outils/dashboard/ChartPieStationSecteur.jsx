import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useMediaQuery, useTheme } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import Select from 'react-select';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartPieStationSecteur = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [selectedGouvernorat, setSelectedGouvernorat] = useState('');
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedGouvernorat) return;

      try {
        const response = await axios.get(`${appUrl}/espacePublic/getStatisticsStationByGouvernoratAndType/${selectedGouvernorat}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        const data = response.data;

        // Get unique types of spaces
        const typesEspace = [...new Set(data.map(item => item.typeEspace))];

        // Prepare data for chart
        const datasets = typesEspace.map(type => {
          return {
            label: type,
            data: data.filter(item => item.typeEspace === type).map(item => item.count),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 5)`
          };
        });

        setChartData({
          labels: [selectedGouvernorat],
          datasets: datasets,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [selectedGouvernorat, appUrl]);

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
      flexWrap: 'wrap',
      padding: '20px',
    },
    chartContainer: {
      flex: '1 1 50%',
      height: '300px',
      maxWidth: '130%',
      margin: '10px',
      marginTop: '8vh',
    },
    chart: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: isMobile ?'60vw':'28vw',
      marginLeft: isMobile ?'5vw':'20vw',
    },
    chart1: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: isMobile ?'-1vw':'2vw',
      marginLeft: isMobile ?'12vw':'2vw',
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    select:{
        zIndex: 20,
        marginLeft: isMobile ?'35vw':'16vw',
        marginBottom:'-60px',
        width:isMobile? '100px':'150px',
        padding: '1px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc'
    },
    h3:{
      textAlign: 'center', 
      fontFamily: 'Constantia',
       fontSize: isMobile?'17px':'20px',
        fontWeight: 'bold' ,
      marginLeft: isMobile ?'25vw':'2vw',
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
        fill: '#000',
      },
    },
  });
  const gouvernoratOptions = [
    { value: 'Ariana', label: 'Ariana' },
    { value: 'Béja', label: 'Béja' },
    { value: 'BenArous', label: 'Ben Arous' },
    { value: 'Bizerte', label: 'Bizerte' },
    { value: 'Gabès', label: 'Gabès' },
    { value: 'Gafsa', label: 'Gafsa' },
    { value: 'Jendouba', label: 'Jendouba' },
    { value: 'Kairouan', label: 'Kairouan' },
    { value: 'Kasserine', label: 'Kasserine' },
    { value: 'Kébili', label: 'Kébili' },
    { value: 'LeKef', label: 'Le Kef' },
    { value: 'Mahdia', label: 'Mahdia' },
    { value: 'LaManouba', label: 'La Manouba' },
    { value: 'Médenine', label: 'Médenine' },
    { value: 'Monastir', label: 'Monastir' },
    { value: 'Nabeul', label: 'Nabeul' },
    { value: 'Sfax', label: 'Sfax' },
    { value: 'SidiBouzid', label: 'Sidi Bouzid' },
    { value: 'Siliana', label: 'Siliana' },
    { value: 'Sousse', label: 'Sousse' },
    { value: 'Tataouine', label: 'Tataouine' },
    { value: 'Tozeur', label: 'Tozeur' },
    { value: 'Tunis', label: 'Tunis' },
    { value: 'Zaghouan', label: 'Zaghouan' },
  ];

  return (
    
    <div style={styles.chart}>
      <h3 style={styles.h3}>Statistiques de station par type de secteur</h3>
      <Select
        options={gouvernoratOptions}
        value={gouvernoratOptions.find(option => option.value === selectedGouvernorat)}
        onChange={option => setSelectedGouvernorat(option ? option.value : null)}
        styles={{
          control: base => ({
            ...base,
            fontFamily: 'Constantia',
            color: 'hsl(0, 0%, 40%)',
            marginLeft: isMobile ?'22vw':'12vw',
            width: isMobile ?'200px':'250px'


          }),
          menu: base => ({
            ...base,
            fontFamily: 'Constantia',
            color: 'hsl(0, 0%, 40%)',
            marginLeft: isMobile ?'22vw':'12vw',
            width: isMobile ?'200px':'250px'

            
          }),
        }}
      />
      <div style={styles.chartContainer}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: isMobile ? 10 : 14,
                  },
                },
              },
              title: {
                display: true,
                text: '',
                font: {
                  size: 15,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                  maxRotation: 0,
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 10,
                  },
                },
              },
            },
          }}
          style={{ height: '50vh', width: '138%' }}
        />
      </div>
    </div>
  );
};

export default ChartPieStationSecteur;
