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