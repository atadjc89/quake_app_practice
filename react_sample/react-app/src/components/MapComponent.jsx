import React from 'react';
import {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow} from '@react-google-maps/api';

import axios from 'axios';

const containerStyle = {
 width: '800px',
 height: '500px'
};
const center = {
 lat: 42,
 lng: 74
};

const other_marker = {
    lat: 37.7749,
    lng: -122.4194
}
//center of the map is a zipcode from user input
//drop pins come from coordinates retrieved from earthquake api

function MyMapComponent() {
  const [quakes, setQuakes] = useState([]);
  const {isLoaded}  = useJsApiLoader({
   id: 'google-map-script',
   googleMapsApiKey: 'AIzaSyDjTCgXwsaS2U10DdOVWJd0KRkVVwaZ8Ug'
 });
 const [map, setMap] = React.useState(null);
 const onLoad = React.useCallback(function callback(map) {
   const bounds = new window.google.maps.LatLngBounds(center);
   map.fitBounds(bounds);
   setMap(map);
 }, []);
 const onUnmount = React.useCallback(function callback(map) {
   setMap(null);
 }, []); 
useEffect(() => {

 const getQuakes = async () => {

    let response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2026-01-01&endtime=2026-01-03').then((response) => {
      let coordinates = response.data.features.map((item) =>  {return {lat: item.geometry.coordinates[0], lng: item.geometry.coordinates[1]}})
      console.log(coordinates, 'the coords')
      setQuakes(coordinates) //console.log(response.data.features, 'the stuff'); //setQuakes(response.data)
      console.log(quakes, 'the quakes')
    })
      
  }
 getQuakes();

}, [])
return isLoaded ? (
   <GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     
     zoom={5}
     onLoad={onLoad}
     onUnmount={onUnmount} 
   >  
    {quakes.map((quake, i) =>{ console.log('marker', quake); return (<MarkerF
          key={i}
          onClick={(e) => {console.log("clicked", i)}}
          position={{ lat: Number(quake.lat), lng: Number(quake.lng) }}
    ></MarkerF>) })}
   </GoogleMap>
 ) : <><div>Loading...  </div></>;

}
export default React.memo(MyMapComponent);