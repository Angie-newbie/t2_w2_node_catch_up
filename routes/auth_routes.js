// import express from 'express' // Import the default export
import { Router } from 'express' // Destructures Router from within the default export
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET


const router = Router()

// Register a new user 
// posibly portect route so only admin can do it
// TODO:  encrypt the password
router.post('/register', async (req,res) => {
    try {
        // If user is an admin, pass isAdmin to create()

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
router.post('/login', async (req, res) => {
    
    try {
        // find the user with the provided email
        const user = await User.findOne({email: req.body.email})
        if (user) {
            // valid the password
            const match = await bcrypt.compare(req.body.password || '' ,user.password)
            if (match){
                const token = jwt.sign({
                    email: user.email,
                    exp: Math.floor(Date.now()/ 1000) + (60 * 60)
                }, secret)
                // Generate a JWT and send it to the client
                res.send({token, email: user.email})
            } else {
                res.status(404) .send({error: 'Email or password incorrect'})
            }
        } else {
             res.status(404) .send({error: 'Email or password incorrect'})
        }
    }       
        catch (err) {
            res.status(400).send({ error: err.message })
        }
})

export default router