import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "./utils/firebase";
import { UserContext, UserDetailContext } from "./context/user.context";
import TwoFactorAuthComponent from './extra_features/TwoFactorAuth'

function Profile() {
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [TwoFactorAuth_enable, setTwoFactorAuth_enable] = useState(false);


    const { userDetail } = useContext(UserDetailContext);
    const [name, setname] = useState("");


    // Function to sign out
    const handleSignOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error.message);
            setErrorMessage("Error signing out! Try Again!");
        }
    };
    
    useEffect(() => {
        if (currentUser != null) {
            // to check if the user has 2FA enabled
            Object.keys(userDetail).forEach((email) => {
                if (email === currentUser.email) {
                    const TwoFactorAuthEnabled = userDetail[email].TwoFactorAuthEnable;
                    const UserName = userDetail[email].displayName;
                    setTwoFactorAuth_enable(TwoFactorAuthEnabled);
                    setname(UserName);
                    //**Checking**
                    //console.log(TwoFactorAuth_enable)
                    //console.log(email)
                }
            });
        }
    }, [currentUser, userDetail]);
    

return (
    <div>
        <br></br>
        <h1>Hello {name}! </h1>
        <br></br>
        <h2>Welcome to your Profile!</h2>
        {currentUser ? (
            <>
                <h4>Your Email Address: {currentUser.email}</h4>
                <br />
                <button onClick={handleSignOut}>Logout</button>

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
