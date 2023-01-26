// import what I need
const mongoose = require('./connection')
const commentSchema = require('./comments.js')
const { Schema, model } = require('./connection.js')

// create the schema
const UserSchema = new Schema(
	{
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		},
        comments: [commentSchema]
	},
	{ timestamps: true }
)

// creat the model
const User = model('User', UserSchema)

// export the model
module.exports = User
