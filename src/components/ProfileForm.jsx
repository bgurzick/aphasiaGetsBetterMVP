
import React, { useState } from 'react';

//use initial values
const ProfileForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues); 


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

//handler function prevents default, calls onSubmit prop
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);   
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="currentCity">Current City:</label>
      <input
        type="text"
        id="currentCity"
        name="currentCity"
        value={formData.currentCity}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="hometown">Hometown:</label>
      <input
        type="text"
        id="hometown"
        name="hometown"
        value={formData.hometown}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="siblings">Siblings (comma separated):</label>
      <input
        type="text"
        id="siblings"
        name="siblings"
        value={formData.siblings.join(', ')}
        onChange={(event) =>
          setFormData({ ...formData, siblings: event.target.value.split(',') })
        }
      />
      <br />

      <label htmlFor="bestFriends">Best Friends (comma separated):</label>
      <input
        type="text"
        id="bestFriends"
        name="bestFriends"
        value={formData.bestFriends.join(', ')}
        onChange={(event) =>
          setFormData({ ...formData, bestFriends: event.target.value.split(',') })
        }
      />
      <br />

      <button type="submit">Register</button>
    </form>
  );
};



export default ProfileForm;
