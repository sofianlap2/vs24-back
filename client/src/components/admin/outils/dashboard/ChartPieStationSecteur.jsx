import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useMediaQuery, useTheme } from '@mui/material';

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
      flex: 1,
      height: '100%',
      width: '120%',
      marginTop: isMobile ?'-1vw':'5vw',
      marginLeft: isMobile ?'1vw':'-1vw',
    },
    chart: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: isMobile ?'80vw':'25vw',
      marginLeft: isMobile ?'20vw':'23vw',
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
       fontSize: isMobile?'15px':'20px',
       fontWeight: 'bold',
       marginLeft: isMobile ?'6vw':'-2vw',
    }
  ,
  select:{
    zIndex: 20,marginLeft:isMobile? '40px':'15vw' ,
    width:isMobile? '70px':'150px',
    padding: '10x', 
    fontSize: '16px', 
    borderRadius: '5px', 
    border: '1px solid #ccc'
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
        fill: '#000',
      },
    },
  });

  return (
    
    <div style={styles.chart}>
      <h3 style={styles.h3}>Statistiques de station par type de secteur</h3>
      <select
        style={styles.select}
        value={selectedGouvernorat}
        onChange={(e) => setSelectedGouvernorat(e.target.value)}
      >
        <option value="">Sélectionner un gouvernorat</option>
        <option value="Ariana">Ariana</option>
        <option value="Béja">Béja</option>
        <option value="BenArous">Ben Arous</option>
        <option value="Bizerte">Bizerte</option>
        <option value="Gabès">Gabès</option>
        <option value="Gafsa">Gafsa</option>
        <option value="Jendouba">Jendouba</option>
        <option value="Kairouan">Kairouan</option>
        <option value="Kasserine">Kasserine</option>
        <option value="Kébili">Kébili</option>
        <option value="LeKef">Le Kef</option>
        <option value="Mahdia">Mahdia</option>
        <option value="LaManouba">La Manouba</option>
        <option value="Médenine">Médenine</option>
        <option value="Monastir">Monastir</option>
        <option value="Nabeul">Nabeul</option>
        <option value="Sfax">Sfax</option>
        <option value="SidiBouzid">Sidi Bouzid</option>
        <option value="Siliana">Siliana</option>
        <option value="Sousse">Sousse</option>
        <option value="Tataouine">Tataouine</option>
        <option value="Tozeur">Tozeur</option>
        <option value="Tunis">Tunis</option>
        <option value="Zaghouan">Zaghouan</option>
      </select>
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
                  size: 14,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                  maxRotation: 0,
                  font: {
                    size: 10,
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
          style={{ height: '50vh', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default ChartPieStationSecteur;
