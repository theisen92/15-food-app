var db = require("../models");
var passport = require("../config/passport");
const { create } = require("express-handlebars");

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    })

    app.post("/api/register", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
                console.log(create)
            });

        app.get("/logout", function (req, res) {
            req.logout();
            res.redirect("/");
        });

        app.get("/api/user_data", function (req, res) {
            if (!req.user) {
                res.json({});
            } else {
                res.json({
                    email: req.user.email,
                    id: req.user.id
                });
            }
        });
    });
};