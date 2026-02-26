const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
//require("dotenv").config();
import React from "react";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "../App.jsx";
import { Carousel } from "react-bootstrap";
const containerStyle = {
  width: "800px",
  height: "500px",
};
var center = {
  lat: -69,
  lng: -13,
};

const other_marker = {
  lat: 37.7749,
  lng: -122.4194,
};
//center of the map is a zipcode from user input
//drop pins come from coordinates retrieved from earthquake api

function MyMapComponent({
  username,
  setUsername,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) {
  const [hide, setHide] = useState("hidden");
  const [spot, setSpot] = useState([]);
  const [quakes, setQuakes] = useState([]);
  const [move, setMove] = useState('translate(0, 0)')

  const [position, setPosition] = useState({
  lat: -69,
  lng: -13,
})
  const [quakedata, setQuakeData] = useState({
    title: null,
    date: null,
    magnitude: null,
    location: null,
    url: null,
    coordinates: null
  })
  // const [zipcode, setZipcode] = useState("");
  // const [username, setUsername] = useState("");
  // center.lat = latitude;
  // center.lng = longitude
  const [news, setNews] = useState([]);
  const getUserData = async () => {
    // let user = sessionStorage.getItem("username");
    // let zipcode = sessionStorage.getItem("zipcode");
    //let response = await axios.get(`http://localhost:5000/main:${username}`);
    let data = await response.data;
    //setUsername(user);
    //setZipcode(zipcode);

    //setCoordinates(data.coordinates);
    //
    getQuakes();
    setQuakes(data.quakes);
  };

  const getQuakes = async () => {
    console.log('check check :::', username, latitude, longitude);
    let response = await axios
      .get(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-06-01&endtime=2026-02-02&maxradiuskm=2000&latitude=${latitude}&longitude=${longitude}&minmagnitude=3`
      )
      //"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2026-01-03&minmagnitude=6"
      .then((response) => {
        let quake_information = response.data.features.map((item) => {
          console.log(item, 'quake')
          return {
            title: item.properties.title,
            date: item.properties.time,
            magnitude: item.properties.mag,
            location: item.properties.place,
            url: item.properties.url,
            coordinates: [item.geometry.coordinates[0], item.geometry.coordinates[1]]
          };
        });
        console.log('QUAKES', response.data)

        setQuakes(quake_information);

      });
    let news = await axios
      .get(
        "https://newsapi.org/v2/everything?q=quake&apiKey=7180e9e0349140de95cd3e91a01059a4"
      )
      .then((other_response) => {
        let news_data = other_response.data;
        setNews(news_data.articles);

        //console.log(, 'news data')
      });

    //let other_response = await axios.

    // let userInfo = {
    //   userName: sessionStorage.getItem("userName"),
    //   zip: sessionStorage.getItem("zipCode")
    // }
  };
  // {
  //           title: quake.properties.title,
  //           date: quake.properties.time,
  //           magnitude: quake.properties.mag,
  //           location: quake.properties.place,
  //           url: quake.properties.url
  //           coordinates: [quake.geometry.coordinates[0], quake.geometry.coordinates[1]]
  //         }

  const card = (
    <Box
      sx={{
        minWidth: 275,
        maxWidth: '100px',
        visibility: hide,
        position: "absolute",
        transform: {move},
        top: '0',
        left: '0'
      }}
    >
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });
  const [userData, setUserData] = useState(null);
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(position);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  useEffect(() => {
    
    getQuakes();
    
    console.log('check check :::', username);
    //axios call to express endpoint (original endpoint moved to express file)
    //setUserData(userInfo);

    //console.log(coordinates, 'the coords')
    //setQuakes(coordinates)
    //console.log(quakes, 'the quakes')
    setPosition({lat: Number(latitude), lng: Number(longitude)})
  }, []);
  return isLoaded ? (
    <>
      <h3> Hello, {username} </h3>
      <h4>Check Out Local Quake Readings!</h4>
      {card}
      <GoogleMap
        
        mapContainerStyle={containerStyle}
        zoom={13}
        //center={() => {return position}}
        //options={{ minZoom: 3,maxZoom: 12 }}
//         options={{
//   minZoom: 3,
//   zoom: 3,
//   maxZoom: 5,
// }}
options={{
  minZoom: 3,
  zoom: 3,
  maxZoom: 5,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
}}
        // options={{
        // minZoom: 3,
        // zoom: 4,
        // maxZoom: 6,
        // mapTypeControl: false,
        // streetViewControl: false,
        // fullscreenControl: false,
        // }}
        
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {quakes.map((quake, i) => {
          return (
            <MarkerF
              key={i}
              zoom={5}
              onClick={(e) => {
                console.log(quake, 'the quake');
                //e.preventDefault();
                //console.log("clicked", quake.lat, quake.lng);
                setSpot([e.domEvent.pageX, e.domEvent.pageY]);
                setHide("visible");
                setMove(`translate(${spot[0] - 25}px, -${spot[1] + 25}px)`)
                setQuakeData({
                  title: quake.title,
                  date: quake.time,
                  magnitude: quake.magnitude,
                  location: quake,place,
                  url: quake.url
                });
                console.log(
                  "page coordinates",
                  e.domEvent.pageX,
                  e.domEvent.pageY
                );
              }}
              position={{ lat: Number(quake.coordinates[0]), lng: Number(quake.coordinates[1]) }}
            ></MarkerF>
          );
        })}
        <Marker
          postion={position}
          onClick={(e) => {
            console.log("Zipcode Marker", position);
          }}
        ></Marker>
      </GoogleMap>

      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>

      <Carousel>
        {news.map((article) => {
          return (
            <Carousel.Item interval={1500} style={{ maxWidth: "100px" }}>
              <img
                style={{ maxHeight: "500px", objectFit: "cover" }}
                className="d-block w-100"
                src={article.urlToImage}
              />
              <Carousel.Caption>
                <h3 style={{ color: "black" }}>{article.title}</h3>
                <p style={{ color: "black" }}>{article.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  ) : (
    <>
      <div>Loading... </div>
    </>
  );
}
export default React.memo(MyMapComponent);
