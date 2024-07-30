import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
// import ToDoCategory from '../components/ToDoCategory';
// import ToDoItem from '../components/ToDoItem';

function DailySchedule() {
  const [todoItems, setTodoItems] = useState([
    {
      category: 'Appointments',
      items: [
        { id: 1, text: 'PT', isChecked: false, selectedOption: '' },
        { id: 2, text: 'OT', isChecked: false, selectedOption: '' },
       
      ]
    },
    {
      category: 'Chores',
      items: [
        
      ]
    },
    {
      category: 'Exercises',
      items: [
        
      ]
    },
    {
      category: 'Hobby or Social Activity',
      items: [
        
      ]
    }
  ]);
//state to store weather data, any errors
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const success = async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = process.env.api_Key;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}`;

      try {
        const response = await axios.get(url);   

        setWeather(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const error = (err) => {
      setError(err.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleCheckChange = (itemId, isChecked) => {
    const updatedItems = todoItems.map(category => {
      return {
        ...category,
        items: category.items.map(item => {
          if (item.id === itemId) {
            return { ...item, isChecked };
          }
          return item;
        })
      };
    });
    setTodoItems(updatedItems);
  };

  const handleOptionChange = (itemId, selectedOption) => {
    const updatedItems = todoItems.map(category => {
      return {
        ...category,
        items: category.items.map(item => {
          if (item.id === itemId) {
            return { ...item, selectedOption };
          }
          return item;
        })
      };
    });
    setTodoItems(updatedItems);
  };

  const handleAddOption = (category, newOption) => {
    const updatedItems = todoItems.map(item => {
      if (item.category === category) {
        return {
          ...item,
          items: [...item.items, { id: Date.now(), text: newOption, isChecked: false, selectedOption: '' }]
        };
      }
      return item;
    });
    setTodoItems(updatedItems);
  };

  const handleRemoveOption = (category, optionToRemove) => {
    const updatedItems = todoItems.map(item => {
      if (item.category === category) {
        return {
          ...item,
          items: item.items.filter(option => option.text !== optionToRemove)
        };
      }
      return item;
    });
    setTodoItems(updatedItems);
  };

 
  return (
    <div className="container">
      <h1>daily schedule</h1>
      <h2>today is <span id="currentDate"></span></h2>
      {error ? (
        <p>Error fetching weather: {error}</p>
      ) : weather ? (
        <p>Current Weather: {weather.main.temp}°F ({weather.weather[0].main})</p>
      ) : (
        <p>Loading weather...</p>
      )}

      {todoItems.map(category => (
        <ToDoCategory
          key={category.category}
          title={category.category}
          items={category.items}
          onCheckChange={handleCheckChange}
          onOptionChange={handleOptionChange}
          onAddOption={(newOption) => handleAddOption(category.category, newOption)}
          onRemoveOption={(optionToRemove) => handleRemoveOption(category.category, optionToRemove)}
        />
      ))}

    </div>
  );
}



export default DailySchedule;
