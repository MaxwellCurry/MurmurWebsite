var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');
var crushInputs = document.querySelectorAll('.crush-input');
var crushEmailInputs = document.querySelectorAll('.crushemail-input');
var signupButton = document.querySelector('.signup-button');
var signupImage = document.createElement('img');


var userEmail = "";
var userUID = "";

class User {
  constructor(name, school, crushList) {
    this.name = name; 
    this.school = school; 
    this.crushList = crushList; 
    this.userEmail = userEmail;
    this.userUID = userUID;
  }
}



function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

var schoolFromURL = getQueryParam('school');
if (schoolFromURL) {
  schoolSearch.value = schoolFromURL;
}

function nextTab() {
  showTab('tab2', 1);
}


let userEmailDisplay = null;

function showTab(tabId, buttonIndex) {
  var tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(function(button) {
    button.classList.remove('active-tab-button');
  });

  tabButtons[buttonIndex].classList.add('active-tab-button');

  var tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function(tab) {
    tab.style.display = 'none';
  });

  document.getElementById(tabId).style.display = 'block';

}


function nextTab1() {
  var flipCardInner = document.querySelector('.flip-card-inner');
  flipCardInner.style.transform = 'rotateY(0deg)';
  setTimeout(function() {
    showTab('tab1', 0);
    toggleTabButtonStyle(0);
  }, 170);
}

function nextTab2() {
  var flipCardInner = document.querySelector('.flip-card-inner');
  flipCardInner.style.transform = 'rotateY(180deg)';
  setTimeout(function() {
    showTab('tab2', 1);
    toggleTabButtonStyle(1);
  }, 170);
}

function toggleTabButtonStyle(activeButtonIndex) {
  var tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(function(button, index) {
    if (index === activeButtonIndex) {
      button.classList.add('active-tab-button');
      button.querySelector('img').src = "/images/dark.png";
    } else {
      button.classList.remove('active-tab-button');
      button.querySelector('img').src = "/images/light.png";
    }
  });
}


showTab('tab1', 0);


var signUpButton = document.querySelector('.signup-button');

// Add event listeners to crush inputs
crushInputs.forEach(function(crushInput) {
  crushInput.addEventListener('input', toggleSignUpButton);
});

// Add event listeners to crush email inputs
crushEmailInputs.forEach(function(crushEmailInput) {
  crushEmailInput.addEventListener('input', toggleSignUpButton);
});

signUpButton.disabled = true;
signUpButton.classList.add('disabled');


emailInput.addEventListener('input', toggleSignUpButton);
// Add event listeners to crush inputs



signupImage.src = "/images/signupgrey.png"; // Set the image source

signupButton.style.backgroundImage = "url('/images/signupgrey.png')";

function toggleSignUpButton() {
  const userSignedIn = userEmailDisplay;
  if (userSignedIn) {
    if (schoolSearch.value.trim() !== '' && emailInput.value.trim() !== '') {
      var allCrushesFilled = true;
      var allCrushesEmailsFilled = true;

      crushInputs.forEach(function(crushInput) {
        if (crushInput.value.trim() === '') {
          allCrushesFilled = false;
        }
      });

      crushEmailInputs.forEach(function(crushEmailInput) {
        if (crushEmailInput.value.trim() === '') {
          allCrushesEmailsFilled = false;
        }
      });

      // Enable signup button only if both crush inputs and crush email inputs are filled
      signUpButton.disabled = !(allCrushesFilled && allCrushesEmailsFilled);
    } else {
      signUpButton.disabled = true;
    }

    // Update button styling based on disabled state
    if (signUpButton.disabled) {
      signUpButton.classList.add('disabled');
    } else {
      signUpButton.classList.remove('disabled');
    }
  } else {
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
  }

  // Update the image source based on signup button status
  signupButton.style.backgroundImage = `url(${signUpButton.disabled ? "/images/signupgrey.png" : "/images/signup.png"})`;
}



