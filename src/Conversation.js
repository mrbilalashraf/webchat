import React, { useState, useEffect, useContext } from 'react';
import {onSnapshot,doc, addDoc } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import db from './firebase';
import TimeBadge from './TimeBadge';
import { AuthContext } from './AuthContext';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const currentUrl = window.location.href;
  const convId = currentUrl.split('conversation/')[1];
  let users = [];

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Conversations", convId), (doc) => {
      if(doc.data() != {} && doc.data()) {
        users = doc.data().users;
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const messageQuery = convId
      ? query(collection(db, 'Messages'), where('convId', '==', convId))
      : query(collection(db, 'Messages'));
    
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
        messagesData.sort((a,b) => a.time - b.time);
        setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [convId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave the conversation?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);   

    };
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = event.target.elements.message.value;

    if (!messageText) return;

    await addDoc(collection(db, "Messages"), {
      senderId: currentUser.uid,
      receiverId: null,
      msg: messageText,
      time: new Date().getTime(),
      convId: convId,
    });

    event.target.elements.message.value = '';
  };

  return (
    <div className="conversation">
      <h2>Anonymous Chat</h2>
      <ul>
      <TimeBadge messages={messages} userId={currentUser.uid} sender={currentUser.displayName} profile={currentUser.photoURL} />
      </ul>
      <form onSubmit={handleSendMessage}>
        <input className='message_input' type="text" name="message" placeholder="Message" />
        <button className='button' type="submit">Send</button>
      </form>
    </div>
  );
};

export default Conversation;