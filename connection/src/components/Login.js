import react, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate()

    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])


  const handleClick=  async ()=>{
    console.log(email,password)
     let result= await fetch("http://localhost:5000/login",{
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
     }
     )
     // the result is in readstream format so it has to be converted into string
     result= await result.json();

     console.log(result)
   if(result.auth){
        //   confirm("Login successfully")
        localStorage.setItem("user",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/')

   }
   else{
    alert("Please enter correct details")
   }
     






  }

  return (
    <div className="login">
        <h1> Login </h1>
       < input className="inputBox" type="text" placeholder="Enter email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
       <input className="inputBox" name="password" type="password" placeholder="Enter password"  onChange={(e)=>setPassword(e.target.value)} value={password} />
       <button onClick={handleClick} className="btn" type="button">
        Login
      </button>



    </div>
  );
};
export default Login;
