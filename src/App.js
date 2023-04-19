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
  const [currentToken, setCurrentToken] = useLocalStorage('token');
  const [isLoading, setIsLoading] = useState(false);
  const [animes, setAnimes] = useState([]);

  // get user info each time there is a login
  useEffect(() => {
    const getUserInfo = async (username) => {
      const res = await RBApi.getUser(username);
      setUserInfo(res);
    }

    console.log("token check has run");
    
    // check if there is a token
    const token_check = localStorage.getItem('token');
    if (token_check) {
      const { username } = jwt.decode(token_check);
      setCurrentUser(username);
      getUserInfo(username);
    }
    setIsLoading(false);
  }, [currentToken]);

  // update animes to show for top anime
  useEffect(() => {
    const getAnimes = async () => {
      const req = await RBApi.getTopAnimes();
      setAnimes(req);
    }

    console.log("get animes has run");

    getAnimes();
  }, []);

  const login = async (loginFormData) => {
    try {
      const res = await RBApi.login(loginFormData);
      setCurrentToken(res.token);
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