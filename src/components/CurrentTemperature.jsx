
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CurrentTemperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);

  
  useEffect(() => {
    const fetchTemperature = async () => {
      
      const { lat, lon } = getUserLocation(); 

      if (!lat || !lon) {
        console.error('User location not available');
        return;
      }

      try {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat,
            lon,
            appid: process.env.OPENWEATHER_API_KEY, 
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
