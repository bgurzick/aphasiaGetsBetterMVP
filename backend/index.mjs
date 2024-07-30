import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import strokeCenterRoutes from './routes/strokeCenterRoute.mjs';
import userProfileRoute from './routes/userProfileRoute.mjs';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// routes
app.use('/api/stroke_centers', strokeCenterRoutes);
app.use('/api/user_profiles' , userProfileRoute);


// 3rd party API - openweathermap.org - displays local temperature
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    try {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
    lat: lat,
    lon: lon,
    appid: process.env.OPENWEATHER_API_KEY,
    units: 'imperial',
    },
    });
    // extracts only temperature & location from the API response
    const temperature = data.main.temp;
    res.json({ temperature, location: data.name });
    } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
    });


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
