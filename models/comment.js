//Import mongoose //
var mongoose = require("mongoose");

//Create comment schema
var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
		username: String
	}
});

//Compile schema to comment model and export from file
module.exports = mongoose.model("Comment", commentSchema);
