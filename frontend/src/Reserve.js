import  * as React from 'react';
import  {useMemo} from 'react';
import Map, {Marker} from 'react-map-gl/mapbox';
import { SearchBox } from '@mapbox/search-js-react';
import { getDistance } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/master.css';
import { FindRoutes } from './Helper';

function ReservePage() {
    const results=[]
    const ucfLat = 28.6024;
    const ucfLong = -81.2001;
    const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
    const [viewState, setViewState] = React.useState({
    latitude: ucfLat ,
    longitude: ucfLong,
    zoom: 14
    });
     let filteredLocations=[]
     if(results != null){
        filteredLocations = (() => {
        const pickuplng = document.getElementById('pickuplng').value;
        const pickuplat = document.getElementById('pickuplat').value;
    return results.filter(loc => {
      const distance = getDistance(
        { latitude: pickuplat, longitude: pickuplng },
        { latitude: loc.PickUpLat, longitude: loc.PickUpLng }
      );
      return distance <= 1609; // 1 mile in meters
    });
  }, []);     

    }
  return (
    <>
        <div className="map">
            <nav id="navbarRide">
                <div>
                     <span id='user'>{JSON.parse(sessionStorage.getItem('user')).firstName}</span>
                    <h3>Car Pool App : <span>Reserve Ride</span></h3>
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
         
             {filteredLocations.map(loc => (
            <Marker longitude={loc.longitude} latitude={loc.latitude} color='blue' />
             ))}
           
        
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
                            setViewState({ ...viewState, longitude: lng, latitude: lat, zoom: 14});
                            <Marker longitude={lng} latitude={lat} color="blue" />
                            }}
                        />
                    </div>
                    <label>Date</label>
                    <input type='date' id='pickupDate' name='pickupDate' className='newForm'></input>
                </form>
                <button id='search' onClick={x => {const results = FindRoutes()}}>Find Rides</button>
                <div id='ridesResult'></div>
            </div>
        </div>
    </>
  );
}

export default ReservePage;
