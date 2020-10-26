$(document).ready(function () {
    var loginForm = $("#login");
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");

    loginForm.on("submit", function (event) {
        console.log("hello")
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    //route to the api-routes, to go back to the index page. 
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace("/");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});