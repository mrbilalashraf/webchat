import React from 'react';

const MessageBubble = ({ senderId, userId, msg }) => {
  const isOwnMessage = senderId === userId;
  const alignmentClass = isOwnMessage ? 'message-right' : 'message-left';

  return (
    <div className={alignmentClass}>
      <p>{msg}</p>
    </div>
  );
};

export default MessageBubble;