displayView = function (contentView) {
  // to display a view
  var viewContainer = document.getElementById("viewContainer");
  viewContainer.innerHTML = contentView;
};

window.onload = function () {
  //code that is executed as the page is loaded.
  //You shall put your own custom code here.
  //window.alert() is not allowed to be used in your implementation.
  //window.alert("Hello TDDD97!");

  // to skip the sign in if token exists
  // returns null if the token is not set
  token = localStorage.getItem("token");
  signedIn = token != null;
  // var signedIn = false;

  if(!signedIn){
    var welcomeView = document.getElementById("welcomeview").textContent;
      displayView(welcomeView);
      return;
  }
  // finding the script tag containing the appropriate view
  var profileView = document.getElementById("profileview").textContent;
  displayView(profileView);

  //get the last active tab from localstorage
  let activeTab = localStorage.getItem("activeProfileViewTab");
  if(activeTab == null){ //if last tab null direct it to home tab
    activeTab = "home";
  }

  switch (activeTab) {
    case "home":
      openHome();
      break;
    case "browse":
      openBrowse();
      break;
    case "account":
      openAccount();
      break;
    default:
      console.log("returned to default tab");
      openHome();
  }
};

// check password while signup is the same
function check() {
  event.preventDefault();

  intial_pw = document.getElementById("signup-password").value;
  second_pw = document.getElementById("signup-repeatpass").value;

  if (intial_pw != second_pw) {
    document.getElementById("signup_message").innerHTML =
      "Password is not the same";
    return false;
  } else if (intial_pw.length < 8) {
    document.getElementById("signup_message").innerHTML =
      "Password should be equal to or more than 8 characters";
    return false;
  } else {
    document.getElementById("signup_message").innerHTML = "";

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

    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-repeatpassd").value = "";
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-familyName").value = "";
    document.getElementById("signup-gender").value = "";
    document.getElementById("signup-city").value = "";
    document.getElementById("signup-country").value = "";

    return false;
  }
}

var login_info;
//check login fields and go to next page according to login status
function check_login() {
  password_entered = document.getElementById("login-password").value;
  email_entered = document.getElementById("login-email").value;

  login_info = serverstub.signIn(email_entered, password_entered);
  // console.log(login_info);
  document.getElementById("login_message").innerHTML = login_info.message;

  if (!login_info.success) {
    return false; //stay on login screen
  } else {
    localStorage.setItem("token", login_info.data); // login token saved

    //if success true open next page
    var profileViewContent = document.getElementById("profileview").textContent;
    displayView(profileViewContent);
  }

  //login sucess-opening next page data retrieval and post-tezt retrieval
  data_retrival(login_info.data);
  text_display();
}

function openHome() {
  let token = localStorage.getItem("token");
  data_retrival(token);
  text_display();

  document.getElementById("home-content").style.display = "block";
  document.getElementById("browse-content").style.display = "none";
  document.getElementById("account-content").style.display = "none";

  document.getElementById("home-button").style.textDecoration = "underline";
  document.getElementById("browse-button").style.textDecoration = null;
  document.getElementById("account-button").style.textDecoration = null;
  
  //to track in which tab we left the webapp we save it to local storage with specific key-> activeProfileViewTab
  //(keyword,value)
  localStorage.setItem("activeProfileViewTab", "home");
}

function openBrowse() {
  text_display();

  document.getElementById("home-content").style.display = "none";
  document.getElementById("browse-content").style.display = "block";
  document.getElementById("account-content").style.display = "none";

  document.getElementById("home-button").style.textDecoration = null;
  document.getElementById("browse-button").style.textDecoration = "underline";
  document.getElementById("account-button").style.textDecoration = null;
  document.getElementById("text-wall").innerHTML = "";

  localStorage.setItem("activeProfileViewTab", "browse");

}

function openAccount() {
  document.getElementById("home-content").style.display = "none";
  document.getElementById("browse-content").style.display = "none";
  document.getElementById("account-content").style.display = "block";

  document.getElementById("home-button").style.textDecoration = null;
  document.getElementById("browse-button").style.textDecoration = null;
  document.getElementById("account-button").style.textDecoration = "underline";
  document.getElementById("text-wall").innerHTML = "";

  localStorage.setItem("activeProfileViewTab", "account");

}

function data_retrival(token) {
  alldata = serverstub.getUserDataByToken(token);

  document.getElementById("user-first-name").textContent = alldata.data.firstname;
  document.getElementById("user-family-name").textContent = alldata.data.familyname;
  document.getElementById("user-gender").textContent = alldata.data.gender;
  document.getElementById("user-city").textContent = alldata.data.city;
  document.getElementById("user-country").textContent = alldata.data.country;
  document.getElementById("user-mail").textContent = alldata.data.email;
}

function text_save() {
  event.preventDefault();

  textMessage = document.getElementById("user-text-to-be-posted").value;

  if (textMessage != "") {
    document.getElementById("user-text-to-be-posted").value = "";

    let token = localStorage.getItem("token");
    alldata = serverstub.getUserDataByToken(token);

    postMessageResponse = serverstub.postMessage(token, textMessage, alldata.data.email);

    document.getElementById("message-post-response").innerHTML = postMessageResponse.message;
  } else {
    document.getElementById("message-post-response").innerHTML = "Cannot be empty";
  }
}

