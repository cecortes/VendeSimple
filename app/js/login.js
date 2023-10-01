"use strict";

// Ready function
$(function () {
  /* --> DOM Elements <-- */
  const emailInput = $("#mail");
  const passInput = $("#pass");
  const loginButton = $("#login");

  //Parse Instance
  Parse.initialize(
    "UjujnA5Jsc5TejK1T0YpaMqYYmxtdCZZDotCjmr6",
    "Az7sYG0cxFw0SaRprb8nmZ5NFU0u3RFVxXxCFo1L"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

  /* --> Login Function <-- */
  function LoginUser() {
    // Locals
    let correo = emailInput.val();
    let contra = passInput.val();

    // Parse Login
    Parse.User.logIn(correo, contra)
      .then(function (user) {
        //console.log(">> Login");

        //Redirect to dashboard.html
        window.location.href = "../html/dashboard.html";
      })
      .catch(function (error) {
        console.log(">> Error " + error.code);
        console.log(error.message);

        // Clear fields
        clearFields();
      });
  }

  /* --> Clear Fields Function <-- */
  function clearFields() {
    emailInput.val("");
    passInput.val("");
  }

  /* --> Events Listeners <-- */
  loginButton.on("click", function (e) {
    e.preventDefault();
    // Login Function
    LoginUser();
  });
});
