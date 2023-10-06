import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
function Home (){
    const location = useLocation();
    console.log(location.state);
    const history = useNavigate();
    const handleSubmit = ()=>{
        const bid="False";
        history("/",{state : {check:bid}});
    };

    return (
        <div className="homepage">

            <h1>Hello and welcome to the home</h1>
            
            <button onClick={() => handleSubmit()}>Logout</button>
        </div>
    )
}

export default Home