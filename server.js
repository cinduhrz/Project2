///////////////////////////////////
// Import Dependencies
///////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('./models/connection') // connect to db


///////////////////////////////////
// Create Express App Object
///////////////////////////////////
const app = express()


///////////////////////////////////
// Register Middleware
///////////////////////////////////
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))


// Routers and Routes
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('client/index.ejs')
})


///////////////////////////////////
// Turn Server On
///////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})