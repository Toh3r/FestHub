var express = require("express");
var router = express.Router();
var Festival = require("../models/festival");
var middleware = require("../middleware");

//=========================
// FESTIVAL ROUTES
//=========================

//INDEX Route - show all festivals
router.get("/", function(req, res){
	//Get all festivals from database
	Festival.find({}, function(err, allFestivals){
		if(err){
			console.log(err);
		} else {
			//render festivals page, passing festivals array to .ejs file
			res.render("festivals/index", {festivals: allFestivals, currentUser: req.user});
		}
	});
	
});

//POST Route to add a new festival to festivals page
//CREATE Route - add new festival to db
router.post("/", middleware.isLoggedIn, function(req, res){
	//Save input from form (new.ejs page)
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	//Create author of festival
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	//Create festival object using form data
	var newFestival = {name: name, price: price, image: image, description: desc, author: author}
	//Create a new festival and save it to the database
	Festival.create(newFestival, function(err, newCreated){
		if(err){
			console.log(err);
		} else {
			//Redirect to festivals page
			res.redirect("/festivals");
		}
	});
});

//Route to create a new festival, includes festivals POST route form
//NEW Route - show form to create new festivals
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("festivals/new");
});

//SHOW Route - shows more info about one festival
router.get("/:id", function(req, res){
	//find the festival using its id
	Festival.findById(req.params.id).populate("comments").exec(function(err, foundFestival){
		if(err){
			console.log(err);
		} else {
			console.log(foundFestival);
			//Render the show template with that festival
			res.render("festivals/show", {festival: foundFestival});
		}
	});
});

//EDIT FESTIVAL ROUTE
router.get("/:id/edit", middleware.checkFestivalOwnership, function(req, res){
	Festival.findById(req.params.id, function(err, foundFestival){
		//Pass festival info to edit template
		res.render("festivals/edit", {festival: foundFestival});
	});
});

//UPDATE FESTIVAL ROUTE
router.put("/:id", middleware.checkFestivalOwnership, function(req, res){
	//Find and update festival
	Festival.findByIdAndUpdate(req.params.id, req.body.festival, function(err, updatedFestival){
		if(err){
			res.redirect("/festivals");
		} else {
			res.redirect("/festivals/" + req.params.id);
		}
	});
});

//DESTROY FESTIVAL ROUTE
router.delete("/:id", middleware.checkFestivalOwnership, function(req, res){
	Festival.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/festivals");
		} else {
			res.redirect("/festivals");
		}
	});
});

module.exports = router;