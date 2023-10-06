import React, { useContext } from "react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import { UserContext } from './context/user.context'
function NavFooter() {
    const { currentUser } = useContext(UserContext)
    console.log(currentUser)
    return (
        <div>
            <NavigationBar />
            <Footer
                company="For Dev:"
                s1p1="How it works"
                s1p2="How to create a profile"
                s1p3="Find jobs"
                client="For Clients:"
                s2p1="How it works"
                s2p2="How to post a job"
                s2p3="Find dev"
                media="Stay Connected"
                icon1="twitter"
                icon2="facebook"
                icon3="instagram"
                endOfPage="DEVLink"
                endp1="Privacy Policy"
                endp2="Terms"
                endp3="Code of Conduct"
            />
        </div>
    )
}

export default NavFooter