
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//creating dynamic sentences, info filled with user_profile data
const SpeechPractice = () => {
  const [userProfile, setUserProfile] = useState({});
  const sentences = [
    `I live in ${userProfile.currentCity || 'a wonderful city'}.`,
    `I grew up in ${userProfile.hometown || 'a charming town'}.`,
    `${userProfile.siblings?.[0] || 'Someone special'} is my sibling.`,
    `Have you met my friend ${userProfile.bestFriends?.[0] || 'a great friend'}?`,
    `${userProfile.bestFriends?.[1] || 'A close friend'} and I went to the movies.`,
  ];

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
      <h1>Speech Practice</h1>
      <ul style={{ lineHeight: '1.5' }}>
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpeechPractice;
