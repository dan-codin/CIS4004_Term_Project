import * as React from 'react';
import '../src/master.css';
import {Link} from 'react-router-dom'
import SignUpPage from './Signup';
import { Login, SignUp } from './Helper';

function LoginPage(){
    
  return (
    <>
        <div className="map">
            <nav id="navbar">
                <div>
                    <h1>Car Pool App</h1>
                </div>
                <img src="./images/car.png"></img>
            </nav>
            <div id="container">
                 <div id='formContainer'>
                    <div>
                         <label>Username</label>
                        <input id='username' name='username' className='newForm'></input>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" id='password' name='password' className='newForm'></input>   
                    </div>
                </div>
                <button onClick={x=>Login()}>Login</button>
            <span id='signup'><Link to='/signup'>Signup?</Link></span>
            </div>
        </div>
    </>
  );
}

export default LoginPage;
