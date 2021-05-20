import React, { useState } from 'react';
import { Switch, Route , Redirect} from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Join.css'; // css only
import Wrapper from '../Wrapper/wrapper';
import Student from '../student/student';
import Teacher from '../teacher/teacher';
import Header from '../header/header';

const Join = () => {
    const [ isLogin , stateLogin ] = useState(false);
    const [ data ,setData ] = useState("")
    const [student , setStudents ] = useState([]);

    const dataEvaulate = (res)=>{
        stateLogin(true);
        setData(res);
       
    }

    const reset = (res)=>{
        if (res){
        stateLogin(false)
        setData("");
        }
    }

    return (
        <>       
        
          <div className="main">
          <Header login={isLogin} ></Header> 
            </div>
          {
                !isLogin ? <><Wrapper loginStatus={ res => dataEvaulate(res) } ></Wrapper> </> : null
            }
            {  
                data.role === "student" ? <Student name={data.name}  back={ (res)=> reset(res) } room = {data.room}/> : null
            }
            {
                data.role === "teacher" ? <Teacher name={data.name} room={data.room}  /> : null
            }

          
        </>
    )
}

export default Join;