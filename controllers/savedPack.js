// Import Dependencies
const express = require('express')
const savedPack = require('../models/savedPack')
const axios = require('axios')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', async (req, res) => {
        savedPack.find({})
		.then(savedPacks => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('savedPacks/index', { savedPacks, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's savedPacks
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	savedPack.find({ owner: userId })
		.then(savedPacks => {
			res.render('savedPacks/index', { savedPacks, username, loggedIn })
            console.log(savedPacks)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('savedPacks/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
	savedPack.create(req.body)
		.then(savedPack => {
			console.log('this was returned from create', savedPack)
			res.redirect('/savedPacks')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const savedPackId = req.params.id
	savedPack.findById(savedPackId)
		.then(savedPack => {
			res.render('savedPacks/edit', { savedPack })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const savedPackId = req.params.id
	savedPack.findByIdAndUpdate(savedPackId, req.body, { new: true })
		.then(savedPack => {
			res.redirect(`/savedPacks/${savedPack.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const savedPackId = req.params.id
	savedPack.findById(savedPackId)
		.then(savedPack => {
            const {username, loggedIn, userId} = req.session
			res.render('savedPacks/show', { savedPack, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const savedPackId = req.params.id
	savedPack.findByIdAndRemove(savedPackId)
		.then(savedPack => {
			res.redirect('/savedPacks')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
