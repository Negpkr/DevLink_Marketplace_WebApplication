import React, { useContext } from 'react';
import { UserContext } from '../context/user.context';
import MessagingComponent from './chatservice';
import MessageDisplay from './chatSlice';

const SecureCommunicationPage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container">
      <h1>Secure Communication</h1>
      {currentUser ? (
        <>
          <MessagingComponent currentUser={currentUser} />
          <MessageDisplay />
        </>
      ) : (
        <p>Please sign in to use secure communication features.</p>
      )}
    </div>
  );
};

export default SecureCommunicationPage;
