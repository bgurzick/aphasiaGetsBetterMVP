import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StrokeCenters() {
  const [selectedState, setSelectedState] = useState('');
  const [strokeCenters, setStrokeCenters] = useState([]);
  const [states, setStates] = useState([]);

  // fetch states and initial stroke centers
  useEffect(() => {
    const fetchStatesAndCenters = async () => {
      try {
        const statesResponse = await axios.get('/api/states');
        setStates(statesResponse.data);
        const strokeCentersResponse = await axios.get('/api/stroke-centers');
        setStrokeCenters(strokeCentersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatesAndCenters();
  }, []);

  const handleStateChange = async (event) => {
    setSelectedState(event.target.value);
    if (event.target.value) {
      try {
        const response = await axios.get(`/api/stroke-centers/${event.target.value}`);
        setStrokeCenters(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // reset stroke centers to display all
      setStrokeCenters([]);
    }
  };

  return (
    <div>
      <h1>Certified Comprehensive Stroke Centers</h1>
      <p>Warning: this list may not be entirely accurate or up-to-date.</p>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select a state</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <h2>Stroke Centers</h2>
      {strokeCenters.length > 0 ? (
        <ul>
          {strokeCenters.map(center => (
            <li key={center._id}>
              {center.name} - {center.city}, {center.state}
              <br />
              <a href={center.website} target="_blank" rel="noopener noreferrer">Website</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stroke centers found in this state.</p>
      )}
    </div>
  );
}

export default StrokeCenters;
