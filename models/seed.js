/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection') // import connected mongoose
const SessionNote = require('./sessionNote') // import sessionNote model

/////////////////////////////////////////////
// Seed Code
/////////////////////////////////////////////
// seeds data into database once we are connected
// so essentially resets database everytime we connect

// Make sure code is not run until we are connected
mongoose.connection.on("open", () => {

    // array of seed data for session notes
    const startingNotes = [
        {
            date: new Date('2023-11-23'),
            preSessionNote: "Have been feeling down the past week for some reason. It could be the changing of the seasons or something else.",
            postSessionNote: "Plan to Cope with Seasonal Depression: take Vitamin D every morning, use therapy light, exercise every other day.",
            username: "adam"
        },
        {
            date: new Date('2023-11-17'),
            preSessionNote: "Work has been pretty stressful lately. I can't seem to relax after coming home.",
            postSessionNote: "Kim suggested I try to remember the other parts of myself that aren't a 'worker', that I am more than just my work.",
            username: "adam"
        },
        {
            date: new Date('2023-11-10'),
            preSessionNote: "This week was pretty good! I went to a hockey game with my daughter for her 12th birthday.",
            postSessionNote: "Keep up the family time. Eat a little healthier. Try to exercise in the mornings before work.",
            username: "adam"
        }
    ]

    // Start seeding process
    // 1. Delete all prev session note data
    SessionNote.deleteMany({}, (err, data) => {
        // 2. Create new session notes
        SessionNote.create(startingNotes, (err, createdNotes) => {
            // console.log the seed data
            console.log("-------SESSION NOTES CREATED-------")
            console.log(createdNotes)
            console.log("-------SESSION NOTES CREATED-------")

            // close the db connection
            mongoose.connection.close()
        })
    })
})