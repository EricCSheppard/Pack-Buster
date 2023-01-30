////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const SavedCardRouter = require('./controllers/savedCardControllers')
const UserRouter = require('./controllers/user')
const User = require("./models/user")
const ApiRouter = require('./controllers/mtgapi')
const CommentRouter = require('./controllers/commentControllers')
const axios = require('axios')
// const CardRouter = require('./controllers/cardControllers')
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/savedCards', SavedCardRouter)
app.use('/mtgapi', ApiRouter)
app.use('/comments', CommentRouter)
// app.use('/cards', CardRouter)

app.get('/', async (req, res) => {
    const { username, userId, loggedIn } = req.session
    const setCall = await axios(`${process.env.MTG_API_URL}/sets`)
    const sets = setCall.data.sets
	res.render('index.liquid', { sets, loggedIn, username, userId, })
})  

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})