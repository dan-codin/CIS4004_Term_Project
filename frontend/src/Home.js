import * as React from 'react';
import '../src/master.css';
import {Link} from 'react-router-dom'
import { ListVehicles } from './Helper';

function HomePage(){
    
  return (
    <>
        <div className="map">
            <nav id="navbar">
                <div>
                    <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    <h1>Car Pool App</h1>
                </div>
                <img src="./images/car.png"></img>
            </nav>
            <div id="container">
                <button><Link to='/Reserve'>Reserve Ride</Link></button>
                <button onClick={x=>ListVehicles()}><Link to='/Offer'>Offer Ride</Link></button>
                <button><Link to='/Driver'>Add Driver</Link></button>
                <button ><Link to='/Vehicle'>Garage</Link></button>
            </div>
        </div>
    </>
  );
}

export default HomePage;
