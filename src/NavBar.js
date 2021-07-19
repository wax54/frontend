import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "./UserContext";
import "./NavBar.css";

const NavBar = () => {
    const  { user, logoutUser} = useContext(UserContext);
    const LoggedInLinks = <>
        <NavLink exact to="/" >Home</NavLink>
        <NavLink exact to="/companies">companies</NavLink>
        <NavLink exact to="/jobs">jobs</NavLink>
        <NavLink exact to="/profile">
            Hello, {user.username}!
        </NavLink>
        <Link to="/" onClick={logoutUser}>
                                        logout
        </Link>
    </>

    const LoggedOutLinks = <>
        <NavLink exact to = "/" >Home</NavLink>
        <NavLink exact to="/login"> login</NavLink>
        <NavLink exact to="/signup">Signup</NavLink>
    </>

    return (
        <div className="NavBar">
            {user.username ? LoggedInLinks : LoggedOutLinks}
        </div> 
)};
export default NavBar