var db = require("../models");

module.exports = function (app) {
    app.post("/api/grocery", function (req, res) {
        db.Grocery.create(req.body).then(function (dbGrocery) {
            res.json(dbGrocery);
        });
        console.log(req.body)
    });

    app.get("/api/grocery", function (req, res) {
        db.Grocery.findAll().then(function (dbGrocery) {
            res.json(dbGrocery);
        });
    });

    app.get("/api/grocery/:id", function (req, res) {
        db.Grocery.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbGrocery) {
            res.json(dbGrocery);
        });
    });

    app.delete("/api/grocery/:id", function (req, res) {
        db.Grocery.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGrocery) {
            res.json(dbGrocery);
        });
    });

    app.put("/api/grocery", function (req, res) {
        db.Post.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });
}