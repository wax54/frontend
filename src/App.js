import NavBar from './NavBar';
import Routes from './Routes';
import UserManager from './User/UserManager';

import './App.css';

function App() {
  return (
    <div className="App">
      <UserManager>
        <NavBar />
        <Routes />
      </UserManager>
    </div>
  );
}

export default App;
