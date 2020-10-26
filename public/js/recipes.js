$(document).ready(function () {
    // Getting jQuery references to the post author, recipe-name, ingredients, steps selected
    var authorInput = $("#author");
    var nameInput = $("#recipe-name");
    var imgInput = $("#img-url");
    var ingredientsInput = $("#ingredients");
    var stepsInput = $("#steps");
    var dairyCheck = $("#dairy");
    var eggsCheck = $("#eggs");
    var nutsCheck = $("#nuts");
    var wheatCheck = $("#wheat");
    var soyCheck = $("#soy");
    var fishCheck = $("#fish");
    var recipeForm = $("#recipe");
    var recipeImgDiv = $("#recipe-img")
    var recipeImg

    $(document).on("click", "button.del-btn", handleRecipeDelete);

    function handleRecipeDelete() {
        var currentRecipe = $(this)
            .parent()
            .data("recipe");
        deleteRecipe(currentRecipe.id);
    }

    function deleteRecipe(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/recipes/" + id
        })
            .then(function () {
                window.location.href = "/recipes";
            });
    }

    // Adding an event listener for when the form is submitted
    $(recipeForm).on("submit", handleFormSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a author, recipe-name, ingredients or steps 
        if (!authorInput.val().trim() || !imgInput.val().trim() || !nameInput.val().trim() || !ingredientsInput.val().trim() || !stepsInput.val().trim()) {
            alert("You must have an author, image, recipe name, ingredients and steps before you can post the recipe")
            return;
        }
        var switchIngt = ingredientsInput.val().trim()
        var newIngt = switchIngt.replace(/\n\r?/g, '<br>');
        var switchSteps = stepsInput.val().trim()
        var newSteps = switchSteps.replace(/\n\r?/g, '<br>');
        // Constructing a newPost object to hand to the database
        var newRecipe = {
            author: authorInput
                .val()
                .trim(),
            recipeName: nameInput
                .val()
                .trim(),
            img: imgInput
                .val()
                .trim(),
            ingredients: newIngt,
            steps: newSteps,
            dairy: dairyCheck.is(':checked'),
            eggs: eggsCheck.is(':checked'),
            nuts: nutsCheck.is(':checked'),
            wheat: wheatCheck.is(':checked'),
            soy: soyCheck.is(':checked'),
            fish: fishCheck.is(':checked'),
        };
        // uploadImg(imgInput)
        submitPost(newRecipe);
    }

    // Submits a new recipe and reloads the page
    function submitPost(recipe) {
        $.post("/api/recipes", recipe, function () {
            window.location.href = "/recipes";
        });
    }

    $(document).ready(getRecipes())

    function getRecipes() {
        $.get("/api/recipes", function (data) {
            recipeImg = data
            initializeImg();
        });
    }

    function initializeImg() {
        var recipesToAdd = [];
        for (var i = 0; i < recipeImg.length; i++) {
            recipesToAdd.push(createNewRecipe(recipeImg[i]));
        }
        recipeImgDiv.append(recipesToAdd);
    }


    function createNewRecipe(recipe) {
        var newRecipeImg = $("<div>");
        newRecipeImg.addClass("img-con");
        var newRecipeAncher = $("<a>");
        newRecipeAncher.attr("href", "/recipefor/" + recipe.id)
        var newImg = $("<img>")
        newImg.addClass("upload-img")
        newImg.attr("src", recipe.img)
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("del-btn");
        newRecipeAncher.append(newImg)
        newRecipeImg.append(newRecipeAncher);
        newRecipeImg.append(deleteBtn);
        newRecipeImg.data("recipe", recipe);
        return newRecipeImg;
    }

});
// https://i.ibb.co/3CqyhVH/pizzaq.jpg
// https://i.ibb.co/2crKLXb/Pizza.png

