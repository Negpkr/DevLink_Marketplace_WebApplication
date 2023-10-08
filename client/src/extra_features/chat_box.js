
import React, { useState, useEffect } from 'react';
//import './ChatBox.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3010'); 

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('message', input);
      setInput('');
    }
  };

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, { text: message }]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
