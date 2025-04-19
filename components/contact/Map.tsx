'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer && mapContainer._leaflet_id != null) {
      mapContainer._leaflet_id = null;
    }

    const map = L.map('map').setView([48.8566, 2.3522], 13);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    // }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);
  
    const customIcon = L.icon({
      iconUrl: '/logo-beige.jpg',
      iconSize: [30, 30], 
      iconAnchor: [20, 40], 
      popupAnchor: [0, -40],
    });
  

    L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map).bindPopup('Nous sommes ici !');
  }, []);

  return <div id="map" className="w-full h-[400px] rounded-md" />;
}
