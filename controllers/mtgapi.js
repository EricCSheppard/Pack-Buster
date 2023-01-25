// IMPORT DEPENDENCIES -------------------------

const express = require('express')
const axios = require('axios')
require('dotenv').config()

// CREATE ROUTER -------------------------------
const router = express.Router()

// Makes API call for a booster pack using the set option seleted from the main page.
router.post('/newpack', async (req, res) => {
    const mtgSet = req.body.set
    const { username, userId, loggedIn } = req.session
    // console.log('this is req.body', req.body)
    // Pulls 1 card
    // const mtgCard = await axios(`${process.env.API_URL}/cards/5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c`)
    // Pulls booster of random cards
    const mtgCard = await axios(`${process.env.API_URL}/sets/${mtgSet}/booster`)
    const mtgCardPack = mtgCard.data.cards
    res.render('mtgapi/newpack.liquid', { mtgCardPack, username, loggedIn })
    // console.log(mtgCardPack)
})

module.exports = router