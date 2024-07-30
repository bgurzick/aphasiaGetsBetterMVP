
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//creating dynamic sentences, info filled with user_profile data
//with OR operator in case the API doesn't fetch correclty
const SpeechPractice = () => {
  const [userProfile, setUserProfile] = useState({});
  const sentences = [
    `I live in ${userProfile.currentCity || 'a great city'}.`,
    `I grew up in ${userProfile.hometown || 'a charming town'}.`,
    `${userProfile.siblings?.[0] || 'That'} is my sibling.`,
    `Have you met ${userProfile.bestFriends?.[0] || 'them'}, my friend?`,
    `${userProfile.bestFriends?.[1] || 'My friend'} and I went to the movies.`,
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

  //utilizing Web Speech API for text-to-speech
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };


  return (
    <div>
      <h1>Speech Practice</h1>
      <ul style={{ lineHeight: '5' }}>
        {sentences.map((sentence, index) => (
          <li key={index} onClick={() => handleSpeak(sentence)}>{sentence}</li>
        ))}
      </ul>
    </div>
  );
};



export default SpeechPractice;
