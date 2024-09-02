import React, { useState } from 'react';
import positive from '../Images/positive.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [adLogin, setAdLogin] = useState({adName: "", adPass: ""});
    const [showReg, setShowReg] = useState(false);
    const navigate = useNavigate();
    const [adReg, setAdReg] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const adminSignUpChange = (field, value) => {
        setAdReg(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const adminLoginChange = (field, value) => {
        setAdLogin(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const signupBtn = (e) => {
        e.preventDefault();

          let getData = new FormData();
          getData.append('name', adReg.name);
          getData.append('email', adReg.email);
          getData.append('password', adReg.password);
          getData.append('password_confirmation', adReg.password_confirmation);
      
          axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/adminregister",
            data: getData,
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then((response) => {
            alert('Successfully Registered');
            setAdReg({ 
              name: "", email: "", password: "", password_confirmation: ""
            });
            setShowReg(false);
          })
     
      };

      const loginBtn = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/adminlogin", {
            email: adLogin.adName,
            password: adLogin.adPass
        }, {
            headers: { 'Accept': 'application/json' }
        }).then((response) => {
            const token = response.data.token;
            if (token) {
                localStorage.setItem('authToken', token);
                alert('Login successful');
                navigate('/dash');
            } else {
                alert('Wrong email or password');
                navigate('/PPGadminsite');
            }
        })
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-7'> 
                <img style={{width: "80%", height: "700px"}}  src={positive} alt='quote' />
                </div>
            <div className='col-3' style={{margin: "auto"}}>
                <form className='adminhome'>
                <center><h1>ADMIN LOGIN</h1></center>
                    <div className="form-floating">
                                    <input
                                        name='adname'
                                        id="adname"
                                        type='email'
                                        className="form-control"
                                        value={adLogin.adName}
                                        onChange={(e) => adminLoginChange('adName', e.currentTarget.value)} 
                                        required
                                    />
                                    <label htmlFor="uname" style={{ fontStyle: "italic", fontFamily: "sans-serif", fontWeight: "bolder" }}>USERNAME:</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        name='adpass'
                                        id="addpass"
                                        type='password'
                                        className="form-control"
                                        value={adLogin.adPass}
                                        onChange={(e) => adminLoginChange('adPass', e.currentTarget.value)} 
                                        required
                                    />
                                    <label htmlFor="uname" style={{ fontStyle: "italic", fontFamily: "sans-serif", fontWeight: "bolder" }}>PASSWORD:</label>
                                </div>
                                <br />
                                <center><button 
                                type='submit' 
                                className='btn btn-success form-control'
                                onClick={loginBtn}
                                > Login </button></center>
                                <br />
                                <center><button 
                                    type='submit' 
                                    className='btn btn-primary form-control'
                                    onClick={()=>setShowReg(true)}
                                    > SignUp </button></center>
                                <br /> <br />
                </form>
                <div className='modal' style={{ display: showReg ? "block" : "none"}}>
                        <div className='modal-dialog modal-dialog-centered' style={{ width: "400px" }}>
                            <div className='modal-content'>
                                    <div className="modal-header">
                                       <h5>SIGN UP</h5>
                                        <button type="button"
                                            className="btn-close" aria-label="Close"
                                            onClick={()=>setShowReg(false)}
                                        ></button>
                                </div>
                                <div className='modal-body'>
                                    <form>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text">Name</span>
                                        <input 
                                            type="text" 
                                            className="form-control"  
                                            value={adReg.name}
                                            onChange={(e) => adminSignUpChange('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text">Email</span>
                                        <input 
                                            type="email" 
                                            className="form-control"  
                                            value={adReg.email}
                                            onChange={(e) => adminSignUpChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text">Create Password</span>
                                        <input 
                                            type="password" 
                                            className="form-control"  
                                            value={adReg.password}
                                            onChange={(e) => adminSignUpChange('password', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text">Confirm Password</span>
                                        <input 
                                            type="password" 
                                            className="form-control"  
                                            required
                                            value={adReg.password_confirmation}
                                            onChange={(e) => adminSignUpChange('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <center><button type='submit' className='btn btn-success form-control'
                                    onClick={signupBtn}
                                    >SUBMIT </button></center> 
                                    <br />
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;