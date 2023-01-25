// Import Dependencies --------------------------

const express = require('express')
// const savedPack = require('../models/savedCard')

// Create Router --------------------------------

const router = express.Router()

// Routes ---------------------------------------

//POST ->

router.post('/:savedPackId', (req, res) => {
    const savedPackId = req.params.savedPackId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    const theCard = req.body
    savedPack.findById(savedPackId)
        .then(savedPack => {
            savedPack.cards.push(theCard)
            return savedPack.save()
        })
        .then(savedPack => {
            res.redirect(`/savedPacks/${savedPack.id}`)
            console.log(theCard)
        })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20add%20to%20this%20pack`)
    }
})

module.exports = router
