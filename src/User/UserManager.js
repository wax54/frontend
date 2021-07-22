import UserContext from '../UserContext';
import { useCallback, useEffect } from 'react';
import { useLocalStorageState } from '../Hooks';
import JoblyApi from '../api';

function UserManager(props) {
    const [user, setUser] = useLocalStorageState("userData", {});
    const [token, setToken] = useLocalStorageState("authToken", "");
    const updateCurrentUser = useCallback(async () => {
        try {
            const userData = await JoblyApi.getUserData();
            console.log(userData);
            setUser(userData);
        } catch {
            setUser({});
        }
    }, [setUser]);

    useEffect(() => {
        JoblyApi.token = token;
        updateCurrentUser()
    }, [token, updateCurrentUser])


    const registerUser = async (userData) => {
        try {
            const token = await JoblyApi.register(userData);
            setToken(token);
            return { status: true };
        } catch (e) {
            console.error(e);
            return { status: false, errors: e };
        }
    };


    const loginUser = async (userData) => {
        try {
            const token = await JoblyApi.login(userData);
            setToken(token);
            return { status: true };
        } catch (e) {

            console.error(e);
            return { status: false, errors: e };
        }
    };

    const updateUser = async (userData) => {
        const verified = await JoblyApi.verifyPassword(userData.passwordVerification);
        if (!verified)
            return { status: false, errors: ["Password Not Valid"] };
        try {
            await JoblyApi.updateUser({ ...userData, passwordVerification: undefined });
            updateCurrentUser();
            return { status: true };

        } catch (e) {
            return { status: false, errors: e };
        }
    };

    const applyToJob = async (jobId) => {
        try {
            const success = await JoblyApi.applyToJob(jobId);
            if (success) {
                setUser(user => ({ ...user, applications: [...user.applications, jobId] }));
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    };

    const logoutUser = () => {
        setToken("");
    };

    const isLoggedIn = token.length ? true : false;
    return ( 
        <UserContext.Provider 
            value={{ 
                user, 
                registerUser, 
                loginUser, 
                logoutUser, 
                updateUser, 
                applyToJob, 
                isLoggedIn 
            }} 
        >
            { props.children }
        </UserContext.Provider>
    );
}
export default UserManager