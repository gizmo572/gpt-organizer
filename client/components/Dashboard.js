import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ConvoPart from './ConvoPart';
import Category from './Category';



const Dashboard = ({ user }) => {
    const [inputVal, setInputVal] = useState('');
    const [convo, setConvo] = useState([{"role": "system", "content": "You are a helpful assistant."}]);
    const [history, setHistory] = useState([])
    const [customCategories, setCategories] = useState('asfsdf')
    console.log('another one')

    useEffect(() => {
        const tempArray = [];
        const { categories } = user;
        Object.keys(categories).forEach((cat, i) => tempArray.push(<Category key={i} cat={cat} />));
        setCategories(tempArray);

    },[])
    console.log('userData', user);

    const handleFetchResponse = async (e) => {
        if (inputVal === '') return;
        e.preventDefault();
        //make POST request to server passing in convo, which should be array of object, each obj containing a 'role' prop and 'content' prop
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([...convo, {"role": user.username, "content": inputVal}])
        });
        const data = await response.json();
        console.log('data', data);
        setConvo(data);
        setInputVal('');
    }

    const handleSaveDialog = async (e) => {
        e.preventDefault();
        console.log('hello')
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        return;
    }

    const convoParts = [];
    convo.forEach((obj, i) => {
        if (i === 0) return;
        convoParts.push(<ConvoPart key={i} part={obj} user={user.username} />)
    })

    const historyParts = [];

    return (
        <div id='dashboard'>
            <header>
                <h1>WELCOME, {user.username.toUpperCase()}!!!</h1>
            </header>
            <section id='belowHeader'>
                <nav>
                    <h2>BRUH.  HISTORY THO.</h2>
                    {customCategories}
                </nav>
                <section id='rightOfNav'>
                    <main>
                        {convoParts}
                    </main>
                    <form onSubmit={handleFetchResponse}>
                        <textarea type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} />
                        <input id='searchBtn' type="submit" value="ENTER" />
                        <button onClick={(e) => handleSaveDialog(e)}>SAVE DIALOG</button>
                    </form>
                </section>
            </section>
        </div>

    )


}

export default Dashboard;