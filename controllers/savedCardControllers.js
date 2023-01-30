// Import Dependencies
const express = require('express')
const savedCard = require('../models/savedCard')
const axios = require('axios')
const User = require('../models/user')

// Create router
const router = express.Router()

// Postman card index route ----------------------
router.get('/cardinfo', (req, res) => {
    savedCard.find({})
    .then(savedCard => {
        res.json({ savedCard: savedCard })
    })
    .catch(err => console.log('the following error occurredL \n', err))
})

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

// Routes -----------------------------------------

// index ALL
// router.get('/', (req, res) => {
//         savedCard.find({})
// 		.then(savedCards => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
// 			res.render('savedCards/index', { savedCards, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

router.get('/user/:id', (req, res) => {
    const { username, userId, loggedIn } = req.session
    const ownerId = req.params.id
	savedCard.find({ owner: ownerId })
		.then(savedCards => {
            User.findById(ownerId)
            .populate('comments.author', 'username')
            .then(user =>{
                res.render('savedCards/index', { user, ownerId, savedCards, userId, username, loggedIn })
            })
            .catch(error => {
                res.redirect(`/error?error=${error}`)
            })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Index of users 
router.get('/', (req, res) => {
    User.find({})
    .then(users => {
        const { username, userId, loggedIn } = req.session
        res.render('savedCards/indexusers', { users, username, userId, loggedIn })
    })
    .catch(error => {
        res.redirect(`/error?error=${error}`)
    })
})

// Index that shows only the user's savedCards
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	savedCard.find({ owner: userId })
		.then(savedCards => {
			res.render('savedCards/index', { savedCards, username, loggedIn })
            // console.log(savedCards)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Index that shows a specific user's savedCards



// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('savedCards/new', { username, userId, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	req.body.owner = req.session.userId
	savedCard.create(req.body)
		.then(savedCard => {
			console.log('this was returned from create', savedCard, username, userId, loggedIn)
			res.redirect(`/savedCards/user/${userId}`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/edit/:id/', (req, res) => {
	// we need to get the id
	const savedCardId = req.params.id
	savedCard.findById(savedCardId)
		.then(savedCard => {
			res.render('savedCards/edit', { savedCard, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const savedCardId = req.params.id
	savedCard.findByIdAndUpdate(savedCardId, req.body, { new: true })
		.then(savedCard => {
			res.redirect(`/savedCards/${savedCard.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const savedCardId = req.params.id
	savedCard.findById(savedCardId)
		.then(async savedCard => {
            const addlInfo = await axios(`${process.env.SCRY_API_URL}/cards/multiverse/${savedCard.multiverseid}`)
            const scryInfo = addlInfo.data
            const {username, loggedIn, userId} = req.session
			res.render('savedCards/show', { scryInfo, savedCard, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
    const { username, userId, loggedIn } = req.session
	const savedCardId = req.params.id
	savedCard.findByIdAndRemove(savedCardId)
		.then(savedCard => {
			res.redirect(`/savedCards/user/${userId}`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// save for safety 


// router.get('/user/:id', (req, res) => {
//     const { username, userId, loggedIn } = req.session
//     const ownerId = req.params.id
// 	savedCard.find({ owner: ownerId })
// 		.then(async savedCards => {
//             let addlInfo = []
//             for (let i = 0; i < savedCards.length; i++) {
//                 addlInfo.push(await axios(`${process.env.SCRY_API_URL}/cards/multiverse/${savedCards[i].multiverseid}`))
//             }
//             let scryInfo = []
//             for (let i = 0; i < addlInfo.length; i++) {
//                 scryInfo.push(addlInfo[i].data.image_uris)
//                 scryInfo[i].id = savedCards[i].id
//             }
//             // console.log(scryInfo)
//             User.findById(ownerId)
//             .populate('comments.author', 'username')
//                 .then(user => {
//                     // console.log(savedCards)
//                     res.render('savedCards/index', { user, scryInfo, ownerId, savedCards, username, loggedIn, userId })
//                 })
//         })
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// }) 



// Export the Router
module.exports = router
