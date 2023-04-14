import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import './Login.css'
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error,setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const [passwordShown, setPasswordShown] = useState(false);

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password=  form.password.value;
        console.log(email,password);

        // validation
        setError('');
        setSuccess('');
        // not necessary in login page validation , just for recap

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError("Please Add at least two uppercase");
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError("Please add a special character");
            return;
        }
        else if( password.length < 6){
            setError("Password must be 6 characters long");
            return;
        }

        
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const loggedUser = result.user;
          console.log(loggedUser);
          //for verification
          if(!loggedUser.emailVerified){
              alert('Please verify your email')
          }
          setSuccess('User login Successful');
          setError('');
        })
        .catch(error =>{
          setError(error.message);
        })
    }


  const handleResetPassword = event =>{
    // console.log(emailRef.current.value)
    const email = (emailRef.current.value)
    if(!email){
        alert('Please provide your email address to reset password')
        return;
    }
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('Please check your email');
    })
    .catch(error =>{
      console.log(error);
      setError(error.message);
    })

    
  }
 ;
  const togglePassword = () =>{
    
    setPasswordShown(!passwordShown);
  }
    return (
        <div className="Auth-form-container d-flex flex-column">
        <form onSubmit={handleLogin} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Please Login</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="form-control mt-1"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              
              <input
                type={passwordShown ? 'text' : 'password'}
                name='password'
                className="form-control mt-1"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={togglePassword}  className="btn btn-primary">
                Show Password
              </button>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button>
            </p>
          </div>
        </form>
        <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
        <p className='text-danger'>{error}</p>
        <p className='text-success'>{success}</p>
      </div>
    );
};

export default Login;