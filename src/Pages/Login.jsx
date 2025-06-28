import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import "../styles/login.css"
import banner from "../assets/Login-banner.jpg"
import Header from '../Componetns/header'
import Footer from '../Componetns/footer'
const LoginPage = () => {

    const navigate=useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin =async (e) => {
        e.preventDefault();
        
            try
            {
                setNotification({
                    message:"Logging in...",
                    type:"blue-background"
                })
            const response=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{ headers: { "Content-Type": "application/json" },
             method: "POST", body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value }) })
            setNotification({
                ...notification, show:false
            })
             const data=await response.json();
             if(response.ok){
             
                localStorage.setItem("token", JSON.stringify({token:data.token, expiresIn:"24h"}));
                localStorage.setItem("user", JSON.stringify(data.engineer));
              
            navigate("/dashboard");         
             }
             else{
                setNotification({
                    message:data.message,
                    type:"red-background"
                })
             }

            }


            catch(error){
                console.log(error);
            }
    }
  return (
    <div className='login-page-container'>
    <Header />
        <div className='login-container'>

            <div className='login-banner'>
                <img src={banner} alt="Login Banner" />
            </div>
            <div className='login-form'>
             <form> <div className='login-title'>Login</div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailRef}/>
                       
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  ) 
}
export default LoginPage