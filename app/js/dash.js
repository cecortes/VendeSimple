"use strict";

// Ready function
$(function () {
  /* --> DOM Elements <-- */
  const profileName = $("#profile_name");

  //Parse Instance
  Parse.initialize(
    "UjujnA5Jsc5TejK1T0YpaMqYYmxtdCZZDotCjmr6",
    "Az7sYG0cxFw0SaRprb8nmZ5NFU0u3RFVxXxCFo1L"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

  /* --> Get User Data <-- */
  GetUserData();

  /* --> Get User Data Function <-- */
  async function GetUserData() {
    // Create Parse Query, and define the class it will be searched
    const query = new Parse.Query(Parse.User);

    // Handle the query
    try {
      // Await for the query response
      const user = await query.get(Parse.User.current().id);

      // Return the user data
      console.log(user.get("username"));

      // Fill the profile name
      profileName.text(user.get("username"));
    } catch (error) {
      // Handle the error
      console.log(">> Error " + error.code);
      console.log(error.message);
    }
  }

  /* --> Events Listeners <-- */
});
