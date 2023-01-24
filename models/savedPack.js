// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const cardSchema = require('./cards')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const savedPackSchema = new Schema(
	{
		title: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
        cards: [cardSchema]
	},
	{ timestamps: true }
)

const savedPack = model('savedPack', savedPackSchema)

// Export our Model
module.exports = savedPack
