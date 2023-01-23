// IMPORT DEPENDENCIES -------------------------

const express = require('express')
const axios = require('axios')
require('dotenv').config()

// CREATE ROUTER -------------------------------
const router = express.Router()

router.get('/newpack', async (req, res) => {
    //pulls 1 card
    // const mtgCard = await axios(`${process.env.API_URL}/cards/5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c`)

    //pull booster
    const mtgCard = await axios(`${process.env.API_URL}/sets/LEA/booster`)
    const mtgCardPack = mtgCard.data.cards
    res.render('mtgapi/newpack.liquid', { mtgCardPack })
    console.log(mtgCardPack)
})

module.exports = router