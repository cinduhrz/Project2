/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // load env variables for DATABASE_URL
const mongoose = require('mongoose') // import mongoose

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", () => console.log(error))

/////////////////////////////////////////////
// Export Connection
/////////////////////////////////////////////
module.exports = mongoose