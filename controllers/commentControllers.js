// Import Dependencies -------------------------
const express = require('express') // import the express framework
const User = require('../models/user')

// Create Router -------------------------------
const router = express.Router()

// Routes ---------------------------------------

// POST -> '/comments/<userid>

router.post('/:ownerid', (req, res) => {
    const ownerId = req.params.ownerid
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    const theComment = req.body
    User.findById(ownerId)
        .then(user => {
            user.comments.push(theComment)
            return user.save()
        })
        .then(user => {
            res.redirect(`/savedcards/user/${user.id}`)
        })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20collection`)
    }
})



// DELETE -> '/comments/delete/<userId>/<someCommentId>'
router.delete('/delete/:userId/:commId', (req, res) => {
    const { userId, commId } = req.params
    User.findById(userId)
    .then(user => {
        const theComment = user.comments.id(commId)
        console.log('this is the comment to be deleted: \n', theComment)
        if (req.session.loggedIn) {
            if (theComment.author == req.session.userId) {
                theComment.remove()
                user.save()
                res.redirect(`/savedcards/user/${user.id}`)
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        } else {
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

module.exports = router