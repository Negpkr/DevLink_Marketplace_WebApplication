import React, { useState } from 'react';
import { createMessageCollectionAndAddMessage } from '../utils/firebase';
import { v4 as uuidv4, v4 } from 'uuid';

const TextComponent = ({ currentUser }) => {
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
    <table className='inputs'>
      <tr>
        <td><textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        /></td>
        <button className="chat_button" onClick={handleSendMessage}>Send</button>
      </tr>
    </table>

  );
};

export default TextComponent;
