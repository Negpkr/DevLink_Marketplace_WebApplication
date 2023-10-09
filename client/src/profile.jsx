import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser, updateUserName } from "./utils/firebase";
import { UserContext, UserDetailContext } from "./context/user.context";
import CheckBox from './CheckBox'
import "./profile.css"

function Profile() {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { userDetail } = useContext(UserDetailContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [Message, setMessage] = useState("");

    const [name, setname] = useState("");
    const [newName, setNewName] = useState("");
    const [TwoFactorAuthEnable, setTwoFactorAuthEnable] = useState(false);

    // Function to sign out
    const handleSignOut = async () => {
        try {
            await signOutUser();          
            setCurrentUser(null);
            localStorage.removeItem('userEmail');
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error.message);
            setErrorMessage("Error signing out! Try Again!");
        }
    };

    //It will get account details (TwoFactorAuthEnabled and name)
    useEffect(() => {
        if (currentUser != null) {
            // to check if the user has 2FA enabled
            Object.keys(userDetail).forEach((email) => {
                if (email === currentUser.email) {
                    const TwoFactorAuthEnabled = userDetail[email].TwoFactorAuthEnable;
                    const UserName = userDetail[email].displayName;
                    setTwoFactorAuthEnable(TwoFactorAuthEnabled);
                    setname(UserName);
                    //**Checking**
                    //console.log(TwoFactorAuth_enable)
                    //console.log(email)
                }
            });
        }
    }, [currentUser, userDetail]);

    //It will change name in firebase
    const handleChangeName = async () => {
        try {
            const success = await updateUserName(currentUser.email, newName, true);
            if (success) {
                setname(newName); // Update the displayed name
                setMessage("Name changed successfully!");
            } else {
                setErrorMessage("Failed to update name! Try Again!");
            }
        } catch (error) {
            console.error("Error changing name:", error.message);
            setErrorMessage("Error changing name! Try Again!");
        }
    };

    //It will change 2FA status in firebase
    const handleTwoFactorAuth = async () => {
        const valueMouse = !(TwoFactorAuthEnable);
        console.log(valueMouse);
        try {
            const success = await updateUserName(currentUser.email, valueMouse, false);
            if (success) {
                setTwoFactorAuthEnable(valueMouse); // Update 2FA
                setMessage("Two-Factor Authorisation status changed successfully!");
            } else {
                setErrorMessage("Failed to update Two-Factor Authorisation status! Try Again!");
            }
        } catch (error) {
            console.error("Error changing 2FA status:", error.message);
            setErrorMessage("Error changing two-factor authorisation status! Try Again!");
        }
    }

    return (
        <div className="profile">
            <h1>Hello {name}! </h1>
            <h2>Welcome to your Profile!</h2>

            {/*check if user logged in*/}
            {currentUser ? (
                <>
                    <div className="account_detail">
                        <h3>Account Details:</h3>
                        <p>Email Address: {currentUser.email}</p>
                        <div className="profile_change">
                            <section>
                                Change Name:{" "}
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <button className="button" onClick={handleChangeName}>Change</button>
                            </section>

                            <table>
                                <tr></tr>
                                <tr>
                                    <td class="ui fitted toggle checkbox">
                                        <CheckBox change={handleTwoFactorAuth}></CheckBox>
                                    </td>
                                    {/*check if 2FA enabled for messaging*/}
                                    {TwoFactorAuthEnable ? (
                                        <td><p>Disable Two Factor Authorisation!</p></td>
                                    ) : (
                                        <td><p>Enable Two Factor Authorisation!</p></td>
                                    )}
                                </tr>
                            </table>
                            {Message && <p className="message"> {Message} </p>}
                        </div>
                    </div>

                    <div>
                        <br />
                        <button className="button" onClick={handleSignOut}>Logout</button>
                    </div>
                </>
            ) : (
                <>
                    <p>You are not logged in!</p>
                    <br />
                    <Link to="/login">Login</Link>
                </>
            )}

            {errorMessage && <p className="error"> {errorMessage} </p>}
        </div>
    );
}

export default Profile;
