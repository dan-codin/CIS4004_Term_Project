import  * as React from 'react';
import  {useEffect} from 'react';
import Map, {Marker, Popup} from 'react-map-gl/mapbox';
import { SearchBox } from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/master.css';
import { FindRoutes,SaveReservation, LogOut} from './Helper';
import { useState } from 'react';

function ReservePage() {
    const ucfLat = 28.6024;
    const ucfLong = -81.2001;
    const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
    const [pins, setPins] = useState([])
    const [viewState, setViewState] = React.useState({
    latitude: ucfLat ,
    longitude: ucfLong,
    zoom: 9
    });
    useEffect(()=>{
        if(sessionStorage.getItem('availableRides')){
           const coords = JSON.parse(sessionStorage.getItem('availablerides'));
            setPins(coords);
            console.log(coords)
        
    }}, [])       

    
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                     <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName} <button id='logout'onClick={x=>LogOut()}>Log Out</button></span>
                    <h3>Car Pool App : <span>Reserve Ride</span></h3>
                </div>
                 <a id='url' href='/home'>
                    <img id='home' src='./images/home.PNG'></img>
                </a>
            </nav>
        
            <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: '100nw', height:"40vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken = {TOKEN}
            >
            
            {pins.map(p => (
                <>
                    <Marker longitude={p.PickUpLng} latitude={p.PickUpLat} color='green'/>
                    <Marker longitude={p.DropOffLng} latitude={p.DropOffLat} color='blue'/>
    
                </>
                ))}
            <Popup longitude={ucfLong} latitude={ucfLat}
            anchor="left">
            UCF
            </Popup>
            <Marker longitude={ucfLong} latitude={ucfLat} color="red" />        
            </Map>
            
            <div id="container">
                <form id='rideForm'>
                    <div className='searchbox'id='pickup'style={{ zIndex: 1, placeholder:'pickup location'}}>
                        <SearchBox 
                            accessToken={TOKEN}
                            onRetrieve={(res) => {
                            const [lng, lat] = res.features[0].geometry.coordinates;
                            setViewState({ ...viewState, longitude: lng, latitude: lat });
                            }}
                        />
                    </div>
                    <span id='pickuplng' value='' ></span>
                        <span id='pickuplat' value='' ></span>
                        <span id='destinationlng' value='' ></span>
                        <span id='destinationlat' value='' ></span>
                    <div className='searchbox'id='destination'style={{ zIndex: 1, placeholder:'pickup location'}}>
                        <SearchBox 
                            accessToken={TOKEN}
                            onRetrieve={(res) => {
                            const [lng, lat] = res.features[0].geometry.coordinates;
                            setViewState({ ...viewState, longitude: lng, latitude: lat, zoom: 12});
                            <Marker longitude={lng} latitude={lat} color="blue" />
                            }}
                        />
                    </div>
                    <label>Date</label>
                    <input type='date' id='pickupDate' name='pickupDate' className='newForm'></input>
                </form>
                <button className="custombtn"id='search' onClick={x => {const results = FindRoutes()}}>Find Rides</button>
                <div id='ridesResult'></div>
            </div>
        </div>
    </>
  );
}

export default ReservePage;
