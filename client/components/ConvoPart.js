import React from 'react';




const ConvoPart = ({ part, user }) => {

    return part.role === user ? <div id='user' >{part.role}: {part.content}</div> : <div id='gpt' >{part.role}: {part.content}</div>

}


export default ConvoPart;