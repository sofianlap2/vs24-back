import React, { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../../../theme';

const ChartPieEspaceSecteur = () => {
  const [data, setData] = useState([]);
  const [selectedGouvernorat, setSelectedGouvernorat] = useState('');
  const theme = useTheme();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const tokenValue = Cookies.get('token');
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); // Check if it's a desktop device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/espacePublic/statistics1/${selectedGouvernorat}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        console.log("Réponse de l'API:", response.data); // Pour vérifier la réponse

        const transformedData = response.data.map(item => ({
          id: item.typeEspace,
          label: item.typeEspace,
          value: item.count,
        }));
        

        console.log("Données transformées:", transformedData); // Pour vérifier les données transformées

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedGouvernorat) {
      fetchData();
    }
  }, [selectedGouvernorat]);

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
      maxWidth: '400px',
      margin: '10px',
      marginTop: '10vh',
    },
    chart: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: isMobile ?'50vw':'15vw',
      marginLeft: isMobile ?'12vw':'20vw',
    },
    chart1: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: isMobile ?'1vw':'2vw',
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
        marginLeft: isMobile ?'25vw':'16vw',
        marginBottom:'-50px',
        width:isMobile? '70px':'150px',
        padding: '1px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc'
    },
    h3: {
      fontSize: isMobile?'15px':'20px',
      textAlign: 'center', fontFamily: 'Constantia', fontWeight: 'bold',display:'flex',marginLeft: isMobile?'60px':'120px',
      alignItems:'center'
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
         <h3 style={styles.h3}>Statistiques d'espace public par type de secteur </h3>

      <select
        style={styles.select}
        value={selectedGouvernorat}
        onChange={(e) => setSelectedGouvernorat(e.target.value)}
      >
        <option value="">Sélectionner un gouvernorat</option>
        <option style={{ fontFamily: 'Constantia' }} value="Ariana">Ariana</option>
        <option style={{ fontFamily: 'Constantia' }} value="Béja">Béja</option>
        <option style={{ fontFamily: 'Constantia' }} value="BenArous">BenArous</option>
        <option style={{ fontFamily: 'Constantia' }} value="Bizerte">Bizerte</option>
        <option style={{ fontFamily: 'Constantia' }} value="Gabès">Gabès</option>
        <option style={{ fontFamily: 'Constantia' }} value="Gafsa">Gafsa</option>
        <option style={{ fontFamily: 'Constantia' }} value="Jendouba">Jendouba</option>
        <option style={{ fontFamily: 'Constantia' }} value="Kairouan">Kairouan</option>
        <option style={{ fontFamily: 'Constantia' }} value="Kasserine">Kasserine</option>
        <option style={{ fontFamily: 'Constantia' }} value="Kébili">Kébili</option>
        <option style={{ fontFamily: 'Constantia' }} value="LeKef">Le Kef</option>
        <option style={{ fontFamily: 'Constantia' }} value="Mahdia">Mahdia</option>
        <option style={{ fontFamily: 'Constantia' }} value="LaManouba">LA Manouba</option>
        <option style={{ fontFamily: 'Constantia' }} value="Médenine">Médenine</option>
        <option style={{ fontFamily: 'Constantia' }} value="Monastir">Monastir</option>
        <option style={{ fontFamily: 'Constantia' }} value="Nabeul">Nabeul</option>
        <option style={{ fontFamily: 'Constantia' }} value="Sfax">Sfax</option>
        <option style={{ fontFamily: 'Constantia' }} value="SidiBouzid">Sidi Bouzid</option>
        <option style={{ fontFamily: 'Constantia' }} value="Siliana">Siliana</option>
        <option style={{ fontFamily: 'Constantia' }} value="Sousse">Sousse</option>
        <option style={{ fontFamily: 'Constantia' }} value="Tataouine">Tataouine</option>
        <option style={{ fontFamily: 'Constantia' }} value="Tozeur">Tozeur</option>
        <option style={{ fontFamily: 'Constantia' }} value="Tunis">Tunis</option>
        <option style={{ fontFamily: 'Constantia' }} value="Zaghouan">Zaghouan</option>
      </select>
      {data.length > 0 ? (
          <div style={styles.chart1}>
            <ResponsivePie
              data={data}
              margin={{ top: 1, right: 50, bottom: 50, left: 50 }}
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
              motionDamping={45}
            />
          </div>
        ) : (
          <p style={{textAlign :'center',alignContent:'center',marginLeft:'50px', color:'yellow',marginTop:'20px'}}>Aucune donnée disponible pour le gouvernorat sélectionné.</p>
        )}
    
      
    </div>
  );
};

export default ChartPieEspaceSecteur;
