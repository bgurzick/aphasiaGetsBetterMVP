
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//use initial values
const ProfileForm = ({ onSubmit, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [defaultUser, setDefaultUser] = useState(null);
  
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await   
     axios.post('http://localhost:3000/api/user_profiles/create', formData);
          setIsSubmitted(true);
          setFormData(response.data);
          // update form data with new user data

        } catch (error) {
          console.error('Error creating user profile:', error);
          
        }
      };


      const handleDefaultUser = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/user_profiles/66a85496907bd373126aadd6');
          const data = response.data;
          setFormData(data);
        } catch (error) {
          console.error('Error fetching default user:', error);
          
        }
      };
    
      // fetch default user data if initialValues is empty
      useEffect(() => {
        if (Object.keys(initialValues).length === 0) {
          handleDefaultUser();
        }
      }, []);


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="email">email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="currentCity">current city:</label>
      <input
        type="text"
        id="currentCity"
        name="currentCity"
        value={formData.currentCity}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="hometown">hometown:</label>
      <input
        type="text"
        id="hometown"
        name="hometown"
        value={formData.hometown}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="siblings">siblings (use commas):</label>
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

      <label htmlFor="bestFriends">best friends (use commas):</label>
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

      <button type="submit">register</button>
      <button type="button" onClick={handleDefaultUser}>default user</button>
      {isSubmitted && (
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      )}
    </form>
  );
};



export default ProfileForm;
