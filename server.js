const express = require("express")
const app = express()
const expbs = require("express-handlebars")
var session = require('express-session')
var passport = require('passport');


// Sets up the Express App
// =============================================================

var PORT = process.env.PORT || 8080;

var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up handlebars

app.engine('handlebars', expbs({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars")


// Static directory
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/recipes-api-routes.js")(app);
require("./routes/meal-plan-api-routes.js")(app);
require("./routes/grocery-api-routes.js")(app);
require("./routes/routes.js")(app);
require("./routes/api-routes.js")(app);
require("./config/passport")

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
