import React, { useState, useEffect } from 'react';
import {onSnapshot, addDoc } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import db from './firebase';
import TimeBadge from './TimeBadge';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');

  const currentUrl = window.location.href;
  const subStrings = currentUrl.split('conversation/');
  const conversationParams = subStrings[1];
  const userParam = conversationParams.split('-');
  const convId = userParam[0];
  const username = userParam[1];

  useEffect(() => {
    const messageQuery = convId
      ? query(collection(db, 'Messages'), where('convId', '==', convId))
      : query(collection(db, 'Messages'));
    
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
        messagesData.sort((a,b) => a.time - b.time);
        setMessages(messagesData);
    });

    setUserId(username);
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

    const docRef = await addDoc(collection(db, "Messages"), {
      senderId: userId,
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
      <ul className='list'>
      <TimeBadge messages={messages} userId={userId} />
      </ul>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" placeholder="Enter your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Conversation;