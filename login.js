function onLogIn(googleUser) {
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

function logOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.logOut().then(function () {
        alert("You have been signed out successfully");
        $(".g-signin2").css("display","block");
        $(".data").css("display","none");
    });
}