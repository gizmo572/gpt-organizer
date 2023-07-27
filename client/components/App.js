import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LogIn from './log-in';
import SignUp from './sign-up';

import '../styles/styles.css';

const getUserData = async (token) => {
    const response = await fetch('/log-in/verifyJwt', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log('jsonified', data)
        return data;
    } else {
        throw new Error('Failed to fetch user data');
    }
}


const App = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // localStorage.removeItem('authToken')
        const authToken = localStorage.getItem('authToken');
        console.log('im IN!!! also token?', authToken)
        if (authToken) {
            fetchUserData(authToken);
        } else {
            setLoading(false);
            // setUser('bob');
        }
        setLoggedIn(false);
    }, [loggedIn]);

    const fetchUserData = async (token) => {
        const userData = await getUserData(token);
        setUser(userData);
        setLoading(false);
    };

    if (loading) return null;
    console.log(user, 'user')
    return (

        <Router>
            <Routes>
                <Route path="/" element={user.username ? <Dashboard /> : <LogIn setLoggedIn={setLoggedIn} />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    )



}

export default App;