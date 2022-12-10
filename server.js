///////////////////////////////////
// Import Dependencies
///////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('./models/connection') // connect to db
const SessionNoteRouter = require('./controllers/sessionNote') // import SessionNote router
const UserRouter = require('./controllers/user.js') // import User router


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
// !! put user router here (has to go BEFORE other routers bc other routers will redirect to user router's login route when ppl try to access their routes without authorization)
app.use(UserRouter)
app.use(SessionNoteRouter)


///////////////////////////////////
// Turn Server On
///////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})