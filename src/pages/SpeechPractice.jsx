
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SentenceList from '../components/SentenceList';


const SpeechPractice = () => {
  const [userProfile, setUserProfile] = useState({});
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user_profiles/66a85496907bd373126aadd6'); 
        const data = response.data;
        setUserProfile(data[0]);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <div>
      <h1>speech practice</h1>
      <p>hint: try clicking on each sentence!</p>
      <SentenceList userProfile={userProfile} />
    </div>
  );
};



export default SpeechPractice;
