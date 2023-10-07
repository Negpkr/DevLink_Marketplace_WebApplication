import React from 'react';
import NavFooter from './NavFooter';
import HomePage from './routes/HomePage.jsx';
import Login from './Login.jsx'
import SignUp from './SignUp.jsx';
import PostJob from './job-post/JobPost'
import JobList from './job-post/JobList'
import Profile from './profile';
import Payment from './Payment/Pay';
import FindDev from './components/FindDev'
import Chat from './extra_features/chat_box'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavFooter />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path='profile' element={<Profile />} />
        <Route path='create_account' element={<SignUp />} />
        <Route path='find_jobs' element={<JobList />} />
        <Route path='find_dev' element={<FindDev />} />
        <Route path='post_job' element={<PostJob />} />
        <Route path="payment" element={<Payment />} />
        <Route path="chat_box" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
