// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
// const cardSchema = require('./cards')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const savedCardSchema = new Schema(
	{
		name: { type: String, required: true },
        multiverseid: { type: String, required: true },
        rarity: { type: String },
        setName: { type: String },
        // : { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
        // cards: [cardSchema]
	},
	{ timestamps: true }
)

const savedCard = model('savedCard', savedCardSchema)

// Export our Model
module.exports = savedCard