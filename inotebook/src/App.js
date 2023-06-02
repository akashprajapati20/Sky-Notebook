import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";



function App() {
  const[alert,SetAlert] = useState(null);
  const showAlert=(message,type)=>{
    
    SetAlert({msg:message ,
      type:type})
     setTimeout(() => {
       SetAlert(null); 
     }, 1000);

  }
  return (
    <>
    <NoteState>
    <Router>

      <Navbar/>
      <Alert  alert={alert}/>
    <div className="container">
    <Routes>
      <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
      <Route exact path="/" element={<Home showAlert={showAlert}/>} />
      <Route exact path="/about" element={<About showAlert={showAlert}/>} />
      <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
      
     
     </Routes>
    </div>

    </Router>
    </NoteState>
    </>
  );
}

export default App;
