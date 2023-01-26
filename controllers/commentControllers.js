// Import Dependencies -------------------------
const express = require('express') // import the express framework
const User = require('../models/user')

// Create Router -------------------------------
const router = express.Router()

// Routes ---------------------------------------
// Subdocuments are not mongoose models, that means they don't have their own collection, and they don't come with the model methods we're used to(they have some of their own built in.)
// This also means that a subdoc is never going to be viewed without it's parent document.

// this also means, that when we make a subdocument, we must refer to the parent so that mongoose knows where in mongodb to store this subdocument.


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
// make sure only the author of the comment can delete the comment
router.delete('/delete/:userId/:commId', (req, res) => {
    // const fruitId = req.params.fruitId
    // const commId = req.params.commId
    const { userId, commId } = req.params
    User.findById(userId)
    .then(user => {
        //get the comment, we'll use the built in subdoc method called .id()
        const theComment = user.comments.id(commId)
        console.log('this is the comment to be deleted: \n', theComment)
        // then we want to make sure the user is loggedIn, and that they are the author of the comment
        if (req.session.loggedIn) {
            // if they are the author, allow them to delete
            if (theComment.author == req.session.userId) {
                // we can use another built in method - remove()
                theComment.remove()
                user.save()
                // res.sendStatus(204)
                res.redirect(`/savedcards/user/${user.id}`)
            } else {
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        } else {
            //otherwise send a 401 unauthorized.
            // res.sendStatus(401)
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

module.exports = router