import * as React from 'react';
import Map, {Marker} from 'react-map-gl/mapbox';
import { SearchBox } from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/master.css';
import {NewOffer, ListVehicles} from './Helper'


function OfferPage() {
    const ucfLat = 28.6024;
    const ucfLong = -81.2001;
    const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
    const [viewState, setViewState] = React.useState({
    latitude: ucfLat ,
    longitude: ucfLong,
    zoom: 14
    });
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                     <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    <h3>Car Pool App : <span> Offer Ride</span></h3>
                </div>
            </nav>
            
            <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: 800, height: 300}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken = {TOKEN}
            >
            <Marker longitude={ucfLong} latitude={ucfLat} color="red" />
        
            </Map>
            <div id="container">
                <div id='rideForm'>
                    <div className='searchbox'id='pickup'style={{ zIndex: 1, placeholder:'pickup location'}}>
                        <label>Pick-up Location</label>
                        <SearchBox 
                            accessToken={TOKEN}
                            onRetrieve={(res) => {
                            const [lng, lat] = res.features[0].geometry.coordinates;
                            document.getElementById('pickuplng').value= lng;
                            document.getElementById('pickuplat').value = lat;
                            setViewState({ ...viewState, longitude: lng, latitude: lat });
                            }}
                        />
                    </div>
                    <div className='searchbox'id='destination'style={{ zIndex: 1, placeholder:'pickup location'}}>
                        <label>Drop-off Location</label>
                        <SearchBox 
                            accessToken={TOKEN}
                            onRetrieve={(res) => {
                            const [lng, lat] = res.features[0].geometry.coordinates;
                            document.getElementById('destinationlng').value= lng;
                            document.getElementById('destinationlat').value = lat;
                            setViewState({ ...viewState, longitude: lng, latitude: lat, zoom: 14});
                            <Marker longitude={lng} latitude={lat} color="blue" />
                            }}
                        />
                    </div>
                </div>
                <div id='formContainer'>
                    <div id='first'>
                        <span id='pickuplng' value='' ></span>
                        <span id='pickuplat' value='' ></span>
                        <span id='destinationlng' value='' ></span>
                        <span id='destinationlat' value='' ></span>
                        <label>Date</label>
                        <input type='date' id='pickupDate' name='pickupDate' className='newForm'></input>
                         <label>First Name</label>
                        <span id='fname' name='fname' className='newForm'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    </div>

                    <div id='last'>
                        <div>
                            <label>Time</label>
                            <input type='time' id='pickupTime' name='pickupTime' className='newForm'></input> 
                        </div> 
                        <label>Last name</label>
                        <span id='lname' className='newForm'>{JSON.parse(sessionStorage.getItem('user')).lastName}</span>
                    </div>
                        <div id='car'>
                            <label>Vehicle</label>
                            <select className='newForm' id='vehicle'></select>
                        </div>
                </div>
                <button id='search' onClick={x=>NewOffer()}>Save Route</button>
            </div>
        </div>
    </>
  );
}
export default OfferPage;
