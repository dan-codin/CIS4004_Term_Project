import * as React from 'react';
import '../src/master.css';
import {NewDriver, DeleteDriver} from './Helper'

function DriverPage() {
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                    <h3>Car Pool App : <span> Driver</span></h3>
                </div>
            </nav>
            
           
            <div id="container">
                <div id='formContainer'>
                    <div>
                         <label>First Name</label>
                        <span id='fname' name='fname'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    </div>

                    <div>
                        <label>Last name</label>
                        <span id='lname' >{JSON.parse(sessionStorage.getItem('user')).lastName}</span>
                    </div>
                </div>
                <button id='search' onClick={x=>NewDriver()}>Add Driver</button>
                <button id='search' onClick={x=>DeleteDriver()}>Delete Driver</button>
            </div>
        </div>
    </>
  );
}

export default DriverPage;
