import React,{ useState } from 'react';
import './LoginSignup.css';
import User_icon from '../Assets/person.png';
import Email_icon from '../Assets/email.png';
import Password_icon from '../Assets/password.png';
import { app } from'../FIreBase/FireBase';
import { getFirestore,collection,addDoc,getDocs } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
const LoginSignup = ()=>{

    const firestore =getFirestore(app);    
    const history =useNavigate();
    const newCollection =collection(firestore,'log');
    const [action,setAction]=useState("Login");
    const [position,setPosition]=useState("False");
    const [inputValues, setInputValues] = React.useState({
        name: '',
        email: '',
        pass:''
      });
      
      const handleSubmit = (inputValues) => {
        if(position==="True")
        {
            history("/home");
        }
        // Do something with the input values
        if(action==="Login")
        {
            
            getDocs(newCollection)
            .then((querySnapshot) => {querySnapshot.forEach((doc) => {
                console.log(doc);
                const data = doc.data();    
                //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                console.log(inputValues.email);
                console.log(inputValues.pass);
                console.log(data['pass']);
                console.log(data['email']);  
               

                if(data['pass']===inputValues.pass && data['email']===inputValues.email){
                    console.log('true');
                    const id = "True";
                    const email = inputValues.email;
                    const pass = inputValues.pass;
                    history("/home",{state : {id : id,email : email,pass :pass}});
                    setPosition("True");
                    
                }else{
                    console.log(`false`);
                    const id = "False";
                    
                    history("/",{state : {id : id}});
                    setPosition("False");
                }
            
                });
                
                }).catch((error) => {console.error('Error getting documents: ', error);
            });     
        }
        else if(action==="Sign Up")
        {
            getDocs(newCollection)
            .then((querySnapshot) => {querySnapshot.forEach((doc) => {
                console.log(doc);
                const data = doc.data();    
                //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                console.log(inputValues.email);
                console.log(inputValues.pass);
                console.log(data['pass']);
                console.log(data['email']);  
                if(data['email']===inputValues.email){
                    window.alert("User exist");

                }else{
                    addDoc(newCollection,inputValues).then(() => {
                        console.log(`Data successfully set in the document with ID ${document}`);
                      })
                      .catch((error) => {
                        console.error('Error setting document data: ', error);
                      });  
                      history("/home");
                    setPosition("True");
                }
                });
                
                }).catch((error) => {console.error('Error getting documents: ', error);
            });
               
            
        }
      };

    return(
        <div className='container'>
            <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
        <div className="header">
            <div className="text">
                {action}
            </div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
            <img src={User_icon} alt="" />
                <input type="text" name="name" value={inputValues.name} placeholder='Full Name' onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })} />
                </div>}
            
            <div className="input">
                <img src={Email_icon} alt="" />
                <input type="email" name="email" value={inputValues.email} placeholder='Email ID' onChange={(e)=> setInputValues({...inputValues, email: e.target.value})}/>
            </div>
            <div className="input">
                <img src={Password_icon} alt="" />
                <input type="password" name="pass" value={inputValues.pass} placeholder='Password' onChange={(e)=> setInputValues({...inputValues, pass: e.target.value})}/>
            </div>
            <div className="button">
            <button onClick={() => handleSubmit(inputValues)}>submit </button>
            </div>
        </div>
        {action==="Login"?<div className="forgot-password">Lost Password? <span>Click Here</span></div>:<div></div>}
        
        </div>
    )
}
export default LoginSignup;