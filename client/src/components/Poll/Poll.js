import React ,{useState} from 'react';
import './Poll.css';
import Bar from '../Bar/barChat';
const Poll = (props) =>{
    return (
        <>
        <div className="external" >
    <div className="card inner">
    <h3 className="card-header text-danger">
        <span className="blink"> 
          <span className="dot"></span>
          </span>
          Live Polling</h3>
    <div className="card-body">
        <button className="btn btn-success mx-2 px-3" onClick={e => props.end(e,true)}  >End Poll</button>
        <p className="card-text">{props.question}</p>
       <Bar data={props.data} poll={props.poll}   optionNumber={props.optionNumber} ></Bar>
    </div>
    </div>
    </div>
        </>
    )
}

export default Poll