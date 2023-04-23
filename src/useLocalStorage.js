// function to check localstorage for token
import React, { useState, useEffect } from 'react';
import RBApi from './api';

function useLocalStorage(key, initialState=null) {
    const [token, setToken] = useState(localStorage.getItem('token') || initialState);
    RBApi.token = token;
    useEffect(function updateKey() {
        
        console.log("useLocalStorage useEffect has run. token: ", token);
        localStorage.setItem(key, token);
        
        if (token === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, token);
        }
    }, [key, token]);
    return [token, setToken];
}
export default useLocalStorage;
