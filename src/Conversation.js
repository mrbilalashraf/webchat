import React, { useState, useEffect, useContext } from 'react';
import {onSnapshot,doc, addDoc } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import db from './firebase';
import TimeBadge from './TimeBadge';
import { AuthContext } from './AuthContext';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const currentUrl = window.location.href;
  const convId = currentUrl.split('conversation/')[1];

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Conversations", convId), (doc) => {
      if(doc.data() != {} && doc.data()) {
        setUsers(doc.data().users);
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
        console.log("Messages are here: ", messagesData);
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

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    autoGrow(event.target);
  };

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
    setMessage('');
  };

  const autoGrow = (textarea) => {
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  };

  return (
    <div className="conversation">
      <header className='chat-header'>
        <h2>Anonymous Chat</h2>
      </header>

      <div class="chat-body">
        <ul>
        <TimeBadge messages={messages} users={users} userId={currentUser.uid} profile={currentUser.photoURL} />
        </ul>
      </div>

      <footer className="chat-footer">
        <div className="footer-input-container">
          <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%' }}>
          <div className="textarea-container">
              <textarea className="growing-textarea" type="text" name="message" placeholder="Message"
              value={message}
              onChange={handleInputChange}
              rows="1" />
              <button className="send-icon" type="submit"></button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Conversation;