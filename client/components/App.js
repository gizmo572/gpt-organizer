import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LogIn from './log-in';
import SignUp from './sign-up';

import '../styles/styles.css';

const getUserData = async (token) => {
    const response = await fetch('', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to fetch user data');
    }
}


const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserData(token);
        } else {
            setLoading(false);
            // setUser('bob');
        }
    }, []);

    const fetchUserData = async (token) => {
        const userData = await getUserData(token);
        setUser(userData);
        setLoading(false);
    };

    if (loading) return null;

    return (

        <Router>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <LogIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    )



}

export default App;