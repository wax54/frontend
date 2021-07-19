import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from './UserContext';
import JoblyApi from './api';

import './App.css';
import { useEffect } from 'react';
import { useLocalStorageState } from './Hooks';

function App() {
  const [user, setUser] = useLocalStorageState("userData", {});
  const [token, setToken] = useLocalStorageState("authToken", "");

  const updateCurrentUser = async () => {
    try {
      const userData = await JoblyApi.getUserData()
      setUser(userData);
    } catch {
      setUser({});
    }
  }

  console.log('hello' ,user)

  useEffect(() =>{
    JoblyApi.token = token;
    updateCurrentUser()
  }, [token])


  const registerUser = async (userData) => {
    try { 
      const token = await JoblyApi.register(userData);
      setToken(token);
      return { status: true };
    } catch (e) {
      console.error(e);
      return { status: false, errors: e };
    }
  } ;
  

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
    try{
      const user = await JoblyApi.updateUser({...userData, passwordVerification: undefined});
      setUser(user);
      return { status: true };

    } catch (e) {
      return { status: false, errors: e };
    }
  };

  const applyToJob = async (jobId) => {
    try {
      const success = await JoblyApi.applyToJob(jobId);
      if(success) {
        updateCurrentUser();
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
    <div className="App">
      <UserContext.Provider value={{user, registerUser, loginUser, logoutUser, updateUser, applyToJob, isLoggedIn}} >
        <NavBar />
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
