// IMPORT DEPENDENCIES -------------------------

const express = require('express')
const axios = require('axios')
require('dotenv').config()
const savedCard = require('../models/savedCard')

// CREATE ROUTER -------------------------------
const router = express.Router()

// API CALL - for a booster pack using the set option seleted from the main page.
router.post('/newpack', (req, res) => {
    const mtgSet = req.body.set
    const { username, userId, loggedIn } = req.session
    savedCard.find({ owner: userId })
    // res.render('mtgapi/loading.liquid')
    .then(async savedCards => {
        
        // Pulls 1 card
        // const mtgCard = await axios(`${process.env.API_URL}/cards/5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c`)

        // Pulls booster of random cards
        
        const mtgCard = await axios(`${process.env.API_URL}/sets/${mtgSet}/booster`)
        const mtgCardPack = mtgCard.data.cards
        res.render('mtgapi/newpack.liquid', { savedCards, mtgCardPack, username, userId, loggedIn })
    })
    .catch((error) => {
		res.redirect(`/error?error=${error}`)
    })
})

// SEARCH card route
// router.get('/cardsearch', )

module.exports = router