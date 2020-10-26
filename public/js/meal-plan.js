$(document).ready(function () {
    var recipeList = $("#recipe-list")
    var monday = $("#monday")
    var tuesday = $("#tuesday")
    var wednesday = $("#wednesday")
    var thursday = $("#thursday")
    var friday = $("#friday")
    var saturday = $("#saturday")
    var sunday = $("#sunday")
    var selectDay = $("#select-day")
    var weekMealPlan

    $(document).on("click", "button.mp-add-btn", handleRecipeMp);
    $(document).on("click", "button.mp-del-btn", handleMpDelete);

    function handleMpDelete() {
        var currentMpItem = $(this)
            .parent()
            .parent()
            .data("mp");
        deletempItem(currentMpItem.id);
    }

    function deletempItem(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/meal-plan/" + id
        })
            .then(function () {
                window.location.href = "/meal-plan";
            });
    }


    function handleRecipeMp() {
        if (selectDay.val() === "choose a day...") {
            alert("You need to first select a day")
            return
        } else
            var currentRecipe = $(this)
                .parent()
                .data("recipe");
        constructLi(currentRecipe)
    }

    function constructLi(item) {
        var liDivCol = $("<div>");
        liDivCol.addClass("col-lg-4");
        var liItemDiv = $("<div>");
        liItemDiv.addClass("rec-li")
        var liAncher = $("<a>");
        liAncher.addClass("anch-text")
        liAncher.attr("href", "/api/recipes/" + item.id)
        liAncher.text(item.recipeName)
        var delBtn = $("<button>");
        delBtn.text("x");
        delBtn.addClass("mp-del-btn");
        liItemDiv.append(liAncher)
        liItemDiv.append(delBtn)
        liDivCol.append(liItemDiv);
        liDivCol.data("recipe", item);
        postMealPlan(item)
    }

    function postMealPlan(item) {
        var newMealPlan = {
            name: item.recipeName,
            html: item.id,
            day: selectDay
                .val(),
        };
        submitPost(newMealPlan)
    }

    function submitPost(meal) {
        if (selectDay.val() === "choose a day...") {
            return
        } else {
            $.post("/api/meal-plan", meal, function () {
            });
            window.location.href = "/meal-plan";
        }
    }



    $(document).ready(getRecipes(), getMealPlan())

    // Generatting the recipe list
    function getRecipes() {
        recipeList.empty();
        $.get("/api/recipes", function (data) {
            recipeName = data
            initializeList();
        });
    }

    function initializeList() {
        var recipesToAdd = [];
        for (var i = 0; i < recipeName.length; i++) {
            recipesToAdd.push(createList(recipeName[i]));
        }
        recipeList.append(recipesToAdd);
    }

    function createList(recipe) {
        var recipeLi = $("<div>");
        recipeLi.addClass("rec-li");
        var liAncher = $("<a>");
        liAncher.addClass("anch-text")
        liAncher.attr("href", "/recipefor/" + recipe.id)
        liAncher.text(recipe.recipeName)
        var addBtn = $("<button>");
        addBtn.text("add to day");
        addBtn.addClass("btn btn-secondary btn-sm mp-add-btn");
        recipeLi.append(liAncher);
        recipeLi.append(addBtn);
        recipeLi.data("recipe", recipe);

        return recipeLi;
    }



    function getMealPlan() {
        monday.empty();
        tuesday.empty();
        wednesday.empty();
        thursday.empty();
        friday.empty();
        saturday.empty();
        sunday.empty();
        $.get("/api/meal-plan", function (data) {
            weekMealPlan = data
            initializeMealPlan();
        });
    }

    function createMpItem(mp) {
        var liDivCol = $("<div>");
        liDivCol.addClass("col-lg-4");
        var liItemDiv = $("<div>");
        liItemDiv.addClass("rec-li")
        var liAncher = $("<a>");
        liAncher.addClass("anch-text")
        liAncher.attr("href", "/recipefor/" + mp.html)
        liAncher.text(mp.name)
        var delBtn = $("<button>");
        delBtn.text("x");
        delBtn.addClass("mp-del-btn");
        liItemDiv.append(liAncher)
        liItemDiv.append(delBtn)
        liDivCol.append(liItemDiv);
        liDivCol.data("mp", mp);
        return liDivCol
    }

    function initializeMealPlan() {
        var monMeal = []
        var tueMeal = []
        var wedMeal = []
        var thurMeal = []
        var friMeal = []
        var satMeal = []
        var sunMeal = []
        for (var i = 0; i < weekMealPlan.length; i++) {
            switch (weekMealPlan[i].day) {
                case "mon":
                    monMeal.push(createMpItem(weekMealPlan[i]));
                    monday.append(monMeal);
                    break;

                case "tue":
                    tueMeal.push(createMpItem(weekMealPlan[i]));
                    tuesday.append(tueMeal);
                    break;

                case "wed":
                    wedMeal.push(createMpItem(weekMealPlan[i]));
                    wednesday.append(wedMeal);
                    break;

                case "thur":
                    thurMeal.push(createMpItem(weekMealPlan[i]));
                    thursday.append(thurMeal);
                    break;

                case "fri":
                    friMeal.push(createMpItem(weekMealPlan[i]));
                    friday.append(friMeal);
                    break;

                case "sat":
                    satMeal.push(createMpItem(weekMealPlan[i]));
                    saturday.append(satMeal);
                    break;

                case "sun":
                    sunMeal.push(createMpItem(weekMealPlan[i]));
                    sunday.append(sunMeal)
                    break;

            }
        }
    }

})