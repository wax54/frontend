
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import Profile from "./User/Profile";
import AllCompanies from "./Companies/AllCompanies";
import CompanyDetail from "./Companies/CompanyDetail";
import AllJobs from "./Jobs/AllJobs";
import Login from "./Forms/Login";
import Signup from "./Forms/Signup";
import UserContext from "./UserContext";

const ProtectedRoute = (props) => {
    if(props.authentication){
        return (
            <Route {...props}>
                {props.children}
            </Route>
        )
    } else {
        return <Redirect to={props.redirect || "/"} />
    }
}

const Routes = () => {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/signup">
                <Signup />
            </Route>

            <ProtectedRoute exact path="/profile" redirect="/" authentication={isLoggedIn}>
                <Profile />
            </ProtectedRoute>

            <ProtectedRoute exact path="/companies" redirect="/" authentication={isLoggedIn}>
                <AllCompanies />
            </ProtectedRoute>

            <ProtectedRoute exact path="/companies/:handle" redirect="/" authentication={isLoggedIn}>
                <CompanyDetail />
            </ProtectedRoute>

            <ProtectedRoute exact path="/jobs" redirect="/" authentication={isLoggedIn}>
                <AllJobs />
            </ProtectedRoute>

    </Switch>
)};

export default Routes
