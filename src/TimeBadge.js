import MessageBubble from './MessageBubble';
import { format, parseISO } from 'date-fns';

const TimeBadge = ({ messages, userId, sender, profile }) => {
  console.log("This is profile url", profile);
    function groupMessagesByDate(messages) {
        return messages.reduce((groups, message) => {
          const messageDate = new Date(message.time).toISOString().split('T')[0];
          if (!groups[messageDate]) {
            groups[messageDate] = [];
          }
          groups[messageDate].push(message);
          return groups;
        }, {});
      }

      function formatDateLabel(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const messageDate = parseISO(date);

        if (messageDate.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return format(messageDate, 'MMMM dd, yyyy');
        }
    }

      const groupedMessages = groupMessagesByDate(messages);
    
      return (
        <div>
      {Object.keys(groupedMessages).map((date) => (
        <div className='list' key={date}>
          <div className="date-badge" >
            {formatDateLabel(date)}
          </div>
          {groupedMessages[date].map((message) => (
            <li className={`message ${message.senderId === userId ? 'message-right' : 'message-left'}`} key={message.id}>
              <div className="message-wrapper">
              <div className="profile-pic-wrapper">
                  <img
                    src={profile}
                    className="profile-picture"
                  />
                </div>
                <MessageBubble 
                  sender={sender}             
                  msg={message.msg}
                  time={message.time}
                />
              </div>
            </li>
        ))}
        </div>
      ))}
    </div>
      );
};

export default TimeBadge;