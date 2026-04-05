import * as React from 'react';
import '../src/master.css';
import {DriverCheck} from './Helper'

function VehiclePage() {
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                    <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    <h3>Car Pool App : <span> Driver</span></h3>
                </div>
            </nav>
            
           
            <div id="container">
                <div id='formContainer'>
                    <div>
                         <label>You are required to have a driver profile to add or edit cars</label>
                    </div>
                </div>
                <button id='addCar'onClick={x => DriverCheck()}>Add Vehicle</button>
            </div>
        </div>
    </>
  );
}

export default VehiclePage;
