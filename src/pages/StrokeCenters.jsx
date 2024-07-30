import React, { useState } from 'react';

const StrokeCenters = () => {
  const [state, setState] = useState('');
  const [centers, setCenters] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/stroke_centers/state/${state}`);
      const data = await response.json();
      setCenters(data);
    } catch (error) {
      console.error('Error fetching stroke centers:', error);
    }
  };

  return (
    <div>
      <h1>certified stroke centers</h1>
      <p>please note: this list may not be up to date</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type the name of your state" value={state} onChange={(e) => setState(e.target.value)} />
        <button type="submit">search</button>
      </form>
      {centers.length > 0 ? (
        <ul>
          {centers.map((center) => (
            <li key={center._id}>{center.name}</li>
          ))}
        </ul>
      ) : (
        <p>no stroke centers found</p>
      )}
    </div>
  );
};



export default StrokeCenters;
