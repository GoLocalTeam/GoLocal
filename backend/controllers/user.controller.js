import React, { useState, useEffect } from "react";

export const GetLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // Fetching current location when the component mounts
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully retrieved location
          const userCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          // Store the user coordinates in sessionStorage as a JSON string
          sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

          // Update the state with the fetched location
          setLocation({
            latitude: userCoordinates.lat,
            longitude: userCoordinates.lon,
            error: null,
          });
        },
        (error) => {
          // Error occurred while fetching location
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);
}