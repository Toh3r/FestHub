//Import mongoose
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//Create user schema
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

//Allows methods from plm library to be used on user schema
UserSchema.plugin(passportLocalMongoose);

//Export schema from file
module.exports = mongoose.model("User", UserSchema);