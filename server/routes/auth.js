import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({ success: false, message: "failure" })
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }

        req.session.destroy((err) => {
            res.clearCookie('connect.sid')

            res.json({ status: "logout", user: {} })
        })
    })
})

router.get(
    '/github',
    passport.authenticate('github', {
        scope: [ 'read:user' ]
    })
)

router.get(
    '/github/callback',
    passport.authenticate('github', {
        successRedirect: 'https://client-2aeu.onrender.com',
        failureRedirect: 'https://client-2aeu.onrender.com/destinations',
    })
)

// server/config/auth.js
console.log('AUTH DEBUG:', {
  clientID: process.env.GITHUB_CLIENT_ID ? 'SET' : 'MISSING',
  clientSecret: process.env.GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING',
})

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://server-m46y.onrender.com/auth/github/callback'
}

export default router
