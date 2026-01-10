import React from 'react';
import {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerF, InfoWindow} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from '../App.jsx';
import { Carousel } from 'react-bootstrap';
const containerStyle = {
 width: '800px',
 height: '500px'
};
const center = {
 lat: -69,
 lng: -13
};

const other_marker = {
    lat: 37.7749,
    lng: -122.4194
}
//center of the map is a zipcode from user input
//drop pins come from coordinates retrieved from earthquake api

function MyMapComponent() {
  const [quakes, setQuakes] = useState([]);
  const [zipcode, setZipcode] = useState('');
  const [username, setUsername] = useState('');
  const getUserData = async () => {
    let user = sessionStorage.getItem("username");
    let zipcode = sessionStorage.getItem("zipcode");
    let response = await axios.get(`http://localhost:5000/welcome?${username}`)
    let data = await response.data;
    setUsername(user)
    setZipcode(zipcode)
    setQuakes(data.quakes)
  }

  const getQuakes = async () => {

    let response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2026-01-01&endtime=2026-01-03').then((response) => {
      let coordinates = response.data.features.map((item) =>  {
        return {
          lat: item.geometry.coordinates[0], 
          lng: item.geometry.coordinates[1]
        }
      })

      setQuakes(coordinates)
      // let userInfo = {
      //   userName: sessionStorage.getItem("userName"),
      //   zip: sessionStorage.getItem("zipCode")
      // }
        
    })
      
  }
  const {isLoaded}  = useJsApiLoader({
   id: 'google-map-script',
   googleMapsApiKey: 'AIzaSyDjTCgXwsaS2U10DdOVWJd0KRkVVwaZ8Ug'
 });
 const [userData, setUserData] = useState(null)
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
  getQuakes()
 //axios call to express endpoint (original endpoint moved to express file)
  //setUserData(userInfo);

  //console.log(coordinates, 'the coords')
  //setQuakes(coordinates) 
  //console.log(quakes, 'the quakes')
}, [])
return isLoaded ? (<>



  {/* <div class="container text-center">
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col-8">col-8</div>
    <div class="col-4">col-4</div>
  </div>
</div> */}


{/* <>
<div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="..." className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..."/>
    </div>
  </div>
</div>
</> */}
    {/* <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
   <GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     options={{minZoom: 3, zoom: 3, maxZoom: 10}}
     zoom={10}
     onLoad={onLoad}
     onUnmount={onUnmount} 
   >
    {quakes.map((quake, i) =>{  
      return (
      
      <MarkerF
          key={i}
          zoom={5}
          onClick={(e) => {console.log("clicked", quake.lat, quake.lng)}}
          position={{ lat: Number(quake.lat), lng: Number(quake.lng) }}
          ></MarkerF>) })}
          <Marker postion={center} onClick={(e) => {console.log('Zipcode Marker', center)}}></Marker>
   </GoogleMap>
   <Link to="/"><Button variant="contained">Back</Button></Link>
   <div>
   <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </Carousel.Caption>
        </Carousel.Item>
   </Carousel>
   </div>
   </>
 ) : <><div>Loading...  </div>
 </>;

}
export default React.memo(MyMapComponent);