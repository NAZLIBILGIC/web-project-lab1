displayView = function () {
  // the code required to display a view
};
window.onload = function () {
  //code that is executed as the page is loaded.
  //You shall put your own custom code here.
  //window.alert() is not allowed to be used in your implementation.
  //window.alert("Hello TDDD97!");

  // For changing views between the welcome page and the profile page
  var signedIn = false; // Atm this is static

  // Get the view container
  var viewContainer = document.getElementById("viewContainer");

  // Find the script tag containing the appropriate view
  var welcomeViewScript = document.getElementById("welcomeview");
  var profileViewScript = document.getElementById("profileview");

  // Extract the content from the script tag based on the signed-in status
  var contentView;
  if (signedIn) {
    contentView = profileViewScript.textContent;
  } else {
    contentView = welcomeViewScript.textContent;
  }

  // Insert the content into the view container
  viewContainer.innerHTML = contentView;
};

// To check password while signup is the same
function check() {
  //window.alert(document.getElementById("signup-password").value);
  intial_pw = document.getElementById("signup-password").value;
  second_pw = document.getElementById("signup-repeatpass").value;

  if (intial_pw != second_pw) {
    document.getElementById("error_message").innerHTML =
      "Password is not the same";
    return false;
  } else if (intial_pw.length < 8) {
    document.getElementById("error_message").innerHTML =
      "Password should be equal to or more than 8 characters";
    return false;
  } else {
    var formData = {
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value,
      firstname: document.getElementById("signup-name").value,
      familyname: document.getElementById("signup-familyName").value,
      gender: document.getElementById("signup-gender").value,
      city: document.getElementById("signup-city").value,
      country: document.getElementById("signup-country").value,
    };
    var userinfo = serverstub.signUp(formData);
    document.getElementById("signup_message").innerHTML = userinfo.message;
    //console.log(userinfo.message);
    return false;
  }
}