/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express') // need for express.Router()
const User = require('../models/user.js') // imports user model for routes AND connects to db
const bcrypt = require('bcryptjs') // to encrypt user passwords


/////////////////////////////////////////////
// Create Router
/////////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// the Signup routes (GET -> signup form, POST -> submit form and create new user)
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

router.post('/signup', async (req, res) => {
    // encrypt newly created user password
    // hash method takes 2 args: (og password, salt (randomly generated string to add to pw before hashing to make more secure))
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    // create the new user
    User.create(req.body, (err, user) => {
        // redirect to login page
        res.redirect('/login')
    })
})

// the Login routes (GET -> login form, POST -> submit form and render new page -- always need post when submitting form!)
router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', (req, res) => {
    // get data from req.body using destructuring
    const { username, password } = req.body

    // find user in database based on username
    User.findOne({ username }, (err, user) => {
        // check if user exists
        if (!user) {
            res.send("User doesn't exist")
        } else {
            // check if password matches
            const passwordMatches = bcrypt.compareSync(password, user.password)
            if (passwordMatches) {
                // create new "username" key for req.session object and set value equal to username
                req.session.username = username
                // do same w loggedIn key
                req.session.loggedIn = true
                // redirect user to home page
                res.redirect('/home')
            } else {
                res.send('Wrong password')
            }
        }
    })
})


/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router