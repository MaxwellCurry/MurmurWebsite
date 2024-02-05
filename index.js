document.addEventListener("DOMContentLoaded", function(){
  var searchInput = document.querySelector(".search-bar");
  var dropdown = document.querySelector(".schools-dropdown");


  for(let i = 0; i < 6000; i++) {
	var option = document.createElement("div");
	option.classList.add("school-option");
	dropdown.appendChild(option);
  }
  var schoolOptions = document.querySelectorAll(".school-option");


  fetch('schools.txt')
	.then(response => response.text())
	.then(data => {
	  var schools = data.split('\n').map(function(item) {
		return item.trim();
	  });
	  

	  schoolOptions.forEach(function(option, index) {
		option.textContent = schools[index];
	  });

  }).catch(error => console.error('Error fetching schools:', error));


  document.addEventListener("click", function (event) {
	if (event.target.closest(".search-bar-container")) {
	  dropdown.style.display = "block";
	  schoolOptions.forEach(function (option, index) {
		if (index < 5) {
		  option.style.display = "block";
		} else {
		 option.style.display = "none";
	   }
	  });
   } 
	else {
	  dropdown.style.display = "none";
	}

	if (event.target.classList.contains("school-option")) {
	  searchInput.value = event.target.textContent;
	  dropdown.style.display = "none";
	}
  });

  searchInput.addEventListener("input", function () {
	var visibleOptionsCount = 0;
	var searchTerm = searchInput.value.toLowerCase();
	
	schoolOptions.forEach(function (option) {
	  var optionText = option.textContent.toLowerCase();
	  if (optionText.includes(searchTerm) && visibleOptionsCount < 5) {
		option.style.display = "block";
		visibleOptionsCount++;
	  } 
	  else {
		option.style.display = "none";
	  }
	});
  });
});

function redirectToSignup() {
  var schoolSearchInput = document.getElementById("schoolSearch");
  var schoolName = schoolSearchInput.value.trim();


  window.location.href = "signup.html?school=" + encodeURIComponent(schoolName);
}

function redirectToLogin() {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
	var infoButton = document.getElementById("info-button");
	var popupContainer = document.createElement("div");
	popupContainer.classList.add("popup-container");

	var popupText = document.createElement("div");
	popupText.classList.add("popup-text");
	popupText.textContent = "Introducing Murmur – the anonymous dating app where connections unfold naturally! Simply input your school and the names of your crushes, and if there's a mutual crush, you'll both get a notification after a random wait time, ensuring privacy. Until you both decide to accept the match, identities remain anonymous. No initial stakes, just excitement! Embrace the fun, safe, and anonymous world of Murmur – where connections happen on your terms!";

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


document.getElementById("donate-button").addEventListener("click", function() {
	window.open("https://midpenpost.org/tag/garv-virginkar/", "_blank");
});
  
  