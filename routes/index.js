var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

// ROOT ROUTE (HOMEPAGE)
router.get("/", function(req, res){
	res.render("landing");
});


//=======================
// AUTHORIZATION ROUTES
//=======================

//Route to show register form
router.get("/register", function(req, res){
	res.render("register");
});

//Route to handle sign-up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	//Register new user using their username and password(hashed version of password is stored in db)
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		//If sign-up successful, send user to festivals page
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to FestHub " + user.username);
			res.redirect("/festivals");
		});
	});
});

//Route to show login form
router.get("/login", function(req, res){
	res.render("login");
});
//Handle login logic, using authenticate middleware logic before callback
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/festivals",
		failureRedirect: "/login"
	}), function(req, res){
});

//Logout Route
router.get("/logout", function(req, res){
	//Logout user and redirect to festivals page
	req.logout();
	req.flash("success", "Logged You Out")
	res.redirect("/festivals");
});

module.exports = router;