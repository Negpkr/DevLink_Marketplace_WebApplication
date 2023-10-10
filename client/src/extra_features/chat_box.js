import React, { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import MessagingComponent from './TextComponent';
import { UserContext, UserDetailContext } from '../context/user.context';
import "./chat_box.css"

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);


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
    <div className="container">
      <h1>Communication</h1>
      {currentUser ? (
        <>
          <MessagingComponent currentUser={currentUser} />
          <div className="message-display">
            <ul>
              {messages.slice().reverse().map((message) => ( // Reverse the order of messages
                <li
                  key={message.id}
                  className={message.sender === currentUser.email ? 'sent-message' : 'receive-message'}
                >
                  {message.sender !== currentUser.email && (
                    <div className="email">{message.sender}</div>
                  )}
                  <div className="message">{message.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Please sign in to use secure communication features.</p>
      )}
    </div>
  );  
};

export default Chat;
