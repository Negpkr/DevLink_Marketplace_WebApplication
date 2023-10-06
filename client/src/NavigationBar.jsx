import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from './context/user.context';

function NavigationBar() {

    const { currentUser } = useContext(UserContext);

    return (
        <div >
            <div className="navbar">
                <p><Link classname='link' to='/'> DevLink Marketplace </Link></p>
                <nav className="menu">
                    <Link classname='link' to='/find_dev'> Find DEV </Link>
                    <Link classname='link' to='/find_jobs'> Find Jobs </Link>
                    {/*<Link className='link' to='/login'> Login </Link>
                    <Link className='link' to='/create_account'> Create Account </Link>*/}
                    {currentUser ? (
                        <>
                            <Link className='link' to='/profile'> Profile </Link>
                            <span className='link'>{currentUser.email}</span>
                            {/*<button onClick={handleSignOut}>Sign Out</button> //add this feature later */}
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
