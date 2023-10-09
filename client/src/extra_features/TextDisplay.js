import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';

const TextDisplay = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesRef = collection(db, 'messages');
      const messagesQuery = query(messagesRef, orderBy('timestamp'));

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(),
        }));
        setMessages(updatedMessages);
        setLoading(false); // Set loading to false once data is loaded
      });

      return () => unsubscribe(); // Unsubscribe when component unmounts
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.sender}:</strong> {message.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextDisplay;
