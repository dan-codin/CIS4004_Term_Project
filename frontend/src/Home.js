import * as React from 'react';
import '../src/master.css';
import {Link} from 'react-router-dom'
import { ListVehicles,LogOut} from './Helper';

function HomePage(){
    let show = 'none'
   if(JSON.parse(sessionStorage.getItem('user')).admin){
        show = ''
    }
  return (
    <>
        <div className="map-home">
            <nav id="navbar">
                <div>
                    <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName} <button id='logout'onClick={x=>LogOut()}>Log Out</button></span>
                    
                    <h1>Car Pool App</h1>
                </div>
                 <a id='url' href='/home'>
                    <img id='home' src='./images/home.PNG'></img>
                </a>
                <img src="./images/car.png"></img>
            </nav>
            <div id="container">
                <button className="custombtn"><Link to='/Reserve'>Reserve Ride</Link></button>
                <button className="custombtn"onClick={x=>ListVehicles()}><Link to='/Offer'>Offer Ride</Link></button>
                <button className="custombtn"><Link to='/Driver'>Add Driver</Link></button>
                <button className="custombtn"><Link to='/Vehicle'>Garage</Link></button>
                <button className="custombtn" style={{display:show}}><Link to='/Admin'>Admin</Link></button>
            </div>
        </div>
    </>
  );
}

export default HomePage;
