//Navigation Bar Part
import React, { useContext, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from './context/user.context';

function NavigationBar() {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    // Load the user's email from localStorage
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setCurrentUser({ email: userEmail });
        }
    }, [setCurrentUser]);

    // Save the user's email to localStorage when it changes
    useEffect(() => {
        if (currentUser && currentUser.email) {
            localStorage.setItem('userEmail', currentUser.email);
        }
    }, [currentUser]);

    return (
        <div >
            <div className="navbar">
                <p><Link classname='link' to='/'> DevLink Marketplace </Link></p>
                <nav className="menu">
                    <Link classname='link' to='/find_dev'> Find DEV </Link>
                    <Link classname='link' to='/find_jobs'> Find Jobs </Link>

                    {/*If user logged in*/}
                    {currentUser ? (
                        <>
                            <Link className='link' to='/profile'> Profile </Link>
                            <span className='link'>{currentUser.email}</span>
                        </>
                    ) : (
                        <>
                            <Link className='link' to='/login'> Login </Link>
                            <Link className='link' to='/create_account'> Create Account </Link>
                        </>
                    )}
                </nav>
            </div>
            <Outlet />
        </div>
    );
}
export default NavigationBar
