var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');
var crushInputs = document.querySelectorAll('.crush-input');
var crushEmailInputs = document.querySelectorAll('.crushemail-input');
var signupButton = document.querySelector('.signup-button');
var signupImage = document.createElement('img');


var userEmail = "";
var userUID = "";

class User {
  constructor(name, school, crushList, emailArray) {
    this.name = name; 
    this.school = school; 
    this.crushList = crushList; 
    this.userEmail = userEmail;
    this.userUID = userUID;
    this.emailArray = emailArray;
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

//  tabButtons[buttonIndex].classList.add('active-tab-button');

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


let alertShown = false;

function checkDuplicateCrushes() {
  var crushInputs = document.querySelectorAll('.crush-input');
  var crushEmailInputs = document.querySelectorAll('.crushemail-input');

  var crushValues = Array.from(crushInputs).map(input => input.value.trim()).filter(value => value !== '');
  var crushEmailValues = Array.from(crushEmailInputs).map(input => input.value.trim()).filter(value => value !== '');

  if (!alertShown && hasDuplicates(crushValues)) {
    alertShown = true;
    toggleSignUpButton()
    setTimeout(function() {
      alert('Please do not put duplicate names!');
    }, 30);
  }

  if (!alertShown && hasDuplicates(crushEmailValues)) {
    alertShown = true;
    toggleSignUpButton()
    setTimeout(function() {
      alert('Please do not put duplicate names!');
    }, 30);
  }
}

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

function resetAlertFlag() {
  alertShown = false;
}

toggleNextButton();

function toggleNextButton() {
  var nextButton = document.querySelector('.next-button');
  if (schoolSearch.value.trim() !== '' && emailInput.value.trim() !== '') {
    nextButton.disabled = false; // Enable the next button
    nextButton.classList.remove('disabled'); // Optional: Adjust CSS class for visual feedback
    nextButton.style.backgroundImage = "url('/images/next.png')"; // Set enabled background image
  } else {
    nextButton.disabled = true; // Disable the next button
    nextButton.classList.add('disabled'); // Optional: Adjust CSS class for visual feedback
    nextButton.style.backgroundImage = "url('/images/nextgrey.png')"; // Set disabled background image
  }
}


toggleNextButton();

schoolSearch.addEventListener('input', toggleNextButton);
emailInput.addEventListener('input', toggleNextButton);


var crushInputs = document.querySelectorAll('.crush-input');
var crushEmailInputs = document.querySelectorAll('.crushemail-input');

crushInputs.forEach(input => input.addEventListener('input', resetAlertFlag));
crushEmailInputs.forEach(input => input.addEventListener('input', resetAlertFlag));

var signupButton = document.querySelector('.signup-button');
signupButton.style.display = 'none';

function toggleSignUpButton() {
  const userSignedIn = userEmailDisplay;
  if (userSignedIn) {
    if (schoolSearch.value.trim() !== '' && emailInput.value.trim() !== '' && alertShown != true) {
      // Check only the first crush input
      var firstCrushInput = document.querySelector('.crush-input');
      var firstEmailInput = document.querySelector('.crushemail-input');
      if (firstCrushInput && firstCrushInput.value.trim() !== '' && firstEmailInput && firstEmailInput.value.trim() !== '') {
        signUpButton.disabled = false;
      } else {
        signUpButton.disabled = true;
      }
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
    if(crush2Email != '' && crush2 != ''){
      emailMap.set(crush2Email, crush2);  
    }
    if(crush3Email != '' && crush3 != ''){
      emailMap.set(crush3Email, crush3);  
    } 

    const emailArray = [crush1Email, crush2Email, crush3Email];

    var userData = new User(currName, currSchool, emailMap, emailArray); 
    //var userData = [document.getElementById('email').value.trim(), document.getElementById('school').value.trim(), crushList, crushEmailList];

    async function submitUserDataAndRedirect(userData) {
      await window.globalFunctions.submitData(userData);
      window.location.href = "/html/new.html";
    }

    submitUserDataAndRedirect(userData);

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


  for (let i = 0; i < 33971; i++) {
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
            if (index < 5) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    } else {
        dropdown.style.display = "none";
    }

    // Stop event propagation if the click occurred within the search bar container
    if (!event.target.classList.contains("search-bar") && !event.target.classList.contains("schools-dropdown")) {
        event.stopPropagation();
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


setInterval(checkDuplicateCrushes, 20); // Adjust the interval duration as needed

const dynamicVariableSpan = document.getElementById('dynamicVariable');
const realUser = localStorage.getItem('storage');

if(realUser === null){
  window.location.href = "../index.html";
}
else{
  console.log(realUser)
  userEmailDisplay = document.createElement('p');
  toggle = true;
  toggleSignUpButton(); // Call toggleSignUpButton after sign-in
  dynamicVariableSpan.textContent = `Linked with: ${realUser}`;
  document.querySelector('.academic').style.display = 'none';
  userEmail=realUser.email;
}


document.addEventListener("DOMContentLoaded", function(){
  var searchInput = document.querySelector(".search-bar");
  var dropdown = document.querySelector(".schools-dropdown");


  for (let i = 0; i < 33971; i++) {
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
            if (index < 5) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    } else {
        dropdown.style.display = "none";
    }

    // Stop event propagation if the click occurred within the search bar container
    if (!event.target.classList.contains("search-bar") && !event.target.classList.contains("schools-dropdown")) {
        event.stopPropagation();
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
			} else {
				option.style.display = "none";
			}
		});
  });
});


