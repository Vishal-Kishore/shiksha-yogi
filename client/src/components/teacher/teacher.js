import React , {useState,useEffect}from 'react';
import Poll from '../Poll/Poll';
import socket from '../../socket';
import Room from '../room/room';
import Wait from '../../assets/wait.svg';
import List from '../list/list';
import Swal from 'sweetalert2';

const Teacher = (props) =>{
    const [students,setStudents] = useState([]);

    const [ show , setShow] = useState(false);

    const [ pollData , setPollData ] = useState([]);
    const [ cont , setCont ] = useState(true);
    const [ question ,setQuestion ] = useState("Is the topic cleared ?");
    const [ optionNumber , setOptionNumber ] = useState(2);
    // const [  ]
    
    useEffect(()=>{
        socket.once('strengthUpdate',(res)=>{
                if (res.strength){
                    setStudents(res.strength.students);
                }else{
                    setStudents([])
                }
        })
    
       
    },[students])

    useEffect(()=>{

        if (pollData.length !== 0 ) {;
        socket.once('updatedPoll',(res)=>{
            setPollData(res.data.pollData);
        })
    }

    },[pollData])


    const roomDisplay = (room) => {
        room = room.toString();
        var _ = [];
        for (var i = 0; i<room.length ;i++){
            _.push( <Room  number = {room.charAt(i)} key={i} ></Room>)
        }
        return _;
    };
    
    const startPoll = (e) =>{

        if (optionNumber <5 && optionNumber >0){

        var _ = [];
        for (var i=0; i<optionNumber;i++){
            _.push(0);
        }
        e.preventDefault();

        socket.emit('startPoll',{room : props.room,question:question,optionNumber:optionNumber},(response)=>{

            
            if(response.error){
            Swal.fire({
                title: 'Error',
                text: response.error,
                type: 'error',
              })
              setShow(false);
              setPollData([]);
            }else{
                setShow(true);
                setCont(false);
                setPollData(_);
            }
        })
    }else{
        Swal.fire({
            title: 'Reached Limitation',
            text: "You can have maximum 4 option",
            type: 'warning',
          })
    }

    }

    const endPoll = (e) =>{
        e.preventDefault();
       
        
        Swal.fire({
            title: 'Are you sure?',
            text: "The Graph would not be available again. Please a have look on it",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, end the poll!'
          }).then((result) => {
            if (result.value) {
                setShow(false);
                setCont(true);
                socket.emit('endPoll',{room:props.room},(res)=>{
                setPollData([]);
                setOptionNumber(2);
                setQuestion("Is the topic cleared ?");
                })
                
            }
          })
        
    }


    var nameTitle = props.name.slice(0).split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')

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
        {
           ((cont ^ show)&cont ) ? <button className="btn btn-success mx-2 px-3" onClick={e => {
            setCont(false);
            setShow(false);
           }}  >Create Poll</button> : <></>
       }
        {/* {
           !show ? <button className="btn btn-success mx-2 px-3" onClick={e => startPoll(e)}  >Create Poll</button> : <button className="btn btn-success mx-2 px-3" onClick={e => endPoll(e)} >End Poll</button>
       }
    */}
    {/* {
      display ?  <button className="btn btn-success mr-5 ml-2 px-3" onClick = { e => displayPoll(e) } >Display Poll</button>
            : <></>
    } */}
                <div className="row  h-100 align-items-center justify-content-center">
                    <div className="col-lg-9 col-sm-12">
                        {((cont ^ show)&cont )  ?
                        <><img className="wait " src={Wait} ></img>
                        <h1 className="text-light px-5">{nameTitle}, you haven't created the poll!!!</h1>
                        </> 
                        : null} 

                        { !((cont ^ show)||cont ) ?  <div className="external" >
                            <div className="card inner">
                            <h3 className="card-header text-danger">
                                <span className="blink"> 
                                <span className="dot"/>
                                </span>
                                Create Live Poll</h3>
                            <div className="card-body">

                            <div className="form-label-group">
                                <input type="text" id="inputQuestion" value={question}  autoComplete="off"  className="form-control" onChange={ event => setQuestion(event.target.value)  } onPaste={ event => setQuestion(event.target.value)  } placeholder="Question" required autoFocus/>
                                <label htmlFor="inputQuestion">Enter Question</label>
                            </div>

                            <div className="form-label-group">
                                <input type="number" id="inputOption" value={optionNumber}  autoComplete="off"  className="form-control" onChange={ event => setOptionNumber(event.target.value)  } onPaste={ event => setOptionNumber(event.target.value)  } placeholder="Number of Option" required autoFocus/>
                                <label htmlFor="inputOption">Enter Question</label>
                            </div>

                                {
                                    !((cont ^ show)||cont ) ? 
                                    <button className="btn btn-success mx-2 px-3" onClick={e => startPoll(e)}  >Create Poll</button>
                                     : 
                                     null}
                                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                            
                            </div>
                            </div>
                            </div>
                        :  null }
                           
                        
                       { ((cont ^ show)&show ) ?<><Poll data={ students } poll = {pollData} question={question} optionNumber={optionNumber} end={(e,res)=> res ? endPoll(e) : null } ></Poll></> : null }
                    </div>
                    <div className="col-lg-3 col-sm-12 align-self-start mr-auto">
                         <List studentList={students} teacherList = { [0,nameTitle,'teacher'] }> </List>
                    </div>
            </div>
                
            </div>

      
        </>
 
    )
}

export default Teacher;