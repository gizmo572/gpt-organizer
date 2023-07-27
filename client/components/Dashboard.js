import React, { useState } from 'react';




const Dashboard = () => {
    const [inputVal, setInputVal] = useState('');

    const handleFetchResponse = () => {
        return;
    }

    return (
        <div id='dashboard'>
            <form onSubmit={handleFetchResponse}>
                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} />
                <input id='searchBtn' type="submit" value="ENTER" />
            </form>


        </div>

    )


}

export default Dashboard;