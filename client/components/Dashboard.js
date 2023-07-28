import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ConvoPart from './ConvoPart';
import NavBar from '../containers/NavBar';
import Category from './Category';



const Dashboard = ({ user }) => {
    const [inputVal, setInputVal] = useState('');
    const [convo, setConvo] = useState([{"role": "system", "content": "You are a helpful assistant."}]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [formDisplay, setFormDisplay] = useState('none');
    console.log('another one')

    
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

    const handlePostDialog = async (e) => {
        e.preventDefault();
        if (!category || !title || category.split(' ') > 1 || title.split(' ') > 1) return;
        const output = {};
        output[category] = {};
        output[category][title] = convo;
        output.username = user.username;

        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(output)
        })

        return;
    }

    const handleSaveDialog = (e) => {
        e.preventDefault();
        if (convo.length <= 1) return;
        setFormDisplay('flex');

    }

    const handleConvoClick = (cat, key) => {
        setConvo([{"role": "system", "content": "You are a helpful assistant."}, ...user.categories[cat][key]]);
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
                    <h2>HISTORY</h2>
                    <NavBar user={user} handleConvoClick={handleConvoClick} handleSaveDialog={handleSaveDialog} />
                </nav>
                <section id='rightOfNav'>
                    <main>
                        {convoParts}
                        <div style={{ display: formDisplay }} id='saveDialogContainer'>
                            <form id='saveDialogForm' onSubmit={handlePostDialog}>
                                <button className='exitBtn' onClick={() => setFormDisplay('none')}>EXIT</button>
                                <label>
                                    <h2>CATEGORY</h2>
                                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                                </label>
                                <label>
                                    <h2>TITLE</h2>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                                </label>
                                <input id='saveBtn' type="submit" value="SAVE" />
                            </form>
                        </div>
                    </main>
                    <form onSubmit={handleFetchResponse}>
                        <textarea type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} />
                        <input id='searchBtn' type="submit" value="ENTER" />
                        <button onClick={(e) => handleSaveDialog(e) }>SAVE DIALOG</button>
                    </form>
                </section>
            </section>
        </div>

    )


}

export default Dashboard;