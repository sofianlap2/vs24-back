import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
  useEffect(() => {
    // Initialize the map centered on Tunisia
    const map = L.map('map').setView([34.85, 9.5], 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Function to get coordinates based on region name
    const getCoordinatesForRegion = (region) => {
      const regionCoordinates = {
        'Tunis': [36.8065, 10.1815],
        'Ariana': [36.8625, 10.1956],
        'BenArous': [36.753, 10.2189],
        'LaManouba': [36.8086, 10.0972],
        'Nabeul': [36.4516, 10.7352],
        'Zaghouan': [36.4025, 10.1425],
        'Bizerte': [37.2746, 9.8739],
        'Béja': [36.7256, 9.1817],
        'Jendouba': [36.5011, 8.7802],
        'LeKef': [36.1742, 8.7049],
        'Siliana': [36.0835, 9.3708],
        'Sousse': [35.8256, 10.6369],
        'Monastir': [35.7775, 10.8262],
        'Mahdia': [35.5047, 11.0622],
        'Sfax': [34.739, 10.760],
        'Kairouan': [35.6781, 10.0963],
        'Kasserine': [35.1676, 8.8365],
        'SidiBouzid': [35.0382, 9.4841],
        'Gabès': [33.8815, 10.0982],
        'Médenine': [33.3549, 10.5055],
        'Tataouine': [32.929, 10.4518],
        'Gafsa': [34.425, 8.7842],
        'Tozeur': [33.9197, 8.1335],
        'Kébili': [33.7044, 8.9733],
      };

      return regionCoordinates[region] || null;
    };

    // Add markers for each data point
    data.forEach(item => {
      const [region, count] = item;
      const latLng = getCoordinatesForRegion(region);

      if (latLng) {
        L.marker(latLng)
          .addTo(map)
          .bindPopup(`${region}: ${count}`)
          .openPopup();
      }
    });

    // Clean up the map instance when the component unmounts
    return () => {
      map.remove();
    };
  }, [data]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
