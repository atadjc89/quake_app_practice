import { Fragment, useState } from "react";
let items = ["New York", "San Francisco", "Tokyo", "London", "Berlin"];
import { Link } from "react-router-dom";
import axios from "axios";
import background from "../assets/earthquake-gif-2.gif";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Input, FormControl, InputLabel, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";

const getMessage = () => {
  return items.length === 0 ? <p>No items found</p> : null;
};

function ListGroup({
  username,
  setUsername,
  password,
  setPassword,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  againpassword,
  setAgainpassword,
}) {

  const [pagestate, setPagestate] = useState("login");

  const form_info = {
    username: username,
    password: password,
    latitude: latitude,
    longitude: longitude,
  };

  const sendUserInfo = async () => {
    let body = {};
    console.log('here', pagestate)
    if (pagestate === "signup") {
      //signup
      body = {
        username: username,
        password: password,
        coordinates: [latitude, longitude],
      };
    } else {
      //login
      body = {
        username: username,
        password: password
      };
    }
    let request = await axios.post(`http://localhost:5000/${pagestate}`, body).then(async (res) => {
        console.log('response here');
        if (res.status === 400) {
          alert("invalid credentials")
        } else {
          let data = res.data;
          console.log('data', data.info[0]);
          setUsername(username)
          setLatitude(data.info[0].lat)
          setLongitude(data.info[0].lng)
        }
        // if (res.status === 201) {

        //   setUsername(username);
        // }
        
    });
  };

  const loginForm = (
    <>
      <form>
        <div>
          <label for="username" style={{color: "black"}}>Username:</label>
          <Input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            required
          >
            {" "}
          </Input>
        </div>
        <div>
          <label for="password" style={{color: "black"}}>Password:</label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            required
          >
            {" "}
          </Input>
        </div>
      </form>
    </>
  );

  const signupForm = (
    <>
      <form>
        <div>
          <label for="username" style={{color: "black"}}>Username:</label>
          <Input name="username" 
          value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            
            required>
            {" "}
          </Input>
        </div>
        <div>
          <label for="password" style={{color: "black"}}>Password:</label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            required
          >
            {" "}
          </Input>
        </div>
        <div>
          <label for="retype" style={{color: "black"}}>Retype Password:</label>
          <Input
            name="retype"
            type="password"
            value={againpassword}
            onChange={(e) => {
              e.preventDefault();
              setAgainpassword(e.target.value);
            }}
            required
          ></Input>
        </div>
        <div>
          <label for="coordinates" style={{color: "black"}}>Please Provide Coordinates:</label>

          <input
           
            type="number"
            id="lat"
            name="latitude"
            min="-90"
            max="90"
            value={latitude}
            onChange={(e) => {
              e.preventDefault();
              setLatitude(e.target.value);
            }}
          />
          <input 
           
            type="number"
            id="long"
            name="longitude"
            min="-180"
            max="180"
            value={longitude}
            onChange={(e) => {
              e.preventDefault();
              setLongitude(e.target.value);
            }}
          />
        </div>
      </form>
    </>
  );

  return (
    <>
      <div
        className="container text-center"
        style={{
          backgroundColor: "beige",
          backgroundSize: "cover",
        }}
      >
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setUsername("");
            setPassword("");
            setLatitude("");
            setLongitude("");
            setPagestate("login");
            console.log("logging in...", pagestate);
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setUsername("");
            setPassword("");
            setAgainpassword("");
            setLatitude("");
            setLongitude("");
            setPagestate("signup");
            console.log("signing up...", pagestate);
          }}
        >
          Signup
        </Button>
        <Fragment>
          <h1 style={{ color: "black" }}> Earthquake Tracker</h1>
          {pagestate === "login" ? (
            <div style={{ color: "black" }}>Please Login Below</div>
          ) : (
            <div style={{ color: "black" }}>Please Signup Below</div>
          )}
          {items.length === 0 && <p>No items found</p>}

          {pagestate === "login" ? loginForm : signupForm}

          <div></div>
          <Link to="/main">
          <Button
            variant="contained"
            onClick={(e) => {
              //e.preventDefault();
              if (pagestate === "signup" && password !== againpassword) {
                e.preventDefault()
                alert("Passwords do not match");
                return;
              } else if (password.length < 5) {
                e.preventDefault()
                alert("Password must be at least 5 characters long");
                return;
              } else if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180) {
                e.preventDefault()
                alert("Please use proper coordinates: -90 > latitude < 90 ***** -180 > longitude < 180")
                return;
              } else if (username === "" || password === "" || latitude === "" || longitude === "") {
                e.preventDefault()
                alert("Please fill in all fields"); 
                return;
              } else {
                sendUserInfo();
                //window.location.href = "http://localhost:5173/main"
              }
            }}
          >
            Submit
          </Button>
          </Link>
        </Fragment>
      </div>
    </>
  );
}

export default ListGroup;
