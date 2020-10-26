$(document).ready(function () {
    var URL = $(location).attr('href');
    var search = URL.lastIndexOf('/');
    var result = URL.substring(search + 1);
    var siteNum = parseInt(result);
    var img = $("#img")
    var name = $("#recipe-name")
    var ingredients = $("#ingredients")
    var steps = $("#steps")
    var dairy = $("#dairy")
    var eggs = $("#eggs")
    var nuts = $("#nuts")
    var wheat = $("#wheat")
    var soy = $("#soy")
    var fish = $("#fish")
    var saveBtn = $("#save-btn")
    var editBtn = $("#edit-btn")

    $(document).on("click", "button.edit-rec-btn", editRecipe);
    $(document).on("click", "button.save-rec-btn", submitEdit);

    $(document).ready(showRec())

    function showRec() {
        $.get("/api/recipes", function (data) {
            find = data.find(x => x.id === siteNum)
            if (data.length <= 0) {
                window.location.href = "/recipes"
            }
            constructPage(find)
        });
    }

    function constructPage(rec) {
        if (find === undefined) {
            window.location.href = "/recipes"
        }
        var recImg = $("<img>")
        recImg.addClass("upload-img")
        recImg.attr("src", rec.img)
        img.append(recImg)
        var recName = $("<h4>")
        recName.addClass("rec-title")
        recName.text(rec.recipeName)
        name.append(recName)
        ingredients.append(rec.ingredients)
        steps.append(rec.steps)
        if (rec.dairy === true) {
            dairy.text("dairy: yes")
        } else { dairy.text("dairy: no") }
        if (rec.eggs === true) {
            eggs.text("eggs: yes")
        } else { eggs.text("eggs: no") }
        if (rec.nuts === true) {
            nuts.text("nuts: yes")
        } else { nuts.text("nuts: no") }
        if (rec.wheat === true) {
            wheat.text("wheat: yes")
        } else { wheat.text("wheat: no") }
        if (rec.soy === true) {
            soy.text("soy: yes")
        } else { soy.text("soy: no") }
        if (rec.fish === true) {
            fish.text("fish: yes")
        } else { fish.text("fish/shellfish: no") }
    }


    function editRecipe() {
        $.get("/api/recipes", function (data) {
            find = data.find(x => x.id === siteNum)
            editRecItem(find)
        })
    }

    function editRecItem(item) {
        saveBtn.removeClass("hide")
        editBtn.addClass("hide")
        ingredients.replaceWith(`<textarea class="form-control space-bottom" id="edit-ingt">${item.ingredients}</textarea>`)
        steps.replaceWith(`<textarea class="form-control space-bottom" id="edit-step">${item.steps}</textarea>`)
        dairy.replaceWith(`<label class="space-right" for="dairy">dairy</label><input type="checkbox" id="edit-dairy"><br>`)
        eggs.replaceWith(`<label class="space-right" for="eggs">eggs</label><input type="checkbox" id="edit-eggs"><br>`)
        nuts.replaceWith(`<label class="space-right" for="nuts">nuts</label><input type="checkbox" id="edit-nuts"><br>`)
        wheat.replaceWith(`<label class="space-right" for="wheat">wheat</label><input type="checkbox" id="edit-wheat"><br>`)
        soy.replaceWith(`<label class="space-right" for="soy">soy</label><input type="checkbox" id="edit-soy"><br>`)
        fish.replaceWith(`<label class="space-right" for="fish">fish/shellfish</label><input type="checkbox" id="edit-fish"><br>`)
        $("#edit-dairy").prop("checked", item.dairy)
        $("#edit-eggs").prop("checked", item.eggs)
        $("#edit-nuts").prop("checked", item.nuts)
        $("#edit-wheat").prop("checked", item.wheat)
        $("#edit-soy").prop("checked", item.soy)
        $("#edit-fish").prop("checked", item.fish)
    }

    function submitEdit() {
        $.get("/api/recipes", function (data) {
            find = data.find(x => x.id === siteNum)
            constuctEdit(find)
        })
    };

    function constuctEdit(item) {
        var switchIngt = $("#edit-ingt").val().trim()
        var newIngt = switchIngt.replace(/\n\r?/g, '<br>');
        var switchSteps = $("#edit-step").val().trim()
        var newSteps = switchSteps.replace(/\n\r?/g, '<br>');
        var editedRecipe = {
            author: item.author,
            recipeName: item.recipeName,
            img: item.img,
            ingredients: newIngt,
            steps: newSteps,
            dairy: $("#edit-dairy").is(':checked'),
            eggs: $("#edit-eggs").is(':checked'),
            nuts: $("#edit-nuts").is(':checked'),
            wheat: $("#edit-wheat").is(':checked'),
            soy: $("#edit-soy").is(':checked'),
            fish: $("#edit-fish").is(':checked'),
        }
        updateRecipe(editedRecipe)
    }

    function updateRecipe(rec) {
        $.ajax({
            method: "PUT",
            url: "/api/recipes/" + siteNum,
            data: rec
        })
            .then(function () {
                window.location.href = "/recipefor/" + siteNum;
            });
    }

})