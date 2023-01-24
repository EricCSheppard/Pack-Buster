// Schema for the cards subdocument
const { trusted } = require('mongoose')
const mongoose = require('../models/connection')

const { Schema } = mongoose

const cardSchema = new Schema({
    name: {
        type: String
    },
    id: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = cardSchema