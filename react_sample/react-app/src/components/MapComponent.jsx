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
import Button from "@mui/material/Button";
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

function MyMapComponent() {
  const [quakes, setQuakes] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [username, setUsername] = useState("");
  const [news, setNews] = useState([]);
  const getUserData = async () => {
    let user = sessionStorage.getItem("username");
    let zipcode = sessionStorage.getItem("zipcode");
    let response = await axios.get(`http://localhost:5000/welcome?${username}`);
    let data = await response.data;
    setUsername(user);
    setZipcode(zipcode);
    setQuakes(data.quakes);
  };

  const getQuakes = async () => {
    let response = await axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2026-01-01&endtime=2026-01-03"
      )
      .then((response) => {
        let coordinates = response.data.features.map((item) => {
          return {
            lat: item.geometry.coordinates[0],
            lng: item.geometry.coordinates[1],
          };
        });
        setQuakes(coordinates);
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

    //let other_response = await axios.

    // let userInfo = {
    //   userName: sessionStorage.getItem("userName"),
    //   zip: sessionStorage.getItem("zipCode")
    // }
  };
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
      <h4>Your Zipcode: {zipcode}</h4>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={{ minZoom: 3, zoom: 3, maxZoom: 10 }}
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
                console.log("clicked", quake.lat, quake.lng);
              }}
              position={{ lat: Number(quake.lat), lng: Number(quake.lng) }}
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
            <Carousel.Item interval={1500} style={{ maxWidth: "75vw" }}>
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
