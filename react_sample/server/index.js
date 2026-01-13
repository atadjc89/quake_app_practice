const express = require("express");
require("dotenv").config();
const PORT = 5000;
const knex = require("knex");
const config = require("./knexfile.js")["development"];

const axios = require("axios");
const db = knex(config);
const app = express();
const cors = require("cors");
//db.startdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// ROUTES
//post/get login
//post/get signup
//get main page
//get user data

//post new quake data

app.get("/main:username", async (req, res) => {
  try {
    let username = username;
    let date = "2026-01-01";
    let earthquakes = await db("quakes").where({ time: date });
    console.log(earthquakes, "the data");
    //let username = req.query.username
    //let user_info = await db('users').where({username: username}).first()
    //let user_zip = user_info.zipcode;

    res.json(earthquakes);
  } catch (err) {
    res.json(err);
  }
});

app.post("/signup", async (req, res) => {
    console.log('here', req.body)
  try {
    // let body = req.body;
    // let user = req.body.username;
    // let pass = req.body.password;
    //let zip = Number(req.body.zipcode);
    //console.log("to dbase", { user, pass, zip });
    //call the controller functions that connect to the postgres database (quakefeed ==> the users table)
    //use the zipcode npm dependency to determine the latitude and longitude of the zipcode provided by the user
    //add the username to the username column , password to the password column , add numerical zip to the zipcode column
    //send API call to the USGS url endpoint to retrieve specific earthquake data
    //send back response object with one data property containing array of lat/lng for user location, then an obj containing USGS data to be reshaped by frontend
    console.log(req.body, 'body data')
    let newUser = await db("users").insert({
      username: req.body.username,
      password: req.body.password,
      lat: req.body.coordinates[0],
      lng: req.body.coordinates[1],
    });
    if (newUser) {
      console.log("new user created");
      res.status(201).json({ info: newUser });
    }
  } catch (err) {
    res.json(err);
  }
});

app.post("/login", async (req, res) => {
  console.log("request here");
  try {
    let body = req.body;
    let user = req.body.username;
    let pass = req.body.password;
    let zip = Number(req.body.zipcode);
    let user_info = await db("users")
      .where({ username: user, password: pass })
      .first();
    if (user_info && user_info.password === pass) {
      res.status(200);
    }
  } catch (err) {
    res.json(err);
  }

  //call the controller functions that connect to the postgres database (quakefeed ==> the users table)
  //use the zipcode npm dependency to determine the latitude and longitude of the zipcode provided by the user
  //add the username to the username column , password to the password column , add numerical zip to the zipcode column
  //send API call to the USGS url endpoint to retrieve specific earthquake data
  //send back response object with one data property containing array of lat/lng for user location, then an obj containing USGS data to be reshaped by frontend
});

app.post("/quakes/report:id", async (req, res) => {
  let body = req.body;
  let username = req.body.username;
  let quake = req.body.quake; //quake id
  let comment = req.body.comment; //{username, date, comment}
  //parse request body to extract key info
  //try/catch - use model funcs to add to quakes table
  //search for quake id in array, if it's there, add a story to the quake with story info
  //if it's not there, send a 400 error to frontend
  //if successful return success code 201
});

app.put("/report:id", async (req, res) => {
  //parse request body to extract key info
  //try/catch - use model funcs to add to quakes table
  //search for quake id in array, if it's there, add a story to the quake with story info
  //if it's not there, send a 400 error to frontend
  //if successful return success code 201
});

app.delete("/report:id", async (req, res) => {
  //parse request body to extract key info
  let body = req.body;
  let quake = req.body.quake;
  //try/catch - use model funcs to add to quakes table
  //search for quake id in array, if it's there, add a story to the quake with story info
  //if it's not there, send a 400 error to frontend
  //if successful return success code 201
});

app.listen(PORT, () => {
  console.log(`app listening: https://localhost:${PORT}`);
});
