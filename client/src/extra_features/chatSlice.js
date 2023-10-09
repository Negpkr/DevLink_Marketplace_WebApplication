import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(updatedMessages);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.timestamp}>
            <strong>{message.sender}:</strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;
