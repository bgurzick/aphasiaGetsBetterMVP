
import React from 'react';


//creating dynamic sentences, info filled with user_profile data
//with OR operator in case the API doesn't fetch correclty
const SentenceList = ({ userProfile }) => {
  const currentCity = userProfile?.currentCity || 'a great city';
  const hometown = userProfile?.hometown || 'a charming town';
  const siblings = userProfile?.siblings || [];
  const bestFriends = userProfile?.bestFriends || [];

  const sentences = [
    `I live in ${currentCity}.`,
    `I grew up in ${hometown}.`,
    `${siblings[0] || 'That'} is my sibling.`,
    `Have you met ${bestFriends[0] || 'them'}, my friend?`,
    `${bestFriends[1] || 'My friend'} and I went to the movies.`,
  ];

    //utilizing Web Speech API for text-to-speech
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  

  return (
    <ul style={{ lineHeight: '5' }}>
        {sentences.map((sentence, index) => (
          <li key={index} onClick={() => handleSpeak(sentence)}>{sentence}</li>
        ))}
      </ul>
  );
};


export default SentenceList;