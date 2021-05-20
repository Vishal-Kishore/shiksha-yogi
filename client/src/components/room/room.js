import React from 'react';
import './room.css';


const Room = (props) =>{
    return (
        <>
        
        <div className="box mx-1">
            <h3 className="text-center">{props.number}</h3>
        </div>
        
        </>
    )
}

export default Room;