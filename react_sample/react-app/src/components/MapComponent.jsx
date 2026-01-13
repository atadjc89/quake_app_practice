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
const center = {
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
  const [move, setMove] = useState('translate(-50%, -50%)')

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
    let response = await axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2026-01-03&minmagnitude=6"
      )
      .then((response) => {
        let quake_information = response.data.features.map((item) => {
          return {
            title: item.properties.title,
            date: item.properties.time,
            magnitude: item.properties.mag,
            location: item.properties.place,
            url: item.properties.url,
            coordinates: [item.geometry.coordinates[0], item.geometry.coordinates[1]]
          };
        });
        setQuakes(quake_information);
      });
    let news = await axios
      .get(
        "https://newsapi.org/v2/everything?q=earthquake&apiKey=7180e9e0349140de95cd3e91a01059a4"
      )
      .then((other_response) => {
        let news_data = other_response.data;
        setNews(news_data.articles);

        //console.log(, 'news data')
      });
    };
    

  const card = (
    <Box
      sx={{
        minWidth: 275,
        maxWidth: '100px',
        zIndex: 10,
        visibility: hide,
        position: 'absolute',
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
            {quakedata.title}
          </Typography>
          <Typography variant="h5" component="div">
            {quakedata.magnitude} Magnitude
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {quakedata.date}
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
    googleMapsApiKey: "AIzaSyDjTCgXwsaS2U10DdOVWJd0KRkVVwaZ8Ug",
  });
  const [userData, setUserData] = useState(null);
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
    getQuakes();
    //axios call to express endpoint (original endpoint moved to express file)
    //setUserData(userInfo);

    //console.log(coordinates, 'the coords')
    //setQuakes(coordinates)
    //console.log(quakes, 'the quakes')
  }, []);
  return isLoaded ? (
    <>
      <h3> Hello, {username} </h3>
      <h4>Your Zipcode: </h4>
      {card}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={{ minZoom: 3, zoom: 4, maxZoom: 3 }}
        zoom={10}
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
                  location: quake.place,
                  url: quake.url,
                  coordinates: quake.coordinates
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
          postion={center}
          onClick={(e) => {
            console.log("Zipcode Marker", center);
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
