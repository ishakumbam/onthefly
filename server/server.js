import express from 'express'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips-destinations.js'
import authRoutes from './routes/auth.js'
import userTripRoutes from './routes/users-trips.js'

const app = express()

app.use(session({
    secret: 'codepath',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json())

app.use(cors({
    origin: 'https://client-2aeu.onrender.com',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(GitHub)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

app.use('/auth', authRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)
app.use('/api/users-trips', userTripRoutes)

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
