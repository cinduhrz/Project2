///////////////////////////////////
// Import Dependencies
///////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


///////////////////////////////////
// Create Express App Object
///////////////////////////////////
const app = express()


///////////////////////////////////
// Connect to Mongo
///////////////////////////////////
mongoose.connect(process.env.DATABASE_URL)

// Mongoose connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected From Mongo"))
.on("error", (error) => console.log(error))


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