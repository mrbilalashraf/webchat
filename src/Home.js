import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc,setDoc } from 'firebase/firestore';
import db from './firebase';
import { AuthContext } from './AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [convId, setConvId] = useState('');
  const navigate = useNavigate();

  const generateRandomId = () => {
    const millisecondsSinceEpoch = Date.now();
    return Math.floor(millisecondsSinceEpoch / 1000).toString();
  };

  const handleCreateChat = async () => {
    const convId = generateRandomId();

    await setDoc(doc(db, "Conversations", convId), {
        convId: convId,
        users: [{uid:currentUser.uid,displayName:currentUser.displayName,photoURL:currentUser.photoURL}]
      });
    
    

    setConvId(convId);

    if (convId) {
      navigate(`/conversation/${convId}`);
    } else {
      alert('Please enter a valid conversation ID.');
    }
  };

  const handleJoin = async () => {
    if (!convId) {
      return;
    }
    const docRef = doc(db, "Conversations", convId);
    const docSnap = await getDoc(docRef);
    if(docSnap.data()!={} && docSnap.data()){
      await setDoc(doc(db, "Conversations", convId), {
        convId: convId,
        users: [...docSnap.data().users, {uid:currentUser.uid,displayName:currentUser.displayName,photoURL:currentUser.photoURL}]
      });
      navigate(`/conversation/${convId}`);

    }
    else{
      alert('Please enter a valid conversation ID.');
      return;
    }
    
  };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Welcome {currentUser?.displayName}</h1>
      <div className="home">
        <div >
          <button className='button'
            onClick={handleCreateChat}
            >
            Create Chat
          </button>
        </div>
        <div >
          <input className='message_input' type="text" value={convId} onChange={(e) => setConvId(e.target.value)} placeholder="Enter conversation ID" />
          <button className={`button-join ${convId ? 'active' : 'inactive'}`}
          onClick={handleJoin}>Join</button>
        </div>
      </div>
    </div>
  );
};

export default Home;