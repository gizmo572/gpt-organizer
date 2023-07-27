import React, { useState, useEffect } from 'react';


const Category = ({ cat }) => {





    return (
        <div id='category'>
            <button id={cat} onClick={() => handleCategory(cat)}>{cat}</button>
        </div>
    )


}


export default Category;