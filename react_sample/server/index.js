const express = require('express')
require('dotenv').config()
const PORT = 5000;
const knex = require('knex');
const config = require('./knexfile.js')['development'];

const axios = require('axios');
const db = knex(config);
const app = express();


//db.startdb();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// ROUTES
//post/get login
//post/get signup
//get main page
//get user data

//post new quake data

app.get(`/welcome:username`, async (req, res) => {
    let username = req.query.username
        
    res.send('Welcome, please login or signup to continue.')
})

app.post('/signup', async (req, res) => {
    console.log('request here')

    let body = req.body
    let user = req.body.username
    let pass = req.body.password
    let zip = Number(req.body.zipcode)
    console.log('to dbase', {user, pass, zip})
    //call the controller functions that connect to the postgres database (quakefeed ==> the users table)
    //use the zipcode npm dependency to determine the latitude and longitude of the zipcode provided by the user
    //add the username to the username column , password to the password column , add numerical zip to the zipcode column
    //send API call to the USGS url endpoint to retrieve specific earthquake data
    //send back response object with one data property containing array of lat/lng for user location, then an obj containing USGS data to be reshaped by frontend 
    
    let newUser = await db('users').insert({username: user, password: pass, zipcode: zip})
    if (newUser) {
        console.log('new user created')
        res.status(201).json({message: 'User created successfully'})
    }


 //getQuakes();
    // knex.insert({username: user, password: pass, zipcode: zip}).into('users')
    // .then(() => {
    //     res.status(201).json({message: 'User created successfully'})
    // })
    // .catch((err) => {
    //     res.status(500).json({message: 'Error creating user', error: err})
    // })
})

app.post('/login', async (req, res) => {

        console.log('request here')
        try {
            let body = req.body
            let user = req.body.username
            let pass = req.body.password
            let zip = Number(req.body.zipcode)
            let user_info = await db('users').where({username: user, password: pass}).first()
            if (user_info && user_info.password === pass) {
                res.status(200).json('Login Successful')
            }
        } catch (err) {
            res.json(err)
        }
        //setUserData(userInfo);

        //console.log(coordinates, 'the coords')
        //setQuakes(coordinates) 
        //console.log(quakes, 'the quakes')
    
    //call the controller functions that connect to the postgres database (quakefeed ==> the users table)
    //use the zipcode npm dependency to determine the latitude and longitude of the zipcode provided by the user
    //add the username to the username column , password to the password column , add numerical zip to the zipcode column
    //send API call to the USGS url endpoint to retrieve specific earthquake data
    //send back response object with one data property containing array of lat/lng for user location, then an obj containing USGS data to be reshaped by frontend 

})


app.post('/report:id', async (req, res) => {

})

app.put('/report:id', async (req, res) => {

})

app.delete('/report:id', async (req, res) => {

})

app.listen(PORT, () => {
    console.log(`app listening: https://localhost:${PORT}`)
})

