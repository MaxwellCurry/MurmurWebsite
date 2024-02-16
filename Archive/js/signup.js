var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');
var crushInputs = document.querySelectorAll('.crush-input');
var signupButton = document.querySelector('.signup-button');
var signupImage = document.createElement('img');

// Append the image to the signup button
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
signUpButton.disabled = true;
signUpButton.classList.add('disabled');


schoolInput.addEventListener('input', toggleSignUpButton);
emailInput.addEventListener('input', toggleSignUpButton);
crushInputs.forEach(function(crushInput) {
  crushInput.addEventListener('input', toggleSignUpButton);
});

signupImage.src = "/images/signupgrey.png"; // Set the image source
signupImage.alt = "Sign Up"; // Set the alt text for accessibility

function toggleSignUpButton() {
  const userSignedIn = userEmailDisplay;
  if (userSignedIn) {
    if (schoolInput.value.trim() !== '' && emailInput.value.trim() !== '') {
      var allCrushesFilled = true;
      crushInputs.forEach(function(crushInput) {
        if (crushInput.value.trim() === '') {
          allCrushesFilled = false;
        }
      });
      signUpButton.disabled = !allCrushesFilled;
    } else {
      signUpButton.disabled = true;
    }

    if (signUpButton.disabled) {
      signUpButton.classList.add('disabled');
    } else {
      signUpButton.classList.remove('disabled');
    }
    
  } else {
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
  }
  if(signUpButton.disabled == true){
    signupImage.src = "/images/signupgrey.png";
  } else{
    signupImage.src = "/images/signup.png";
  }
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

    if (allCrushesFilled) {
      window.location.href = "new.html";
    } else {
      alert('Please fill all crush fields.');
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
setInterval(checkDynamicVariable, 1); // Adjust the interval duration as needed








