import React from 'react'
import { BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom';
import "../styles/login.css"
import banner from "../assets/Login-banner.jpg"
import Header from '../Componetns/header'
import Footer from '../Componetns/footer'
const LoginPage = () => {

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
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  ) 
}
export default LoginPage