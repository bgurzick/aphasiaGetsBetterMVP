
import React from 'react';


//creating dynamic sentences, info filled with user_profile data
//with OR operator in case the API doesn't fetch correclty
const SentenceList = ({ userProfile }) => {
    const sentences = [
        `I live in ${userProfile.currentCity || 'a great city'}.`,
        `I grew up in ${userProfile.hometown || 'a charming town'}.`,
        `${userProfile.siblings?.[0] || 'That'} is my sibling.`,
        `Have you met ${userProfile.bestFriends?.[0] || 'them'}, my friend?`,
        `${userProfile.bestFriends?.[1] || 'My friend'} and I went to the movies.`,
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