import React from 'react';
import { Link } from 'react-router-dom';
import PostJob from '../job-post/PostJobLink'
import HeaderImage from '../components/HeaderImage';
import NewsletterSignUp from '../components/NewsletterSignUp';
import HomePageAbout from './HomePageAbout'

function HomePage() {

  useEffect(() => {
    return () => {
      localStorage.removeItem('jobFormData');
      localStorage.removeItem('isPaymentCompleted');
    };
  }, []); // Empty dependency array
  
  return (
    <div className="app">
      <HeaderImage
        alt="Header Image"
        scr="https://blogcdn.gmass.co/blog/wp-content/uploads/2020/12/Featured-image-what-is-an-email-header-43kb.png"
      />
      <HomePageAbout/>
      <PostJob
        text='Post a Job!'
      />
      <br></br>
      <NewsletterSignUp />
      <br></br>
      <Link className='chat_box_link' to='/chat_box'> Chat with us </Link>
    </div>
  );
}

export default HomePage;
