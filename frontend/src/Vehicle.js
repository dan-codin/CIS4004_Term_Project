import * as React from 'react';
import '../src/master.css';
import {DriverCheck, LogOut, EditVehicle} from './Helper'

function VehiclePage() {
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                    <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName} <button id='logout'onClick={x=>LogOut()}>Log Out</button></span>
                    <h3>Car Pool App : <span> Garage</span></h3>
                </div>
                 <a id='url' href='/home'>
                    <img id='home' src='./images/home.PNG'></img>
                </a>
            </nav>
            
           
            <div id="container">
                <div id='formContainer'>
                    <div>
                         <label>You are required to have a driver profile to add or edit vehicles</label>
                    </div>
                </div>
                <button className="custombtn"id='addCar'onClick={x => DriverCheck()}>Add Vehicle</button>
                <button className="custombtn"id='addCar'onClick={x => EditVehicle()}>Edit Vehicle</button>
                <div id='adminResults'></div>
            </div>
        </div>
    </>
  );
}

export default VehiclePage;
