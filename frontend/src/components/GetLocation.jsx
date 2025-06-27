import React, { useState, useEffect } from 'react';

const GetLocation = ({ onLocationFetched }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          sessionStorage.setItem('user-coordinates', JSON.stringify(userCoordinates));
          setLocation({
            latitude: userCoordinates.latitude,
            longitude: userCoordinates.longitude,
            error: null,
          });
          if (onLocationFetched) {
            onLocationFetched(userCoordinates);
          }
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
          if (onLocationFetched) {
            onLocationFetched({ error: error.message });
          }
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.',
      });
      if (onLocationFetched) {
        onLocationFetched({ error: 'Geolocation is not supported by this browser.' });
      }
    }
  }, [onLocationFetched]);

  return null; // No UI, just fetches location
};

export default GetLocation;