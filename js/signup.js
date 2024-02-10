var schoolInput = document.getElementById('school');
var emailInput = document.getElementById('email');
var crushInputs = document.querySelectorAll('.crush-input');

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

  if (tabId === 'tab1') {
    if (userEmailDisplay) {
      userEmailDisplay.style.display = 'block'; // Update display style
    }
  } else {
    flipCardInner.style.transform = 'rotateY(180deg)';
    if (userEmailDisplay) {
      userEmailDisplay.style.display = 'none'; // Update display style
    }
  }
}

function nextTab1() {
  var flipCardInner = document.querySelector('.flip-card-inner');
  flipCardInner.style.transform = 'rotateY(0deg)';
  setTimeout(function() {
    showTab('tab1', 0);
  }, 170);
}

function nextTab2() {
  var flipCardInner = document.querySelector('.flip-card-inner');
  flipCardInner.style.transform = 'rotateY(180deg)';
  setTimeout(function() {
    showTab('tab2', 1);
  }, 170);
}

showTab('tab1', 0);


var signUpButton = document.querySelector('.signup-button');
signUpButton.disabled = true;
signUpButton.classList.add('disabled');

// Add event listeners to inputs to enable/disable the Sign Up button
schoolInput.addEventListener('input', toggleSignUpButton);
emailInput.addEventListener('input', toggleSignUpButton);
crushInputs.forEach(function(crushInput) {
  crushInput.addEventListener('input', toggleSignUpButton);
});

function toggleSignUpButton() {
  // Check if the "Signed in as: user.email" message is displayed on the screen
  const userSignedIn = userEmailDisplay && userEmailDisplay.style.display !== 'none';

  // If the user is signed in, enable the button
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

    // Add or remove disabled class based on button's disabled state
    if (signUpButton.disabled) {
      signUpButton.classList.add('disabled');
    } else {
      signUpButton.classList.remove('disabled');
    }
  } else {
    // If not signed in, disable the button and add the 'disabled' class
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
  }
}



