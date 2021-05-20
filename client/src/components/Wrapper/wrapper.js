import React , {useState ,useEffect} from 'react';
import './wrapper.css';
import Teacher from '../../assets/teaching-animate.svg';
import socket from '../../socket';
import Swal from 'sweetalert2'; 

const Wrapper = (props) =>{
  
  const [name,setName] = useState('');
  const [room , setRoom] = useState('');
  const [role, setRole] = useState('student');
  const [state,setState] = useState(false);


  useEffect(()=>{
      let mounted = true;
      if (state){
        // socket = io(ENDPOINT);
      if (role === "teacher"){
   
      socket.emit('joinTeacher',{name:name,role:role},(response)=>{
  
        setRoom(response.room);
        props.loginStatus({name:name,role:role,room:response.room});
       setState(false);
       setRole("student");
      })
    }
  
    if(role === "student" && state === true){
      socket.emit("joinStudent",{name,room,role},(response)=>{
        if(response === "joinedSuccessfully" ) 
        { props.loginStatus({name:name,role:role,room:room});
         
         }else{
        Swal.fire({
            title: 'Error',
            text: response,
            type: 'error',
          })

         

         }
         setState(false); 
      })
    }
    
  }
  return () => {setName('') ; setRole('student'); setRoom('') ;setState(false); };
    },[state]);
  const validate = (e) =>{
   e.preventDefault();

    if (!name){
        Swal.fire({
          title: 'Warning',
          text: "Fill up all the blanks",
          type: 'warning',
          
        })

        return false;
      
    }

    if(name && role){
      if (role === "teacher"){
        return true;

      }
      else if (role === "student"){
        if (room){
          return true;
        }else{
          Swal.fire({
            title: 'Warning',
            text: "Fill up all the blanks",
            type: 'warning',
            dangerMode : true,
          })
          return false;
        }
      }
    }
    return false;

  }

  const roomInputLabel = (role) =>{
    if( role === "student"){
    return(
      <div className="form-label-group">
            <input type="number" id="inputCode" autoComplete="off" className="form-control" onChange={ event => setRoom(event.target.value)  }  onPaste={ event => setRoom(event.target.value)  } placeholder="First Name" required/>
            <label htmlFor="inputCode">Enter Room Code</label>
          </div>
    );
    }
  }
    return(
        
     <div className="wrapper mt-5 p-5">
         <div className="container">
  <div className="row align-items-center justify-content-center ">

    <div className="col-lg-5 col-sm-12 ">
      <img className="px-4" src={Teacher} alt=""/>
    </div>

    <div className="col-sm-12 col-lg-5">
      <div className="card card-signin my-5">
        <div className="card-body">
          <h5 className="card-title text-center">Welcome {name} !!</h5>
          <form className="form-signin" >
            <div className="form-label-group">
              <input type="text" id="inputName" value={name}  autoComplete="off"  className="form-control" onChange={ event => setName(event.target.value)  } onPaste={ event => setName(event.target.value)  } placeholder="First Name" required autoFocus/>
              <label htmlFor="inputName">Enter Name</label>
            </div>
            <div className="form-label-group">
            
            <select className="form-control" onChange={e => setRole(e.target.value) } placeholder="Select Role" >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
             </select> 
            
          </div>
          {
              roomInputLabel(role)
            }
            <button onClick={(e) => validate(e) ? setState(true) : null }className="btn btn-lg btn-primary btn-block text-uppercase" type="button">Best of Luck !!</button>
        
            </form>
        </div>
      </div>
    </div>
    
  </div>
</div>
     </div>
   
   )
}

export default Wrapper;