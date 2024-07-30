import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentTemperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);

  // function to get the user's location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (error) => reject(error)
      );
    });
  };

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const { lat, lon } = await getUserLocation(); 

        if (!lat || !lon) {
          console.error('User location not available');
          return;
        }

        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat,
            lon,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            units: 'imperial',
          },
        });

        // round to one decimal
        setTemperature(data.main.temp.toFixed(1)); 
        setLocation(data.name);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchTemperature();
  }, []);

  return (
    <p>
      {temperature && location ? (
        <span>
          current temperature in {location} is {temperature}&deg;F
        </span>
      ) : (
        <span>fetching temperature...</span>
      )}
    </p>
  );
};

export default CurrentTemperature;
