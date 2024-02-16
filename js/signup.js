export { userEmail }

var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');
var crushInputs = document.querySelectorAll('.crush-input');
var crushEmailInputs = document.querySelectorAll('.crushemail-input');
var signupButton = document.querySelector('.signup-button');
var signupImage = document.createElement('img');

class user {
  constructor(name, school, crushList) {
    this.name = name; 
    this.school = school; 
    this.crushList = crushList; 
    this.email = userEmail; 
  }

  getName() { 
    return this.name; 
  }

  getSchool() { 
    return this.school; 
  }

  getCrushList() { 
    return this.crushList; 
  }

  getEmail() { 
    return this.email; 
  }
  //var userData = [document.getElementById('email').value.trim(), document.getElementById('school').value.trim(), crushList, crushEmailList];
}


signupButton.appendChild(signupImage);

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

var schoolFromURL = getQueryParam('school');
if (schoolFromURL) {
  schoolInput.value = schoolFromURL;
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


schoolInput.addEventListener('input', toggleSignUpButton);
emailInput.addEventListener('input', toggleSignUpButton);
// Add event listeners to crush inputs



signupImage.src = "/images/signupgrey.png"; // Set the image source
signupImage.alt = "Sign Up"; // Set the alt text for accessibility

function toggleSignUpButton() {
  const userSignedIn = userEmailDisplay;
  if (userSignedIn) {
    if (schoolInput.value.trim() !== '' && emailInput.value.trim() !== '') {
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
  signupImage.src = signUpButton.disabled ? "/images/signupgrey.png" : "/images/signup.png";
}



function submitSignUp() {
  // Check if all fields are filled
  if (schoolInput.value.trim() !== '' && emailInput.value.trim() !== '') {
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
      currSchool = document.getElementById('school').value.trim(); 

      crush1 = document.getElementById('crush1').value.trim(); 
      crush2 = document.getElementById('crush2').value.trim(); 
      crush3 = document.getElementById('crush3').value.trim(); 

      crush1Email = document.getElementById('crush1email').value.trim(); 
      crush2Email = document.getElementById('crush2email').value.trim(); 
      crush3Email = document.getElementById('crush3email').value.trim(); 
            
      
      const emailMap = new Map(); 
      
      emailMap.set(crush1, crush1Email); 
      emailMap.set(crush2, crush2Email); 
      emailMap.set(crush3, crush3Email); 
      
      var userData = new user(currName, currSchool, emailMap); 
      //var userData = [document.getElementById('email').value.trim(), document.getElementById('school').value.trim(), crushList, crushEmailList];
      
      
      console.log(user.getName);
      console.log(user.getSchool); 
      console.log(user.email); 
      console.log(user.getCrushList)
      console.log(userData);
      
      
      
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
    signupImage.src = "/images/signupgrey.png";
  }
}
// Call checkDynamicVariable initially
checkDynamicVariable();
// Set up an interval to check dynamicVariable periodically
setInterval(checkDynamicVariable, 100); // Adjust the interval duration as needed








