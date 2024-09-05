import MessageBubble from './MessageBubble';

const TimeBadge = ({ messages, userId }) => {
    function groupMessagesByDate(messages) {
        return messages.reduce((groups, message) => {
          const messageDate = new Date(message.time).toLocaleDateString();
          if (!groups[messageDate]) {
            groups[messageDate] = [];
          }
          groups[messageDate].push(message);
          return groups;
        }, {});
      }

      const groupedMessages = groupMessagesByDate(messages);
    
      return (
        <div>
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className="date-badge" style={{ backgroundColor: '#71c4f5', color: 'white', padding: '5px', margin: '10px 0' }}>
            {date}
          </div>
          {groupedMessages[date].map((message) => (
          <li key={message.id}>
            <MessageBubble
              senderId={message.senderId}
              userId={userId}
              msg={message.msg}
            />
          </li>
        ))}
        </div>
      ))}
    </div>
      );
};

export default TimeBadge;