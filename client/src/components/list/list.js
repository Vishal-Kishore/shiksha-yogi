import React from 'react';
import Student from '../student/student';
import './list.css';
const List = (props)=>{
    const teacher = (list) =>{
        return ( <li>{ list[1] }</li>  )
    }
    
    const student = (list) =>{
        var _ = [];
        list.forEach((i)=>{
            _.push(<li key={i[0]} >{i[1]}</li>)
        })
        return _;
    }

    return ( 
    
    <>
        <div className="list">
            
    <ul>
        <h3 className="text-center bg-success ">Participants</h3>
        <li className="lstHeader">Teacher</li>
        {
            props.teacherList ? teacher(props.teacherList) : null
        }
        <li className="lstHeader">Students ({ props.studentList ? props.studentList.length : 0})</li>
        {
            props.studentList ? student(props.studentList) : null
        }
    </ul>
    </div>
    </>
    
    )
}

export default List;