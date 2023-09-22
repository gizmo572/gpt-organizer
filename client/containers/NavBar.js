import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Convos from '../components/Convos';




const NavBar = ({ user, handleConvoClick, handleSaveDialog }) => {
    const navigate = useNavigate();

    const handleCategory = (cat) => {
        
    }


    return (
        <div>
            {console.log(user)}
            <Routes>
                <Route path="/" element={<Categories user={user} />} />
                {Object.keys(user.categories).map((cat,i) => (
                    <Route key={i} path={cat} element={<Convos convos={user.categories[cat]} handleConvoClick={handleConvoClick} cat={cat} />} />
                ))}
            </Routes>
            <button onClick={() => navigate('/')}>GO BACK</button>
        </div>
    )

}




export default NavBar;

