/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express') // bring this in so we can make our router obj
const sessionNote = require('../models/sessionNote') // import sessionNote model for routes
const mongoose = require('../models/connection') // connect to db
const SessionNote = require('../models/sessionNote')


/////////////////////////////////////////////
// Create Router
/////////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////////
// Router Middleware
/////////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
})


/////////////////////////////////////////////
// Actual Routes (INDUCES)
/////////////////////////////////////////////

// Index
router.get('/home', async (req, res) => {
    const notes = await SessionNote.find({})
    const sortedNotes = notes.sort((a, b) => b.date - a.date)
    console.log(sortedNotes)

    const shortenedDates = sortedNotes.map((note) => {
        return note.date.toDateString()
    })
    console.log(shortenedDates)

    const username = req.session.username

    res.render('client/index.ejs', {
        notes: notes,
        dates: shortenedDates,
        username: username
    })
})


// New
router.get('/notes/new', (req, res) => {
    res.render('client/new.ejs')
})

// Delete
router.delete('/notes/:id', (req, res) => {
    SessionNote.findByIdAndDelete(req.params.id, (err, deletedNote) => {
        console.log(err, deletedNote)

        // redirect user back to index
        res.redirect('/home')
    })
})

// Update
router.put('/notes/:id', async (req, res) => {

    // if date input is empty (date was not changed), add original date back into date property
    if (!req.body.date) {
        const note = await SessionNote.findById(req.params.id)
        req.body.date = note.date
    }

    console.log(req.body)

    SessionNote.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedNote) => {
        // function alr updates note, not just redirect user back
        res.redirect(`/notes/${req.params.id}`)
    })

})

// Create
router.post('/notes', (req, res) => {
    // test route
    // res.send(req.body)

    // set username = to user making the note (do this after setting up auth)
    // req.body.username = req.session.username

    SessionNote.create(req.body, (err, createdNote) => {
        console.log(createdNote)

        // redirect user back to home notes page
        res.redirect('/home')
    })
})

// Edit
router.get('/notes/:id/edit', async (req, res) => {
    // test route
    // res.send(`You want to edit the note with an id of: ${req.params.id}`)

    const note = await SessionNote.findById(req.params.id)

    // convert date to shortened ver
    const date = note.date.toDateString()

    res.render('client/edit.ejs', { note, date })

})

// Show
router.get('/notes/:id', async (req, res) => {
    // test route
    // res.send(req.params.id)
    console.log(req.params.id)

    const note = await SessionNote.findById(req.params.id)

    console.log(note)

    // convert date to shortened ver
    const date = note.date.toDateString()

    res.render('client/show.ejs', { note, date })

})


/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router