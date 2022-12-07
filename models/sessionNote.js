/////////////////////////////////////////////
// Our Session Note Model
/////////////////////////////////////////////

// Import Dependencies
const mongoose = require('./connection') // import connected mongoose

// pull Schema and model from mongoose
const { Schema, model } = mongoose

// make sessionNote Schema
const sessionNoteSchema = new Schema({
    date: String,
    preSessionNote: String,
    postSessionNote: String,
    username: String
})

// make sessionNote model
const SessionNote = model("sessionNote", sessionNoteSchema)

// export sessionNote model to user in routers
module.exports = SessionNote