import React, { useState } from 'react';
import { createMessageCollectionAndAddMessage } from '../utils/firebase';
import { v4 as uuidv4, v4 } from 'uuid';

const MessagingComponent = ({ currentUser }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const newMessage = {
      messageId: uuidv4(),
      text: message,
      sender: currentUser.email,
      timestamp: new Date().getTime(),
      parentMessageId: null, 
    };
    await createMessageCollectionAndAddMessage(newMessage);
    setMessage('');
  };
  

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessagingComponent;
