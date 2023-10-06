import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import { UserProvider, UserDetailsProvider } from './context/user.context'
import { JobProvider } from './context/post.context'
//import { StaffProvider } from './context/staff.context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <UserDetailsProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </UserDetailsProvider>
    </UserProvider>
  </BrowserRouter>,

  document.getElementById('root')
);


