import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from './utils/firebase'
import CheckBox from './CheckBox'
import './SignUp.css'

const SignUp = (props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();
    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        TwoFactorAuthEnable: false
    })

    const { displayName, email, password, confirmPassword, TwoFactorAuthEnable } = contact;
    console.log(contact);

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
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            //console.log(response)
            await createUserDocFromAuth(user, { displayName, TwoFactorAuthEnable });
            nav("/Login"); //If successful -> goto login page
        } catch (error) {
            setErrorMessage("Error in creating account! Try Again!")
            console.log('error in creating user', error.message)
        }
    }

    //added to control the TwoFactorAuthEnable
    //The user can trun it on or off
    const handleMouse = () => {
        const valueMouse = !(contact.TwoFactorAuthEnable);
        setContact((preValue) => ({
            ...preValue,
            TwoFactorAuthEnable: valueMouse,
        }));
    }

    return (
        <div className='signup'>
            <h1>Create a DevLink Account</h1>
            <table className='table'>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input
                                name='displayName'
                                type='text'
                                onChange={handleChange}
                                value={contact.displayName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
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
                        <td>Password</td>
                        <td>
                            <input
                                name='password'
                                type='password'
                                onChange={handleChange}
                                value={contact.password}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Confirm password</td>
                        <td>
                            <input
                                name='confirmPassword'
                                type='password'
                                onChange={handleChange}
                                value={contact.confirmPassword}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="ui fitted toggle checkbox">
                            <CheckBox change={handleMouse}></CheckBox>
                        </td>
                        <td><label>Enable Two Factor Authorisation!</label></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleSubmit}>Sign Up</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {errorMessage && (
                                <p className="error"> {errorMessage} </p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default SignUp
