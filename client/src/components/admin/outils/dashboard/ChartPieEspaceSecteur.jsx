import React, { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../../../theme';
import Select from 'react-select';


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
      marginTop: isMobile ?'50vw':'20vw',
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
        marginLeft: isMobile ?'30vw':'16vw',
        marginBottom:'-50px',
        width:isMobile? '100px':'150px',
        padding: '1px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc'
    },
    h3:{
      textAlign: 'center', 
      fontFamily: 'Constantia',
       fontSize: isMobile?'17px':'20px',
        fontWeight: 'bold' ,
      marginLeft: isMobile ?'22vw':'2vw',
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
         <h3 style={styles.h3}>Statistiques d'espace public par type de secteur </h3>

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
              radialLabelsTextColor="#ffffff" // Change this to a color that contrasts better with the background
              radialLabelsLinkColor={{ from: 'color' }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#000000" // Change this to a color that contrasts better with the background
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
