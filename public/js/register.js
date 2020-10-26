$(document).ready(function () {
    var registerForm = $("#register");
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");

    registerForm.on("submit", function (event) {
        console.log("hello");
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),

        };

        if (!userData.email || !userData.password) {
            return;
        }
        registerUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function registerUser(email, password) {
        $.post("/api/register", {
            email: email,
            password: password
        })
            .then(function (data) {
                window.location.replace("/recipes");
            })
            .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
})