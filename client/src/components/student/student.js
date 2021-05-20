import React ,{useState , useEffect} from 'react';
import Wait from '../../assets/wait.svg';
import './student.css';
import Room from '../room/room';
import socket from '../../socket';
import List from '../list/list';
import Swal from 'sweetalert2';

const Student = (props) =>{
    const [isPoll, setIsPoll] = useState(false);
    const ENDPOINT = 'localhost:5000';
    const [students,setStudents] = useState([]);
    const [ teacher , setTeacher ] = useState([]);
    const [ permission , setPermission ] = useState([true]);
    const [ question ,setQuestion ] = useState("");
    const [ optionNumber , setOptionNumber ] = useState(2);
    var [ late , setLate ] = useState(false);
    var nameTitle = props.name.slice(0).split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')

    useEffect(()=>{
        socket.emit('isPoll',{ room :props.room },(res)=>{
            if(res){
            setIsPoll(true);
            setQuestion(res.question);
            setOptionNumber(res.optionNumber);
            setPermission(true);
            setLate(true);
            }
        })

        

    },[])

    useEffect(()=>{
        if (!late){
        if (!isPoll){
        socket.once('pollStarted',(message)=>{
            setQuestion(message.question);
            setOptionNumber(message.optionNumber);
            setIsPoll(true);
        });
    }
    else{
        socket.once('pollEnded',(message)=>{
            setIsPoll(false);
            setPermission(true);
        });
    }

        }

    },[isPoll])

    useEffect(()=>{
    //  console.log("Here")
        socket.once('strengthUpdate',(res)=>{
            if (res.strength){
               
                setStudents(res.strength.students  );
                setTeacher(res.strength.teacher);
            }
            if (res.strength === "classEnded"){
                
                Swal.fire({
                    title: 'Announcement',
                    text: "Class has Ended",
                    type: 'info',
                  }).then( ()=>{
                
                  props.back(true);
                  }
                  

                  );
                  return(()=>{
                      
                  setStudents([]);
                  setIsPoll(false);
                  setPermission(true);
                  setStudents([]);
                  setTeacher([]);
                  setLate(false);
                });
            }
            // else{
            //     setStudents([]);
            // }
        })
    
    },[students])
    
   const update = (e,index) =>{
       e.preventDefault();
       setLate(false);
    socket.emit( 'updatePoll' , {room : props.room , index:index} ,(res)=>{
        setPermission(false);
        
    } ) 
   }

   const genOption = (number) =>{
        const optionChar = [ "A" ,"B","C","D" ]
       var _ = []
       for (var i = 0; i<optionNumber;i++){
        _.push(<button className="btn btn-success mx-2 px-3" key={i}value={i} onClick = { (e) => update(e,e.target.value) } disabled =  { !permission ? true : false  } >{optionChar[i]}</button>)
                    
    }
    return(_)
   }

    const roomDisplay = (room) => {
        room = room.toString();
        var _ = [];
        for (var i = 0; i<room.length ;i++){
            _.push( <Room  number = {room.charAt(i)} key={i} ></Room>)
        }
        return _;
    };
    return(
        
            <>

        <div className="row w-100 bg-warning py-2  justify-content-center align-items-center">
                <div className="col-md-6 col-sm-12">
                <h3 className="text-center">Room Code :  </h3>
                </div>
                <div className="col-md-6 col-sm-12">
                <div className="d-flex">
                {
                    roomDisplay(props.room)
                }
                </div>
                </div>
            </div>

            <div className="context text-center py-2">
                <div className="row  h-100 align-items-center justify-content-center">
                    <div className="col-lg-9 col-sm-12">
                    
                    { !isPoll ? <>
                   <img className="wait px-5" src={Wait} ></img>
                    <h1 className="text-light px-5">{nameTitle}, Wait for your Teacher !!!</h1></>
                    : 
                    <div className="external" >
                    <div className="card inner">
                    <h3 className="card-header text-danger">
                        <span className="blink"> 
                          <span className="dot"></span>
                          </span>
                          Live Polling Is Up</h3>
                    <div className="card-body">
                    <p className="card-text my-3">{question}</p>
                     
                        {
                            genOption(optionNumber)
                        }
                       
                    </div>
                    </div>
                    </div>
                    
                    }
                    </div>
                    <div className="col-lg-3 col-sm-12 align-self-start">
                        <List  teacherList = {teacher} studentList = {students} >  </List>
                    </div>
            </div>

            </div>
        
        
        
        </>
       
    )
}

export default Student;