// Import Dependencies --------------------------

const express = require('express')
const savedPack = require('../models/savedPack')

// Create Router --------------------------------

const router = express.Router()

// Routes ---------------------------------------

//POST ->

router.post('/:savedPackId', (req, res) => {
    // first we get the fruitId and save it to a variable
    const savedPackId = req.params.savedPackId
    // then we'll protect this route against non-logged in users
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the comment
        // this is exactly like how we added the owner to our fruits
        req.body.author = req.session.userId
        // saves the req.body to a variable for easy reference later
    const theCard = req.body
    // find a specific fruit
    savedPack.findById(savedPackId)
        .then(savedPack => {
            // create the comment (with a req.body)
            savedPack.cards.push(theCard)
            // save the Pack
            return savedPack.save()
        })
        .then(savedPack => {
            res.redirect(`/savedPacks/${savedPack.id}`)
            console.log(theCard)
        })
        // handle any errors
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
    } else {
        // res.sendStatus(401)
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20add%20to%20this%20pack`)
    }
})

module.exports = router
