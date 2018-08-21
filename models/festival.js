//Import mongoose 
var mongoose = require("mongoose");

// Festival Schema Setup
var festhubSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//Compiling the schema into a model and exporting it
module.exports = mongoose.model("Festival", festhubSchema);