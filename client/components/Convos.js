import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';




const Convos = ({ convos, handleConvoClick, cat }) => {


    return (
        <div className='cats' >
            {Object.keys(convos).map(key => (
            <button onClick={() => handleConvoClick(cat, key)} key={key}>{key}</button>
            ))}
        </div>
    )



}


export default Convos;