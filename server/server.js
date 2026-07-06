import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips-destinations.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

app.use('/api/trips', tripRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
    if (!server.address()) {
        console.error(`⚠️ Failed to bind to port ${PORT} — something else is already using it.`)
        console.error(`   Run: lsof -nP -iTCP:${PORT} -sTCP:LISTEN   (then kill that process)`)
        process.exit(1)
    }
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})

server.on('error', (err) => {
    console.error('⚠️ Server error:', err.message)
    process.exit(1)
})