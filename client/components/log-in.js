import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LogIn = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate();
    const validateInfo = async (e) => {
        console.log('username', username, password)
        e.preventDefault();
        try {
            console.log('testing...')
            const response = await fetch('/log-in/noJwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const data = await response.json();
                console.log('data', data)
                localStorage.setItem('authToken', data.authToken);
                setLoggedIn(true);
                return navigate('/')
            } else throw new Error('Failed to Log-In')
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form id='logInForm' onSubmit={validateInfo}>
            <label>
                <h2>USERNAME</h2>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <h2>PASSWORD</h2>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input id='logInBtn' type="submit" value="Log-In" />
        </form>

    )


}

export default LogIn;