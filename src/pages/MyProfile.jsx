
import React, { useState } from 'react';
import ProfileForm from '../components/ProfileForm';

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    currentCity: '',
    hometown: '',
    siblings: [],
    bestFriends: [],
  });

  //uses fetch to send a POST request
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('/api/user_profiles/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    
      // update state with new profile, error handling
      if (response.ok) {
        setUserProfile(data); 
        console.log('user profile created successfully:', data);
      } else {
        console.error('error creating user profile:', data.error);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };


  return (
    <div>
      <h1>My Profile</h1>
      <ProfileForm onSubmit={handleFormSubmit} initialValues={userProfile} />
    </div>
  );
};



export default MyProfile;
