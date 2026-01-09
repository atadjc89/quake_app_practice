const express = require('express')
require('dotenv').config()
const PORT = 5000
// db = require('./db');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send('hello World')
})


app.post('/', async (req, res) => {

})

app.put('/', async (req, res) => {

})

app.delete('/', async (req, res) => {

})

app.listen(PORT, () => {
    console.log(`app listening: https://localhost:${PORT}`)
})

