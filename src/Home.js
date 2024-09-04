import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection } from 'firebase/firestore';
import db from './firebase';

const Home = () => {
  const [username, setUsername] = useState('');
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [convId, setConvId] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "Users", username), {
        userId: username
      });

      alert('Username saved successfully!');
      setIsChatEnabled(true);
    } catch (error) {
      console.error('Error saving username:', error);
      alert('Failed to save username. Please try again.');
    }
  };

  const generateRandomId = () => {
    const millisecondsSinceEpoch = Date.now();
    return Math.floor(millisecondsSinceEpoch / 1000).toString();
  };

  const handleCreateChat = async () => {
    const convId = generateRandomId();

    await setDoc(doc(db, "Conversations", convId), {
        convId: convId,
        users: [username]
      });
    
    setConvId(convId);

    if (convId) {
      navigate(`/conversation/${convId}-${username}`);
    } else {
      alert('Please enter a valid conversation ID.');
    }
  };

  const handleJoin = () => {
    
    if (convId) {
      navigate(`/conversation/${convId}-${username}`);
    } else {
      alert('Please enter a valid conversation ID.');
    }
  };

  return (
    <div>
      <label htmlFor="username">Enter your username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <div>
        <button style={{backgroundColor: isChatEnabled ? 'blue' : 'gray',
          color: 'white',
          border: 'none',
          cursor: isChatEnabled ? 'pointer' : 'not-allowed'}}
          onClick={handleCreateChat}
          disabled={!isChatEnabled}>
          Create Chat
        </button>
      </div>
      <div>
        <input type="text" value={convId} onChange={(e) => setConvId(e.target.value)} placeholder="Enter conversation ID" />
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
};

export default Home;