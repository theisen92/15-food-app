var db = require("../models");

module.exports = function (app) {
    app.post("/api/meal-plan", function (req, res) {
        db.MealPlan.create(req.body).then(function (dbMealPlan) {
            res.json(dbMealPlan);
        });
        console.log(req.body)
    });

    app.get("/api/meal-plan", function (req, res) {
        db.MealPlan.findAll().then(function (dbMealPlan) {
            res.json(dbMealPlan);
        });
    });

    app.get("/api/meal-plan/:id", function (req, res) {
        db.MealPlan.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbMealPlan) {
            res.json(dbMealPlan);
        });
    });

    app.delete("/api/meal-plan/:id", function (req, res) {
        db.MealPlan.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbMealPlan) {
            res.json(dbMealPlan);
        });
    });
}