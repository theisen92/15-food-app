// Dependencies
// =============================================================

// Routes
// =============================================================
module.exports = function (app) {


    // index route loads view.html

    app.get("/grocery", (req, res) => {
        res.render("grocery", {
            title: "Grocery",
            grocery: "active",
            script: "/js/grocery.js"
        })
    })

    app.get("/meal-plan", (req, res) => {
        res.render("meal-plan", {
            title: "Meal-Plan",
            mealPlan: "active",
            script: "/js/meal-plan.js"
        })
    })

    app.get("/recipes", (req, res) => {
        res.render("recipes", {
            title: "Recipes",
            recipes: "active",
            script: "/js/recipes.js"
        })
    })

    app.get("/", (req, res) => {
        res.render("login", {
            title: "Login",
            login: "active",
            script: "/js/login.js"
        })
    })

    app.get("/register", (req, res) => {
        res.render("register", {
            title: "Register",
            register: "active",
            script: "/js/register.js"
        })
    })

    app.get("/recipefor/:id", (req, res) => {
        res.render("recipefor", {
            title: "Recipes",
            script: "/js/recipefor.js"
        })
    })

};
