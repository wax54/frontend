import React, { useContext } from "react";
import UserContext from "../UserContext";
import EditUserForm from "../Forms/EditUser";

import "./Profile.css"

const Profile = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="Profile">
            <h1>Update Your Profile!</h1>
            <div className="Profile-container">
                Username: {user.username}<br/>
                <EditUserForm />
            </div>
        </div> 
)};
export default Profile