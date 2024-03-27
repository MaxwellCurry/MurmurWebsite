document.addEventListener("DOMContentLoaded", function () {
	var infoButton = document.getElementById("info-button");
	var popupContainer = document.createElement("div");
	popupContainer.classList.add("popup-container");
	popupContainer.style.display = "none"; // Set initial state to "none"

	var popupText = document.createElement("div");
	popupText.classList.add("popup-text");
	popupText.textContent = "Introducing Murmur! Simply input the name and school emails of people you secretly like, and if there's a mutual entry, you'll both get a notification signifying a match! Register with your school email to get started!";

	var closePopup = document.createElement("div");
	closePopup.classList.add("close-popup");
	closePopup.textContent = "✖";

	popupContainer.appendChild(popupText);
	popupContainer.appendChild(closePopup);
	document.body.appendChild(popupContainer);

	closePopup.addEventListener("click", function () {
	  popupContainer.style.display = "none";
	});

	infoButton.addEventListener("click", function () {
		popupContainer.style.display = popupContainer.style.display === "none" ? "block" : "none";
	});
});
  
window.addEventListener("DOMContentLoaded", (event) => {
    const donate = document.getElementById('donate-button');
    if (donate) {
      donate.addEventListener('click', function() {
				window.open("https://github.com/MaxwellCurry/MurmurWebsite", "_blank");
			});
    }
});

function redirectToSignup() {
  window.location.href = "/html/signup.html";
}
  
function redirectToLogin() {
  window.location.href = "login.html";
}
