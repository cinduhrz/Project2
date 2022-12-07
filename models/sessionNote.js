/////////////////////////////////////////////
// Our Session Note Model
/////////////////////////////////////////////

// Import Dependencies
const mongoose = require('./connection') // import connected mongoose

// pull Schema and model from mongoose
const { Schema, model } = mongoose

// make sessionNote Schema
const sessionNoteSchema = new Schema({
    preSessionNote: String,
    postSessionNote: String,
    username: String
})

// make sessionNote model
const sessionNote = model("sessionNote", sessionNoteSchema)

// export sessionNote model to user in routers
module.exports = sessionNote