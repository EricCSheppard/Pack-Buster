// IMPORT DEPENDENCIES -------------------------

const express = require('express')
const axios = require('axios')
require('dotenv').config()
const savedCard = require('../models/savedCard')

// CREATE ROUTER -------------------------------
const router = express.Router()

// BOOSTER API CALL -> (mtgapi API) -> for a booster pack using the set option seleted from the main page.
router.post('/newpack', (req, res) => {
    const mtgSet = req.body.set
    const { username, userId, loggedIn } = req.session
    savedCard.find({ owner: userId })
    // res.render('mtgapi/loading.liquid')
    .then(async savedCards => {
        
        // Pulls 1 card
        // const mtgCard = await axios(`${process.env.API_URL}/cards/5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c`)

        // Pulls booster of random cards
        
        const mtgCard = await axios(`${process.env.MTG_API_URL}/sets/${mtgSet}/booster`)
        const mtgCardPack = mtgCard.data.cards
        res.render('mtgapi/newpack.liquid', { savedCards, mtgCardPack, username, userId, loggedIn })
    })
    .catch((error) => {
		res.redirect(`/error?error=${error}`)
    })
})

// SEARCH API CALL -> (Scryfall API)
router.post('/search', (req, res) => {
    const mtgSearch = req.body.name
    console.log(mtgSearch)
    const { username, userId, loggedIn } = req.session
    savedCard.find({ owner: userId })
    .then(async savedCard => {
        const addlInfo = await axios(`${process.env.SCRY_API_URL}/cards/search?q=${mtgSearch}`)
        const scryResult = addlInfo.data.data
        console.log(scryResult)
        res.render('mtgapi/searchresults.liquid', { scryResult, savedCard, username, loggedIn, userId })
    })
    .catch(() => {
        res.render(`searchError.liquid`)
    })
})

// FUZZY SEARCH -> const addlInfo = await axios(`${process.env.SCRY_API_URL}/cards/named?fuzzy=${mtgSearch}`)

module.exports = router