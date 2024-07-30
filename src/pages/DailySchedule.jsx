
import React, { useState, useEffect } from 'react';
import CurrentTemperature from '../components/CurrentTemperature';
import ToDoList from '../components/ToDoList';

const DailySchedule = () => {
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(today);
  }, []);

  return (
    <div className="container">
      <h1>daily schedule</h1>
      <div>
        <h2>Today is <span id="currentDate">{currentDate}</span></h2>
        <CurrentTemperature />
        <ToDoList />
      </div>
      
    </div>
  );
};

export default DailySchedule;
