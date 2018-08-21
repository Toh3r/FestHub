var mongoose = require("mongoose");
var Festival = require("./models/festival");
var Comment = require("./models/comment")

//Create a bit of data to use
var data = [
	{
		name: "Belfast Vital", 
		image: "https://images.unsplash.com/photo-1522694013927-350c454fa94b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aec6de72f0a6af80fa241e9508bab14f&auto=format&fit=crop&w=1029&q=80",
		description: "Belfast Vital is an annual music festival in Northern Ireland. Notable headliners throughout the years have included Kasabian, The Killers, Snow Patrol, Kaiser Chiefs, Kings of Leon, Franz Ferdinand, The White Stripes, Ash, The Streets, Primal Scream and Eminem(The best of them all)."
	},
	{
		name: "Longitude", 
		image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=032360c7b684868000973387b861b854&auto=format&fit=crop&w=500&q=60",
		description: "Longitude is an annual music festival in Ireland. Notable headliners throughout the years have included Kasabian, The Killers, Snow Patrol, Kaiser Chiefs, Kings of Leon, Franz Ferdinand, The White Stripes, Ash, The Streets, Primal Scream and Eminem(The best of them all)."
	},
	{
		name: "Tomorrowland", 
		image: "https://images.unsplash.com/photo-1510682657356-6ee07db8204b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a7291235a619cf19f39a85568d9a30f0&auto=format&fit=crop&w=500&q=60",
		description: "Tomorrowland is an annual music festival in Belguim. Notable headliners throughout the years have included Kasabian, The Killers, Snow Patrol, Kaiser Chiefs, Kings of Leon, Franz Ferdinand, The White Stripes, Ash, The Streets, Primal Scream and Eminem(The best of them all)."
	}
]

function seedDB(){
	// Remove everything from database
	Festival.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Cleared festival database");

		//Add some festivals
		data.forEach(function(seed){
			Festival.create(seed, function(err, festival){
				if(err){
					console.log(err);
				} else {
					console.log("Added a festival");
					//Create a comment
					Comment.create(
					{
						text: "This is a seed comment",
						author: "Alan"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							festival.comments.push(comment);
							festival.save();
							console.log("Created comment");
						}
					});
				}
			});
		});
	});

}

//Export function
module.exports = seedDB;