//Import frameworks/packages
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Festival       = require("./models/festival"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

//REQUIRING ROUTES
var commentRoutes  = require("./routes/comments"),
    festivalRoutes = require("./routes/festivals"),
    indexRoutes    = require("./routes/index");

// // Connect to local database useing mongoose using command line
// mongoose.connect("mongodb://localhost/fest_hub");

// Connect to local database useing mongoose using gitbash
mongoose.connect(process.env.DATABASEURL);

// //Connect to mongolab database
// mongoose.connect("mongodb://Dan:f3sthub@ds125342.mlab.com:25342/festhub");

//Configure app
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//Serve public directory
app.use(express.static(__dirname + "/public"));
//For put and delete routesmongodb://Dan:f3sthub@ds125342.mlab.com:25342/festhub
app.use(methodOverride("_method"));
//For flash messages
app.use(flash());

//Call function to clear db and seed new info from seeds.js
//seedDB();

//========================
// PASSPORT CONFIGURATION
//========================
app.use(require("express-session")({
	secret: "This is used for encoding/decoding",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware function to pass req.user to all templates
app.use(function(req, res, next){
	//req.user will be empty if no-one is signed in or else will hold the id and username of current user
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/festivals", festivalRoutes);
app.use("/festivals/:id/comments", commentRoutes);


// //Listen on port 5000
// app.listen("5000", function(){
// 	console.log("The FestHub Server Has Started On Port 5000...");
// });

//For herokuapp
app.listen(process.env.PORT || 8080, function(){
    console.log("Server started...")
});