"use strict";

// Ready
$(function () {
  /* --> Capture DOM Elements <-- */
  const nombreUsuario = $("#user");
  const password = $("#pass");
  const correo = $("#mail");
  const btnCreate = $("#newUser");
  const etiqueta = $("#label");
  const chkTerms = $("#customCheckRegister");
  const alertPass = $("#alertPass");
  const alertTerms = $("#alertTerms");

  /* --> Globals <-- */
  var passChar = "";
  var flgPassOk = false;
  var flgTermsOk = false;

  //Parse Instance
  Parse.initialize(
    "UjujnA5Jsc5TejK1T0YpaMqYYmxtdCZZDotCjmr6",
    "Az7sYG0cxFw0SaRprb8nmZ5NFU0u3RFVxXxCFo1L"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

  /* --> Functions <-- */
  // Create new User
  function createUser() {
    // Extend of Parse User
    const User = Parse.Object.extend("User");

    //Locals
    let username = nombreUsuario.val();
    let passUser = password.val();
    let mail = correo.val();

    // Set attributes
    let newUser = new User();
    newUser.set("username", username);
    newUser.set("password", passUser);
    newUser.set("email", mail);

    // Save the object
    newUser
      .save()
      .then(function (user) {
        console.log(">> Usuario Creado!!!");
        console.log(
          ">> Object created with id: " +
            user.id +
            " and name: " +
            user.get("username") +
            " and email: " +
            user.get("email")
        );

        // Clear fields
        clearFields();

        //Redirect user
        window.location.href = "../html/login.html";
      })
      .catch(function (error) {
        console.log(">> Error: " + error.code + " " + error.message);
      });
  }

  // Clear Inputs and options
  function clearFields() {
    nombreUsuario.val("");
    password.val("");
    correo.val("");
    passChar = "";
  }

  // Evaluate Pass Strong
  function chkPass(charPass) {
    //Pass Strength
    let size = charPass.length;
    var numUpper = charPass.replace(/[^A-Z]/g, "").length;

    // Debug purpose
    //console.log(numUpper);

    if (size <= 6 || numUpper <= 1) {
      etiqueta.removeClass("text-ok text-debil text-medio");
      etiqueta.addClass("text-debil");
      etiqueta.text("Débil");
      flgPassOk = false;
    } else if (size >= 6 && size <= 7 && numUpper > 1) {
      etiqueta.removeClass("text-ok text-debil text-medio");
      etiqueta.addClass("text-medio");
      etiqueta.text("Medio");
      flgPassOk = true;
    } else if (size >= 8 && numUpper > 1) {
      etiqueta.removeClass("text-ok text-debil text-medio");
      etiqueta.addClass("text-ok");
      etiqueta.text("Fuerte");
      flgPassOk = true;
    }
  }

  /* --> Event Listeners <-- */
  btnCreate.on("click", function (e) {
    // Validate Pass & terms
    if (flgPassOk && flgTermsOk) {
      // Create a new user
      createUser();
    } else if (!flgPassOk) {
      alertPass.addClass("alert alert-danger");
      alertPass.append(
        '<span class="alert-icon"><i class="ni ni-active-40"></i></span>' +
          '<span class="alert-text"><strong>La contraseña es débil</strong>, modifíquela...</span>'
      );
    } else if (!flgTermsOk) {
      alertTerms.addClass("alert alert-warning");
      alertTerms.append(
        '<span class="alert-icon"><i class="ni ni-active-40"></i></span>' +
          '<span class="alert-text"><strong>Acepte</strong> los términos y condiciones...</span>'
      );
    }
  });

  password.on("keypress", function (e) {
    // Locals
    let char = e.which;

    passChar += String.fromCharCode(char);

    // Evaluate passChar
    chkPass(passChar);
  });

  password.on("keyup", function () {
    // Evaluate if is empty
    if (!this.value) {
      // Clear the variable
      passChar = "";
      alertPass.removeClass("alert alert-danger");
      alertPass.empty();
    }
  });

  chkTerms.on("change", () => {
    // Evaluate checkbox
    if (chkTerms.is(":checked")) {
      flgTermsOk = true;
      alertTerms.removeClass("alert alert-warning");
      alertTerms.empty();
    } else {
      flgTermsOk = false;
    }
  });
});
