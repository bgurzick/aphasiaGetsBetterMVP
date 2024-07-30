import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SpeechPractice() {
  const [userProfile, setUserProfile] = useState(null);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      generateSentences(userProfile);
    }
  }, [userProfile]);

    // generate sentences based on user profile data
  const generateSentences = (userProfile) => {
  
    const { name, siblings, bestFriends } = userProfile;
    const sentenceTemplates = [
      `Where is ${siblings[0]}?`,
      `What did you do with ${bestFriends[0]} yesterday?`,
      `Tell me about ${name}'s favorite hobby.`,
    
    ];

    const generatedSentences = sentenceTemplates.map(template => {
      const sentence = template.replace(/\${(\w+)}/g, (match, key) => userProfile[key]);
      return sentence;
    });

    setSentences(generatedSentences);
  };

  const handleSaveSentence = async (sentence) => {
    try {
      const response = await axios.post('/api/users/save-sentence', { sentence, userId: userProfile._id }); 
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Speech Practice</h1>
      {sentences.map((sentence, index) => (
        <div key={index}>
          {sentence}
          <button onClick={() => handleSaveSentence(sentence)}>Save Sentence</button>
        </div>
      ))}
    </div>
  );
}

export default SpeechPractice;
