const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

const AUTHOR = "Szymon Zięba";
const OPENWEATHER_API_KEY = 'API_KEY_HERE';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Log application start date and author details
const startDate = new Date().toISOString();
console.log(`[APP START] Date: ${startDate}`);
console.log(`[INFO] Author: ${AUTHOR}`);
console.log(`[INFO] Server is listening on port: ${port}`);

// Serve static HTML files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Log errors to a file for better traceability in production
function logError(message) {
  const errorLog = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync('error.log', errorLog);
}

// Function to fetch weather data based on city and country
async function getWeatherData(city, country) {
  const url = `${WEATHER_API_URL}?q=${city},${country}&units=metric&appid=${OPENWEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Log the request and API response for debugging
    console.log(`[REQUEST] Date: ${new Date().toISOString()} - City: ${city}, Country: ${country}`);
    console.log(`[API RESPONSE] Status Code: ${response.status}`);

    if (!response.ok) {
      // Log detailed API response for debugging
      console.warn(`[WARNING] Invalid location or API issue. Details: ${text}`);
      throw new Error("Location not found or API issue.");
    }

    // Parse and return the weather data if the response is successful
    const data = JSON.parse(text);
    return data;

  } catch (err) {
    // Handle errors like no internet connection or API issues
    logError(`Failed to fetch weather data for ${city}, ${country}: ${err.message}`);
    throw new Error("Failed to fetch weather data.");
  }
}

// POST endpoint to fetch weather by city and country
app.post('/weather', async (req, res) => {
  const { country, city } = req.body;

  try {
    const weatherData = await getWeatherData(city, country);
    res.json({ weather: weatherData });
  } catch (err) {
    const errorMessage = "Error retrieving weather data. Please try again later.";
    console.error(errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
