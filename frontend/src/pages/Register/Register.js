import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import "./register.css";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    fullName:"",
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const registerNewUser = async(e)=>{
    e.preventDefault()
    try{
      const {data} = await axios.post("http://localhost:8000/api/v1/register",registerUser)
      if(data){
        alert(`${data.fullName} registered successfully`)
        setRegisterUser({
          fullName:"",
          userName:"",
          email:"",
          password:"",
          confirmPassword:""
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className="login_container">
        <div className="register_wrapper">
          <div className="login_left">
            <div className="text_">
              <h1>Lamasocial</h1>
              <p>Connect With Friendsand the world around you on Lamasocial</p>
            </div>
          </div>
          <div className="login_right">
            <form onSubmit={registerNewUser}>
              <input
                type="text"
                placeholder="FullName"
                className="login_input"
                name="fullName"
                value={registerUser.fullName}
                onChange={(e)=>setRegisterUser({...registerUser,[e.target.name]:e.target.value})}
              />
              <input
                type="text"
                placeholder="Username"
                className="login_input "
                name="userName"
                value={registerUser.userName}
                onChange={(e)=>setRegisterUser({...registerUser,[e.target.name]:e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Email" 
                className="login_input"
                name="email"
                value={registerUser.email}
                onChange={(e)=>setRegisterUser({...registerUser,[e.target.name]:e.target.value})} />
              <input
                type="password"
                placeholder="Password"
                className="login_input "
                name="password"
                value={registerUser.password}
                onChange={(e)=>setRegisterUser({...registerUser,[e.target.name]:e.target.value})}
              />
              <input
                type="password"
                placeholder="Re-enter Password"
                className="login_input"
                name="confirmPassword"
                value={registerUser.confirmPassword}
                onChange={(e)=>setRegisterUser({...registerUser,[e.target.name]:e.target.value})}
              />
              <button type="submit" className="login_input btn_login">Sign Up</button>
            </form>
            <div className="create_account">
              <Link to="/login" style={{ width: "80%", textAlign: "center" }}>
                <button>Login Into Account</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
