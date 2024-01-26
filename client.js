displayView = function (contentView) {
  // the code required to display a view
  var viewContainer = document.getElementById("viewContainer");
  viewContainer.innerHTML = contentView;
};

window.onload = function () {
  //code that is executed as the page is loaded.
  //You shall put your own custom code here.
  //window.alert() is not allowed to be used in your implementation.
  //window.alert("Hello TDDD97!");

  // returns null if the token is not set
  // token = localStorage.getItem("token")
  // signedIn = token != null
  var signedIn = true; // Atm this is static and replaced by the token from localStorage

  // Get the view container

  // Find the script tag containing the appropriate view
  var welcomeViewScript = document.getElementById("welcomeview");
  var profileViewScript = document.getElementById("profileview");

  // decide which content will be used according to signedin status
  var contentView;
  if (signedIn) {
    contentView = profileViewScript.textContent;
  } else {
    contentView = welcomeViewScript.textContent;
  }

  // insert the decided content into the view container
  displayView(contentView);
};

// check password while signup is the same
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
//check login fields and go to next page according to login status
function check_login(event) {
  password_entered = document.getElementById("login-password").value;
  email_entered = document.getElementById("login-email").value;

  var login_info = serverstub.signIn(email_entered, password_entered);
  console.log(login_info);
  document.getElementById("login_message").innerHTML = login_info.message;

  if (!login_info.success) {
    event.preventDefault(); // Prevent form submission
  } else {
    localStorage.setItem("token", login_info.data); // login token saved

    var profileViewContent = document.getElementById("profileview").textContent;
    displayView(profileViewContent);
  }
}

function openhome() {
  document.getElementById("home-content").style.display = "block";
  document.getElementById("browse-content").style.display = "none";
  document.getElementById("account-content").style.display = "none";
}

function openbrowse() {
  document.getElementById("home-content").style.display = "none";
  document.getElementById("browse-content").style.display = "block";
  document.getElementById("account-content").style.display = "none";
}

function openaccount() {
  document.getElementById("home-content").style.display = "none";
  document.getElementById("browse-content").style.display = "none";
  document.getElementById("account-content").style.display = "block";
}