function text_display() {
  let token = localStorage.getItem("token");
  messagesByTokenResponse = serverstub.getUserMessagesByToken(token);
  let messageList = messagesByTokenResponse.data.reverse();
    
    //display other users messages in browse tab
    for (let index = messageList.length - 1; index >= 0; index--) {
      document.getElementById("text-wall").innerHTML += `
        <div id="message-${index + 1}">${index + 1} - ${messageList[index].content} <br>
        <i>posted by: ${messageList[index].writer}</i>
        </div>`;
    }
}

function refresh() {
  document.getElementById("message-post-response").innerHTML = "";
  document.getElementById("text-wall").innerHTML = "";

  text_display();

}

//change password in account tab
function passwordChange() {
  old_password = document.getElementById("old-password").value;
  new_password = document.getElementById("new-change-password").value;
  new_password_repeat = document.getElementById("changed-password").value;

  token_login = localStorage.getItem("token");

  if (new_password !== new_password_repeat) {
    document.getElementById("password_change_message").innerHTML =
      "Error: New passwords do not match";
    return false; // prevent reload
  }

  var password_change = serverstub.changePassword(
    token_login,
    old_password,
    new_password
  );
  console.log(password_change);
  document.getElementById("password_change_message").innerHTML =
    password_change.message;

  document.getElementById("old-password").value = "";
  document.getElementById("new-change-password").value = "";
  document.getElementById("changed-password").value = "";

  return false; // prevent reload
}

//signout function in account tab
function signout() {
  token_login = localStorage.getItem("token");
  var signout = serverstub.signOut(token_login);
  document.getElementById("signout_message").innerHTML = signout.message;
  localStorage.removeItem("token");
  localStorage.removeItem("activeProfileViewTab");
  setTimeout(function () {
    //make the page wait for 2 seconds before redirecting to welcome page
    var welcomeViewScript = document.getElementById("welcomeview");
    var contentView = welcomeViewScript.textContent;
    displayView(contentView);
  }, 2000);
}

var user;

function userretrive() { //retrieve information browse tab
  event.preventDefault();

  userEmail = document.getElementById("user-email").value;
  let token = localStorage.getItem("token");
  otherUserData = serverstub.getUserDataByEmail(token, userEmail);

  if (otherUserData.success == false) { // if its not sucess
    document.getElementById("user-wall").innerHTML = "";
    document.getElementById("retrive_message").innerHTML = otherUserData.message;
    return;
  } else {
    document.getElementById("retrive_message").innerHTML = "";
    var browseTabContent = document.getElementById("browse-tab").innerHTML;
    document.getElementById("user-wall").innerHTML = browseTabContent;

    // display other users information in browse tab related fields 
    document.getElementById("other_first_name").textContent = otherUserData.data.firstname;
    document.getElementById("other_family_name").textContent = otherUserData.data.familyname;
    document.getElementById("other_gender").textContent = otherUserData.data.gender;
    document.getElementById("other_city").textContent = otherUserData.data.city;
    document.getElementById("other_country").textContent = otherUserData.data.country;
    document.getElementById("other_email").textContent = otherUserData.data.email;

    messagesByEmailResponse = serverstub.getUserMessagesByEmail(token, userEmail);
    
    let messageList = messagesByEmailResponse.data.reverse();
    
    //display other users messages in browse tab
    for (let index = messageList.length - 1; index >= 0; index--) {
      document.getElementById("other-user-text-wall").innerHTML += `
        <div id="message-${index + 1}">${index + 1} - ${messageList[index].content} <br>
        <i>posted by: ${messageList[index].writer}</i>
        </div>`;
    }
  }
  return false;
}

function other_user_test_save() { 
  event.preventDefault();
  textMessageToBePosted = document.getElementById("message-text-to-be-posted").value;
  user = document.getElementById("user-email").value;

  if (textMessageToBePosted != "") {
    document.getElementById("message-text-to-be-posted").value = "";

    let token = localStorage.getItem("token");
    postMessageResponse = serverstub.postMessage(token, textMessageToBePosted, user);
    document.getElementById("server-response").innerHTML = postMessageResponse.message;
  } else {
    document.getElementById("server-response").innerHTML = "Cannot be empty";
  }
  return false;
}

function other_user_refresh() {
  document.getElementById("server-response").innerHTML = "";
  document.getElementById("message-text-to-be-posted").innerHTML = "";
  document.getElementById("other-user-text-wall").innerHTML = "";
  userMail = document.getElementById("user-email").value;
  let token = localStorage.getItem("token");
  
  messagesByEmailResponse = serverstub.getUserMessagesByEmail(token, userMail);
    let messageList = messagesByEmailResponse.data.reverse();
    //display other users messages in browse tab
    for (let index = messageList.length - 1; index >= 0; index--) {
      document.getElementById("other-user-text-wall").innerHTML += `
        <div id="message-${index + 1}">${index + 1} - ${messageList[index].content} <br>
        <i>posted by: ${messageList[index].writer}</i>
        </div>`;
    }
  return false;
}
