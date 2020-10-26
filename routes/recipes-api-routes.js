var db = require("../models");

module.exports = function (app) {
    // POST route for saving a new recipe
    app.post("/api/recipes", function (req, res) {
        db.Recipes.create(req.body).then(function (dbRecipes) {
            res.json(dbRecipes);
        });
        console.log(req.body)
    });

    // GET route for getting all of the recipes
    app.get("/api/recipes", function (req, res) {
        db.Recipes.findAll().then(function (dbRecipes) {
            res.json(dbRecipes);
        });
    });

    // GET route for getting a recipe matching the id 
    app.get("/api/recipes/:id", function (req, res) {
        db.Recipes.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.put("/api/recipes/:id", function (req, res) {
        db.Recipes.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(function (dbRecipes) {
                res.json(dbRecipes);
            });
    });


    app.delete("/api/recipes/:id", function (req, res) {
        db.Recipes.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRecipes) {
            res.json(dbRecipes);
        });
    });

}

