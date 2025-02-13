// locationController.js
const fetch = require("node-fetch"); // To make API requests for geocoding

// Function to fetch the current coordinates from the user's browser (from navigator.geolocation)
export const getCoordinates = (req, res) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        // Optionally, you can store it in a session or send as a response
        sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

        res.status(200).json({
          success: true,
          coordinates: userCoordinates,
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    );
  } else {
    res.status(400).json({
      success: false,
      message: "Geolocation is not supported by this browser.",
    });
  }
};
