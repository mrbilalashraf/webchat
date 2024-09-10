import React from 'react';

const MessageBubble = ({ sender, msg, time }) => {
  console.log(time);
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div>
      <span className='message_sender'>{sender}</span>
      <p>{msg}</p>
      <span className='message_time'>{formattedTime}</span>
    </div>
  );
};

export default MessageBubble;