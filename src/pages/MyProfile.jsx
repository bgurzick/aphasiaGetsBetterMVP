
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
      const response = await fetch('http://localhost:3000/api/user_profiles/create', {
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
      console.error('error creating user profile:', error);
    }
  };

//update user
const handleUpdateUser = async () => {
  if (!userProfile._id) {
    console.error('user profile not loaded. cannot update.');
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3000/api/user_profiles/${userProfile._id}`, userProfile);

    if (response.status === 200) {
      setUserProfile(response.data); // Update state with updated profile data
      console.log('user profile updated successfully');
    } else {
      console.error('error updating user profile:', response.data.error);
    }
  } catch (error) {
    console.error('error updating user profile:', error);
  }
};

//delete user
  const handleDeleteUser = async () => {
    if (window.confirm('are you sure you want to delete your profile?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/user_profiles/${userProfile._id}`);

        if (response.status === 200) {
          setUserProfile(); // reset user profile state
          console.log('user profile deleted successfully');
        } else {
          console.error('error deleting user profile:', response.data.error);
        }
      } catch (error) {
        console.error('error deleting user profile:', error);
      }
    }
  };

  return (
    <div>
      <h1>my profile</h1>
      <ProfileForm onSubmit={handleFormSubmit} initialValues={userProfile} />
      <button type="button" onClick={handleUpdateUser} disabled={!userProfile._id}>
        update user
      </button>
        <button type="button" onClick={handleDeleteUser} disabled={!userProfile._id}>
        delete user
      </button>
    </div>
  );
};



export default MyProfile;
