var express = require("express");
var router = express.Router({mergeParams: true});
//Import models
var Festival = require("../models/festival");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=====================
// COMMENTS ROUTES
//=====================

//NEW Route - to create new comments for a festival (route just renders comment form)
router.get("/new", middleware.isLoggedIn, function(req, res){
	//Find festival by id
	Festival.findById(req.params.id, function(err, festival){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {festival: festival});
		}
	});
});

//CREATE Route - Add new comment to festival page (route creates comment, pushes comment into festival,
// and redirects to festivals showpage)
router.post("/", middleware.isLoggedIn, function(req, res){
	//Lookup festival using ID
	Festival.findById(req.params.id, function(err, festival){
		if(err){
			console.log(err);
			res.redirect("/festivals");
		} else {
			//Gets comments variables from new.ejs page using .. comment[variable]
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					//add username + id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//Save comment
					comment.save();
					//Create new comment, Connect new comment to festival, Redirect to festival showpage
					festival.comments.push(comment);
					festival.save();
					req.flash("success", "Comment created");
					res.redirect("/festivals/" + festival._id);
				}
			});
		}
	});
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {festival_id: req.params.id, comment: foundComment});
		}
	});
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/festivals/" + req.params.id);
		}
	});
});

// DESTROY ROUTE FOR COMMENTS
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted...");
			res.redirect("/festivals/" + req.params.id);
		}
	});
});

module.exports = router;