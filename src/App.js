// library imports
import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// local imports
import useLocalStorage from './useLocalStorage';
import userContext from './userContext';
import RBApi from './api';
import Routes from './Routes';
import './App.css';
import NavBar from './components/Navbar/Navbar';

function App() {
  const INITIAL_STATE = '';
  const USER_INIT_STATE = {};
  const [currentUser, setCurrentUser] = useState(INITIAL_STATE);
  const [userInfo, setUserInfo] = useState(USER_INIT_STATE);
  const [currentToken, setCurrentToken] = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [animes, setAnimes] = useState([]);

  // get user info each time there is a login
  useEffect(() => {
    const getUserInfo = async (username) => {
      const res = await RBApi.getUser(username);
      setUserInfo(res);
    }

    if (currentToken) {
      const { username } = jwt.decode(currentToken);
      setCurrentUser(username);
      getUserInfo(username);
      console.log(username);
    }
    setIsLoading(false);
  }, [currentToken]);

  // update animes to show for top anime
  useEffect(() => {
    const getAnimes = async () => {
      const req = await RBApi.getTopAnimes();
      setAnimes([...req]);
    }
    getAnimes();

    console.log("get animes has run");
    
  }, []);

  const login = async (loginFormData) => {
    try {
      const res = await RBApi.login(loginFormData);
      setCurrentToken(res.token);
      localStorage.setItem('token', res.token);
      console.log("login success")
      alert("login success")
    } catch (e) {
      alert(e);
      console.error("Problem in login", e)
    }
  }

  const register = async (signupFormData) => {
    const res = await RBApi.register(signupFormData);
    setCurrentToken(res.token);
  }

  const logout = async () => {
    setCurrentToken(null);
    setCurrentUser(INITIAL_STATE);
    setUserInfo(USER_INIT_STATE);
    alert("User logged out");
  }


  if (isLoading) {
    return (<div>LOADING</div>);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider>
          <NavBar
            currentUser={currentUser}
            logout={logout}
          />
          <Routes
            login={login}
            register={register}
            token={currentToken}
            animes={animes}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;