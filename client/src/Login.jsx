import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordReset, signOutUser, signInWithGooglePopup, createUserDocFromAuth, SigninAuthUserWithEmailAndPassword } from './utils/firebase'
import { UserContext, UserDetailContext } from './context/user.context'
import TwoFactorAuthComponent from "./extra_features/TwoFactorAuth"
import './Login.css'

const Login = (props) => {

    const nav = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [TwoFactorAuth_enable, setTwoFactorAuth_enable] = useState(false);
    const [TwoFactorAuth_varified, setTwoFactorAuth_varified] = useState(false);

    //For login with google
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    const { currentUser, setCurrentUser } = useContext(UserContext); //modified in 9.1
    //added to fetch more details from User database
    const { userDetail } = useContext(UserDetailContext);

    const [contact, setContact] = useState({
        email: '',
        password: ''
    })

    const { email, password } = contact;

    useEffect(() => {
        // to check if the user has 2FA enabled
        Object.keys(userDetail).forEach((email) => {
            if (email === contact.email) {
                const TwoFactorAuthEnabled = userDetail[email].TwoFactorAuthEnable;
                setTwoFactorAuth_enable(TwoFactorAuthEnabled);
                //**Checking**
                //console.log(TwoFactorAuth_enable)
                //console.log(email)
            }
        });
    }, [contact.email, userDetail]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setContact((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // if 2FA is not enabled yet
            if (!TwoFactorAuth_enable) {
                const { user } = await SigninAuthUserWithEmailAndPassword(email, password);
                if ({ user } != null) {
                    // Redirect to the homepage
                    nav("/")
                }
                else {
                    setErrorMessage("Error in login to account! Try Again!")
                }
                //console.log({user});
                setCurrentUser(user)
            }
            else {
                // if 2FA is enabled and varified
                if (TwoFactorAuth_varified) {
                    const { user } = await SigninAuthUserWithEmailAndPassword(email, password);
                    if ({ user } != null) {
                        // Redirect to the homepage
                        nav("/")
                    }
                    else {
                        setErrorMessage("Error in login to account! Try Again!")
                    }
                    //console.log({user});
                    setCurrentUser(user)
                }
                else {
                    setErrorMessage("Varify first!")
                }
            }
        } catch (error) {
            console.log('Error in login', error.message)
            setErrorMessage("Error in login to account! Try Again!")
        }
    }

    const handleVerified = (isVerified) => {
        setTwoFactorAuth_varified(isVerified);
        console.log(TwoFactorAuth_varified)
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
            //remore local storage for userEmail
            localStorage.removeItem('userEmail');
        } catch (error) {
            console.error('Error signing out:', error.message);
            setErrorMessage('Error signing out! Try Agian!')
        }
    };

    const handlePasswordReset = async () => {
        console.log(contact.email)
        if (contact.email) {
            try {
                await sendPasswordReset(contact.email);
                setErrorMessage('Password reset email sent successfully.')
            } catch (error) {
                console.error('Error sending password reset email:', error.message);
                setErrorMessage('Error sending password reset email.')
            }
        }
        else {
            setErrorMessage('Plase Enter Your Email!')
        };
    }

    return <div className='login'>

        <h1>Login to DevLink Account</h1>

        <table className='table'>
            <tr>
                <td>Your email</td>
                <td>
                    <input
                        name='email'
                        type='email'
                        onChange={handleChange}
                        value={contact.email}
                    />
                </td>
            </tr>
            <tr>
                <td>Your password</td>
                <td>
                    <input
                        name='password'
                        type='password'
                        onChange={handleChange}
                        value={contact.password}
                    />
                </td>
            </tr>
        </table>
        <br></br>

        <div className='login_google'>
            {currentUser ? (
                <button onClick={handleSignOut}>Log Out</button>
            ) : (
                <div>
                    <button onClick={handleSubmit}>Login</button>
                    <button onClick={logGoogleUser}>Login with Google</button>
                </div>
            )}
            {errorMessage && (
                <p className="error"> {errorMessage} </p>
            )}
        </div>
        <br></br>

        <div className='TwoFA'>
            {TwoFactorAuth_enable ? (
                <TwoFactorAuthComponent
                    Email={email}
                    Password={password}
                    onVerified={handleVerified}
                />
            ) : (<></>)
            }
        </div>
        <br></br>

        <div className='forget_password'>
            <button onClick={handlePasswordReset}>Forget Password</button>
            <Link to='/create_account' className='signup_link' id="link-to-signup"> Sign Up </Link>
        </div>
    </div>

}
export default Login
