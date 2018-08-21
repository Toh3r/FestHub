var Festival = require("../models/festival");
var Comment = require("../models/comment");

//=======================
// MIDDLEWARE FOR ROUTES
//=======================

//Object containing middleware
var middlewareObj = {};

//Create owner middleware to check if user owns festival
middlewareObj.checkFestivalOwnership = function(req, res, next){
	//Check if user is logged in
	if(req.isAuthenticated()){
		Festival.findById(req.params.id, function(err, foundFestival){
			if(err){
				req.flash("error", "Festival not found");
				res.redirect("back");
			} else {
				// Check if user created festival. Use .equals as ._id is a mongoose object and not a string
				if(foundFestival.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		// Take user back to where they came from
		res.redirect("back");
	}
}

//Create owner middleware to check if user owns comment
middlewareObj.checkCommentOwnership = function(req, res, next){
	//Check if user is logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				// Check if user created comment. Use .equals as ._id is a mongoose object and not a string
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		// Take user back to where they came from
		res.redirect("back");
	}
}

//Create isLoggedIn middleware function to check if a user is logged in before completing an action
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}


module.exports = middlewareObj;