import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateInfo = async (e) => {
        e.preventDefault();
        try {
            const token = await authenticateUser(username, password);
            localStorage.setItem('authToken', token);

            return navigate('/')
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={validateInfo}>
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