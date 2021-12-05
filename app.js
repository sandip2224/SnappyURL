const express = require('express')
const colors = require('colors')
const helmet=require('helmet')
const cors=require('cors')
require('dotenv').config({ path: './.env' })

const connectDB = require('./api/config/db')

const app = express()
connectDB()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./api/routes/urlRoute'))

const server = app.listen(process.env.PORT || 3000, console.log(`CORS-enabled server running on port ${process.env.PORT || 3000}`.green.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	server.close(() => process.exit(1))
})
