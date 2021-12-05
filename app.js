const express = require('express')
const colors = require('colors')
const helmet=require('helmet')
const cors=require('cors')
const swaggerJsdoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
require('dotenv').config({ path: './.env' })

const connectDB = require('./api/config/db')
const swaggerOptions={
	swaggerDefinition:{
		info:{
			title: 'SnappyURL REST API',
			description: 'A snappy url shortener for all your giant URLs',
			contact: {
				name: 'Sandipan Das <sandip2224>'
			},
			servers: ['http://localhost:3000']
		}
	},
	apis: ['api/routes/*.js']
}

const swaggerDocs=swaggerJsdoc(swaggerOptions)

const app = express()
connectDB()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./api/routes/urlRoute'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const server = app.listen(process.env.PORT || 3000, console.log(`CORS-enabled server running on port ${process.env.PORT || 3000}`.green.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	server.close(() => process.exit(1))
})
