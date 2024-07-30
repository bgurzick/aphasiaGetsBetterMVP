import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProfile from './pages/MyProfile';
import DailySchedule from './pages/DailySchedule';
import SpeechPractice from './pages/SpeechPractice';
import StrokeCenters from './pages/StrokeCenters';
import Layout from './components/Layout';
import './App.css';


function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MyProfile />} />
            <Route path="/daily-schedule" element={<DailySchedule />} />
            <Route path="/speech-practice" element={<SpeechPractice />} />
            <Route path="/stroke-centers" element={<StrokeCenters />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
