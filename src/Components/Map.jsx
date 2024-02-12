import React, { useEffect } from 'react';

const GoogleMap = ({ datal }) => {
  // const API_KEY = AIzaSyCAkxHujOxLQNsI3kIilT2BMVnwGNiENl4;
  useEffect(() => {
    const loadMapScript = () => {
      // Check if Google Maps API is already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAkxHujOxLQNsI3kIilT2BMVnwGNiENl4&callback=initMap`;
        script.async = true; // Set async loading
        script.defer = true; // Set defer loading (optional)
        script.onload = initMap; // Call initMap once the script is loaded
        document.head.appendChild(script); // Append script to the document head
      } else {
        initMap();
      }
    };

    loadMapScript();

    return () => {
      // Cleanup function
      delete window.initMap;
    };
  }, [datal]); // Re-run effect if `datal` prop changes

  const initMap = () => {
    // Check if `datal` is empty or invalid
    if (!datal || datal.length === 0) {
      return; // Exit early if no data is available
    }

    // Create a new Google Map instance
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 12.971674017641948, lng: 80.04307229660826 }, // Default center
      zoom: 13, // Default zoom level
    });

    // Plot markers for each latitude and longitude in `datal`
    datal.forEach((ele) => {
      new window.google.maps.Marker({
        position: { lat: Number(ele.latitude), lng: Number(ele.longitude) },
        map: map,
      });
    });
  };

  return <div id="map" style={{ width: '100%', height: '90vh' }} />;
};

export default GoogleMap;
