$(document).ready(function () {
    var catigory = $("#grocery-cat")
    var list = $("#grocery-list")
    var grocery = $("#grocery")
    var postCat

    $(document).on("click", "button.add-to-list", handleGroceryList);
    $(document).on("click", "button.list-del-btn", handleDeleteGrocery);




    function handleDeleteGrocery() {
        var currentListItem = $(this)
            .parent()
            .parent()
            .data("item");
        deleteListItem(currentListItem.id);
    }

    function deleteListItem(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/grocery/" + id
        })
            .then(function () {
                window.location.href = "/grocery";
            });
    }


    function handleGroceryList(event) {
        event.preventDefault();
        // Wont submit the list item if missing catigory
        if (catigory.val() === "choose a catigory...") {
            alert("You need to first select a catigory")
            return
        }
        var switchText = list.val().trim()
        var newText = switchText.replace(/\n\r?/g, '<br>');
        console.log(newText)

        var newList = {
            catigory: catigory
                .val(),
            list: newText,
        };
        submitList(newList);
    }

    // Submits a new recipe and reloads the page
    function submitList(list) {
        $.post("/api/grocery", list, function () {
            window.location.href = "/grocery";
        });
    }

    $(document).ready(getlist())

    function getlist() {
        list.empty();
        $.get("/api/grocery", function (data) {
            groceryList = data
            initializeList();
        });
    }

    function initializeList() {
        var listToAdd = [];
        for (var i = 0; i < groceryList.length; i++) {
            listToAdd.push(createListItem(groceryList[i]));
        }
        console.log(listToAdd)
        grocery.append(listToAdd);
    }

    function createListItem(item) {
        switch (item.catigory) {
            case "bev":
                postCat = "beverages"
                console.log(postCat)
                break;

            case "bread":
                postCat = "bread/bakery"
                break;

            case "can":
                postCat = "canned/jarred goods"
                break;

            case "dairy":
                postCat = "dairy"
                break;

            case "dry":
                postCat = "dry/baking goods"
                break;

            case "frozen":
                postCat = "frozen foods"
                break;

            case "meat":
                postCat = "meat"
                break;

            case "produce":
                postCat = "produce"
                break;

            case "paper":
                postCat = "paper goods"
                break;

            case "personal":
                postCat = "personal care"
                break;

            case "other":
                postCat = "other"
                break;
        }
        var list = $("<div>");
        list.addClass("card");
        var listHeading = $("<div>");
        listHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("list-del-btn");
        var listTitle = $("<h3>");
        var listBody = $("<div>");
        listBody.addClass("card-body");
        var listText = $("<p>");
        listTitle.text(postCat + " ");
        listText.html(item.list);
        listHeading.append(deleteBtn);
        listHeading.append(listTitle);
        listBody.append(listText);
        list.append(listHeading);
        list.append(listBody);
        list.data("item", item);
        return list;
    }

})