function submitSignUp() {
  // Check if all fields are filled
  if (schoolSearch.value.trim() !== '' && emailInput.value.trim() !== '') {
    var allCrushesFilled = true;
    crushInputs.forEach(function(crushInput) {
      if (crushInput.value.trim() === '') {
        allCrushesFilled = false;
      }
    });

    // Check if all crush email fields are filled
    var allCrushEmailsFilled = true;
    var crushEmailInputs = document.querySelectorAll('.crushemail-input');
    crushEmailInputs.forEach(function(emailInput) {
      if (emailInput.value.trim() === '') {
        allCrushEmailsFilled = false;
      }
    });

    if (allCrushesFilled && allCrushEmailsFilled) {
      currName = document.getElementById('email').value.trim(); 
      currSchool = document.getElementById('schoolSearch').value.trim(); 

      crush1 = document.getElementById('crush1').value.trim(); 
      crush2 = document.getElementById('crush2').value.trim(); 
      crush3 = document.getElementById('crush3').value.trim(); 

      crush1Email = document.getElementById('crush1email').value.trim(); 
      crush2Email = document.getElementById('crush2email').value.trim(); 
      crush3Email = document.getElementById('crush3email').value.trim(); 
            
      
      const emailMap = new Map(); 
      
      emailMap.set(crush1Email, crush1); 
      emailMap.set(crush2Email, crush2); 
      emailMap.set(crush3Email, crush3); 
      
      var userData = new User(currName, currSchool, emailMap); 
      //var userData = [document.getElementById('email').value.trim(), document.getElementById('school').value.trim(), crushList, crushEmailList];
      
      // In signup.js
      window.globalFunctions.submitData(userData);
      window.globalFunctions.nextPageLog(userData.userUID);
      setTimeout(function() {
        window.location.href = "/html/new.html";
      }, 1000);


      
    } else {
      alert('Please fill all crush and crush email fields.');
    }
  } else {
    alert('Please fill all required fields.');
  }
}

//Loop check if google is signed in. If it isn't then signup greyed out.

// Function to check if dynamicVariable is empty and disable signup button
function checkDynamicVariable() {
  var dynamicVariable = document.getElementById("dynamicVariable");
  var signUpButton = document.querySelector('.signup-button');
  
  // Check if dynamicVariable is empty
  if (!dynamicVariable || dynamicVariable.textContent.trim() === '') {
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
    signupButton.style.backgroundImage = "url('/images/signupgrey.png')";
  }
}
// Call checkDynamicVariable initially
checkDynamicVariable();
// Set up an interval to check dynamicVariable periodically
setInterval(checkDynamicVariable, 100); // Adjust the interval duration as needed


document.addEventListener("DOMContentLoaded", function(){
  var searchInput = document.querySelector(".search-bar");
  var dropdown = document.querySelector(".schools-dropdown");


  for (let i = 0; i < 6000; i++) {
		var option = document.createElement("div");
		option.classList.add("school-option");
		dropdown.appendChild(option);
  }
  var schoolOptions = document.querySelectorAll(".school-option");

  fetch('../schools.txt')
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
				if (index < 3) {
					option.style.display = "block";
				} else {
					option.style.display = "none";
				}
			});
		} else {
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
			if (optionText.includes(searchTerm) && visibleOptionsCount < 3) {
				option.style.display = "block";
				visibleOptionsCount++;
			} else {
				option.style.display = "none";
			}
		});
  });
});

var signupButton = document.querySelector('.signup-button');
signupButton.style.display = 'none';

function toggleTabButtonStyle(activeButtonIndex) {
  var tabButtons = document.querySelectorAll('.tab-button');
  var signUpButton = document.querySelector('.signup-button');
  var nextButton = document.querySelector('.next-button');

  tabButtons.forEach(function(button, index) {
    if (index === activeButtonIndex) {
      button.classList.add('active-tab-button');
      button.querySelector('img').src = "/images/dark.png";
    } else {
      button.classList.remove('active-tab-button');
      button.querySelector('img').src = "/images/light.png";
    }
  });

  signUpButton.style.display = 'block';
  nextButton.style.display = 'none';
}

function nextButton(){
  var nextButton = document.querySelector('.next-button');
  var signUpButton = document.querySelector('.signup-button');
  
  nextButton.style.display = 'none';
  signUpButton.style.display = 'block';
  nextTab2();
}



