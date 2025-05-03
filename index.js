import 'dotenv/config'

import express from 'express' // ES6 modules
import cors from 'cors'
import helmet from 'helmet'
import post_routes from './routes/post_routes.js'
import auth_routes from './routes/auth_routes.js'
import { connect } from './db.js'

console.log(process.env)

const app = express()
const port = 3000

// Generally, sercurity related middleware should happen as early as possible


// Insert middleware to parse a JSON body
app.use(express.json())

// Python: app.register_blueprint(post_routes)
// app.use inserts middleware into the request-response cycle
app.use(auth_routes)
app.use(post_routes)


// Error handler
app.use((err,req, res, next) => {
    // console.error(err.stack)
    // console.log(err)
    res.status(400).send({error: error.message})
})

// Start the dev server on the given port
// The callback is called when the server is running
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    connect()
})