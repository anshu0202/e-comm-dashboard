import react, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate=useNavigate();
  const navigate=useNavigate();
  useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
          navigate('/')
      }
  },[]) 
  const handleClick = async () => {
    console.log("function has been called");
    console.log(name, email, password);

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate('/');
    // here user is the key
    localStorage.setItem("user",JSON.stringify(result.result))
    localStorage.setItem("token",JSON.stringify(result.auth))
    console.log("result is "+result);
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter Name"
      />

      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter E-mail"
      />

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={handleClick} className="btn" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
