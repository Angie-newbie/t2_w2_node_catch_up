// import express from 'express' // Import the default export
import { Router } from 'express' // Destructures Router from within the default export
import User from '../models/user.js'
import { setThePassword } from 'whatwg-url'

const router = Router()

// Register a new user 
// posibly portect route so only admin can do it
// TODO:  encrypt the password
router.post('/register', async (req,res) => {
    try {
        // Get post data from the request body
        const bodyData = req.body
        // Create and save new Post instance
        const user = await User.create({
            email: req.body.email,
            password: crypto.hash(req.body.password, 10)

        })
        // Send user to the lient with 201 status
        res.status(201).send(user.select('-password'))
    }
    catch (err) {
        // TODO: Log to error file
        res.status(400).send({ error: err.message })
    }

})
// TODO: Login
router.post('/login', (req,res) => {
    
    res.send({ route: 'POST /login'})
})

export default router