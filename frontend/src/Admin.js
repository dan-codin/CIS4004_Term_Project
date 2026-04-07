import * as React from 'react';
import '../src/master.css';
import {GetAllReservations, GetUsers, LogOut, Change} from './Helper'

function AdminPage() {
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                    <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName} <button id='logout'onClick={x=>LogOut()}>Log Out</button></span>
                    <h3>Car Pool App : <span> Administrator</span></h3>
                </div>
                <a id='url' href='/home'>
                    <img id='home' src='./images/home.PNG'></img>
                </a>
            </nav>
            <div id='adminBtns'>
                <button className="custombtn" id='users' onClick={x=>GetUsers()}>User Profiles</button>
            </div>
            <div id="container">
                <input id='myuserpw' type='password'></input>
                <button onClick={x => Change()}>Change Password</button>
                <div id='adminResults'>
                   
                </div>
            </div>
        </div>
    </>
  );
}

export default AdminPage;
