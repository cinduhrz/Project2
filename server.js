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
const session = require('express-session') // middleware for creating session cookies
const MongoStore = require('connect-mongo') // plugin that allows express-session to save session data in our mongo database


///////////////////////////////////
// Create Express App Object
///////////////////////////////////
const app = express()


///////////////////////////////////
// Register Middleware
///////////////////////////////////
// Order for Authentication and Authorization
// 1. express-session middleware (uses secret and MongoStore)
// 2. UserRouter (must go before other routers)
// 3. other routers
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))
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