import * as React from 'react';
import '../src/master.css';
import { SignUp } from './Helper';

function SignUpPage(){
    
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
                        <label>First Name</label>
                        <input id='fname' name='fname' className='newForm'></input>
                         <label>Username</label>
                        <input id='username' name='username' className='newForm'></input>
                    </div>

                    <div>
                        <label>Last name</label>
                        <input id='lname' className='newForm'></input>
                        <label>Password</label>
                        <input type="password" id='password' name='password' className='newForm'></input>   
                        <label>Admin</label>
                        <input type='checkbox' id='admin'></input>
                    </div>
                </div>
                <button className="custombtn"onClick={x=>SignUp()}>Submit</button>
            </div>
        </div>
    </>
  );
}

export default SignUpPage;
