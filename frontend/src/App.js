import * as React from 'react';
import Map, {Marker} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/master.css';


function App() {
    const ucfLat = 28.6024;
    const ucfLong = -81.2001;
   const [viewState, setViewState] = React.useState({
    latitude: ucfLat ,
    longitude: ucfLong,
    zoom: 14
  });
  return (
    <div className="map">
      <nav id="navbar"> Car Pool App</nav>
       <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 500, height: 300}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiZGEwMzc5MjAiLCJhIjoiY21tdG1oNDFwMjE1azJwcHkwbmRmbzhrNyJ9.MOdGpx8U_uFwqx0z5dPbYQ"
    >
      <Marker longitude={ucfLong} latitude={ucfLat} color="red" />
    </Map>
    <div id="container">
      <input placeholder='pickup location'></input>
      <input placeholder='destination'></input>
    </div>
    </div>
  );
}

export default App;
