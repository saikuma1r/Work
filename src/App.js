import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
import './App.css';
import Home from "./Components/LoginSignup/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    
    <div >
<Router>
<Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<LoginSignup/>}/>
</Routes>
  
</Router>
      
      
    </div>
  
  );
}

export default App;
