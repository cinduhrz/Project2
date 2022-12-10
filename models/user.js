/////////////////////////////////////////////
// Our User Model
/////////////////////////////////////////////

// Import Dependencies
const mongoose = require('./connection') // import mongoose to use schema and model

// pull schema and model from mongoose
const { Schema, model } = mongoose

// create the schema
const userSchema = new Schema
({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// make user model
const User = model("User", userSchema)

// Export User model
module.exports = User