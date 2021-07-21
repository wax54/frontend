import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
    const { user, isLoggedIn } = useContext(UserContext);
    return (
    <div className="Home">
        {isLoggedIn ? <h1>Hello and Welcome {user.username}!</h1>
        :
        <h1>Please Login or Signup above!</h1>
        }

    </div> 
)};
export default Home