function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr("src", profile.getImageUrl());
    $(".data").css("display","block");
    $(".g-signin2").css("display","none");

    var userEmail = profile.getEmail();
    console.log("yoyooyoyoyoyoyoyo");
    console.log(userEmail);
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".g-signin2").css("display","block");
        $(".data").css("display","none");
    });
}

var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

var schoolFromURL = getQueryParam('school');

if (schoolFromURL) {
  schoolInput.value = schoolFromURL;
}

function nextTab() {
    showTab('tab2', 1)
}

function submitSignUp() {
    window.location.href = "new.html";
}

function showTab(tabId, buttonIndex) {
    // Remove active class from all tab buttons
    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
      button.classList.remove('active-tab-button');
    });
  
    // Add active class to the clicked button
    tabButtons[buttonIndex].classList.add('active-tab-button');
  
    // Hide all tabs
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
      tab.style.display = 'none';
    });
  
    // Show the selected tab
    document.getElementById(tabId).style.display = 'block';
}

showTab('tab1', 0);