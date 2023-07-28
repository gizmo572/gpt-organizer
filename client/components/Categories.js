import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const Categories = ({ user }) => {
    const navigate = useNavigate();
    // const customCategories = [];
    const { categories } = user;
    // Object.keys(categories).forEach((cat, i) => customCategories.push(<Category key={i} cat={cat} />))

    return (
        <div className='cats'>
            {Object.keys(categories).map((cat, i) => (
                <Link key={i} to={cat}>
                    <button>{cat}</button>
                </Link>
            ))}
            {/* <button onClick={() => navigate('./')}>GO BACK</button> */}
        </div>
    )
}


export default Categories;

