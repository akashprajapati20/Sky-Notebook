import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [crendentials,setCrendentials]=useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();   //page reload ni hota isse
        const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
            } , body: JSON.stringify({email:crendentials.email ,password:crendentials.password}), // body data type must match "Content-Type" header
          });
          const json= await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("login in succesfully ","success");
          }
          else{
            props.showAlert("could not login  ","danger");
          }
          
    }
    const onChange =(e)=>{
        setCrendentials({...crendentials,[e.target.name]:e.target.value})
     }
   
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={onChange} value={crendentials.email}className="form-control" id="email" name="email"aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} value={crendentials.password} className="form-control" name="password"id="password"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
