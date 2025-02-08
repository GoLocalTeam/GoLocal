// // locationController.js
// const fetch = require("node-fetch"); // To make API requests for geocoding

// // Function to fetch the current coordinates from the user's browser (from navigator.geolocation)
// const getCoordinates = (req, res) => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userCoordinates = {
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//         };

//         // Optionally, you can store it in a session or send as a response
//         sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

//         res.status(200).json({
//           success: true,
//           coordinates: userCoordinates,
//         });
//       },
//       (error) => {
//         res.status(500).json({
//           success: false,
//           message: error.message,
//         });
//       }
//     );
//   } else {
//     res.status(400).json({
//       success: false,
//       message: "Geolocation is not supported by this browser.",
//     });
//   }
// };

// // Function to convert coordinates (latitude, longitude) to a human-readable address (reverse geocoding)
// const getAddressFromCoordinates = async (req, res) => {
//   const { lat, lon } = req.body; // Fetch coordinates from the request body

//   // Ensure lat and lon are provided
//   if (!lat || !lon) {
//     return res.status(400).json({
//       success: false,
//       message: "Latitude and Longitude are required.",
//     });
//   }

//   try {
//     // Using Google Maps Geocoding API for reverse geocoding (convert coordinates to address)
//     const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "OK") {
//       const address = data.results[0]?.formatted_address;
//       res.status(200).json({
//         success: true,
//         address: address || "Address not found",
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "Error retrieving address from coordinates.",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching address from coordinates.",
//     });
//   }
// };

// // Function to convert an address to coordinates (forward geocoding)
// const getCoordinatesFromAddress = async (req, res) => {
//   const { address } = req.body; // Get address from the request body

//   // Ensure address is provided
//   if (!address) {
//     return res.status(400).json({
//       success: false,
//       message: "Address is required.",
//     });
//   }

//   try {
//     // Using Google Maps Geocoding API for forward geocoding (convert address to coordinates)
//     const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "OK") {
//       const coordinates = data.results[0]?.geometry.location;
//       res.status(200).json({
//         success: true,
//         coordinates: coordinates || "Coordinates not found",
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "Error retrieving coordinates from address.",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching coordinates from address.",
//     });
//   }
// };

// module.exports = { getCoordinates, getAddressFromCoordinates, getCoordinatesFromAddress };
