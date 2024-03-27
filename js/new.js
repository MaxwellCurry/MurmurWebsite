import { getFirestore, doc, getDoc, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db1 = getFirestore(app); 
auth.languageCode = 'en'; 
var uid = "";


const userUID = localStorage.getItem('userUID');

document.addEventListener('DOMContentLoaded', function() {
  if (userUID) {
    fetchUserData(userUID);
  } else {
  }
});

// Function to fetch user data using the user's UID
function fetchUserData(userUID) {
  uid=userUID;
}

if(userUID === "null"){
  window.location.href = "../index.html";
}

getUser();

var profileData = {
  name: "",
  school: "",
  email: "",
  crushMap: new Map(),
  emailArray: []
};
async function getUser() {
  const userData = await getDoc(doc(db1, "Users", userUID));
  profileData.name = userData.get("fullname");
  profileData.email = userData.get("email");
  profileData.crushMap = userData.get("crushList");
  profileData.school = userData.get("school");
  profileData.emailArray = userData.get("emailArray");
  document.getElementById("nameInput").value = profileData.name;
  document.getElementById("schoolInput").value = profileData.school;  

  
  
  let crushNames = [];
  let crushEmails = [];

  for (let email in profileData.crushMap) {
      if (Object.prototype.hasOwnProperty.call(profileData.crushMap, email)) {
          let crushName = profileData.crushMap[email];
          crushNames.push(crushName);
          crushEmails.push(email);
      }
  }
  
  document.getElementById('crush1').value = handleUndefinedInput(crushNames[0]);
  document.getElementById('crush2').value = handleUndefinedInput(crushNames[1]);
  document.getElementById('crush3').value = handleUndefinedInput(crushNames[2]);
  document.getElementById('crush1email').value = handleUndefinedInput(crushEmails[0]);
  document.getElementById('crush2email').value = handleUndefinedInput(crushEmails[1]);
  document.getElementById('crush3email').value = handleUndefinedInput(crushEmails[2]);
  
  const schoolElement = document.getElementById("schoolDisplay");
  schoolElement.innerHTML = "Signed in as: " + userData.get("email");
  schoolElement.classList.add("pastel-crayon-font");
}

function handleUndefinedInput(input) {
  return input !== undefined ? input : "";
}


async function setValues() {
  const nameInput = document.getElementById("nameInput");
  const nameInputValue = nameInput.value.trim();
  const schoolInput = document.getElementById("schoolInput");
  const schoolInputValue = schoolInput.value.trim();
  const crush1 = document.getElementById('crush1').value.trim();
  const crush2 = document.getElementById('crush2').value.trim();
  const crush3 = document.getElementById('crush3').value.trim();
  const crush1email = document.getElementById('crush1email').value.trim();
  const crush2email = document.getElementById('crush2email').value.trim();
  const crush3email = document.getElementById('crush3email').value.trim();
  
  
  const crushList = {};

  // Populate crushList conditionally
  if (crush1email !== '') {
    crushList[crush1email] = crush1;
  }
  if (crush2email !== '' && crush2 !== '') {
    crushList[crush2email] = crush2;
  }
  if (crush3email !== '' && crush3 !== '') {
    crushList[crush3email] = crush3;
  }
  const emailArray = [crush1email, crush2email, crush3email];

  const userData = await getDoc(doc(db1, "Users", userUID));
  const profileData = {
    fullname: nameInputValue,
    crushList: crushList,
    email: userData.get("email"),
    school: schoolInputValue,
    matches: userData.get("matches"),
    emailArray: emailArray
  };

  const newDocRef = doc(db1, "Users", userUID); 
  const setResult = await setDoc(newDocRef, profileData);
}


function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}


var crushInputs = document.querySelectorAll('.crush-input');
var crushEmailInputs = document.querySelectorAll('.crushemail-input');


//setInterval(checkDuplicateCrushes, 20);

function toggleEditButton() {
    var editButton = document.getElementById("editButton");
    var crushInputs = document.querySelectorAll('.crush-input');
    var crushEmailInputs = document.querySelectorAll('.crushemail-input');
    var nameInputs = document.querySelectorAll('.name-input');
    var schoolInputs = document.querySelectorAll('.schoolInput');
    var emptyTextBox = false;

    // Check for duplicates and empty textboxes
    [nameInputs, schoolInputs].forEach(inputs => {
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                emptyTextBox = true;
            }
        });
    });

    editButton.disabled = emptyTextBox;
}

// Add event listeners to all inputs for immediate feedback
document.querySelectorAll('.crush-input, .crushemail-input, .name-input, .schoolInput').forEach(input => input.addEventListener('input', toggleEditButton));

document.getElementById("editButton").addEventListener("click", function() {
    var crushInputs = document.querySelectorAll('.crush-input');
    var crushEmailInputs = document.querySelectorAll('.crushemail-input');
    var nameInputs = document.querySelectorAll('.name-input');
    var schoolInputs = document.querySelectorAll('.schoolInput');
    var allInputsFilled = true;

    [nameInputs, schoolInputs].forEach(inputs => {
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allInputsFilled = false;
            }
        });
    });

    if (allInputsFilled) {
        console.log("yo");
        setValues();
    }
});




//----------------------------------new.js

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
const editButton = document.getElementById("editButton");
const inputElements = document.querySelectorAll(".profile-info input");

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(content => content.classList.remove('active'));
    contents[index].classList.add('active');
  });
});


// Add click event listener to the edit button
editButton.addEventListener("click", function() {
  if (editButton.textContent === "Edit") {
    // Change button text to "Submit"
    editButton.textContent = "Submit";

    // Enable all input elements
    inputElements.forEach(function(input) {
      input.disabled = false;
    });
  } else {
    // Change button text back to "Edit"
    editButton.textContent = "Edit";

    // Disable all input elements
    inputElements.forEach(function(input) {
      input.disabled = true;
    });
  }
});

// Add event listener to the delete button
document.getElementById("deleteButton").addEventListener("click", async function() {
  if (confirm("Are you sure you want to delete your account?")) {
    try {
      await deleteDoc(doc(db1, "Users", userUID));
      console.log("Document successfully deleted!");
        window.location.href = "../index.html";
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
});

document.getElementById("signButton").addEventListener("click", function() {
  localStorage.setItem('userUID', null);
  window.location.href = "../index.html";
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the tab button for tab 3
  const tab3Button = document.getElementById('tab1');

  // Programmatically click on the tab 3 button
  tab3Button.click();
});


let currentPopup = null;

function addNotification(message, popupMessage) {
    const notificationBox = document.getElementById('notificationBox');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message; // Use the message parameter for the text

    notification.addEventListener('click', function() {
        showPopup(popupMessage);
    });

    notificationBox.appendChild(notification);
}

function showPopup(message) {
    if (currentPopup !== null) {
        document.body.removeChild(currentPopup);
        currentPopup = null;
    }

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;

  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(popup);
        currentPopup = null;
    });
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
    currentPopup = popup;
}

getMatches(); // Changed const to let to allow reassignment

async function getMatches() {
  const userData = await getDoc(doc(db1, "Users", userUID));
  const matches = userData.get('matches');
  
  
  for (let k = 0; k < matches.length; k++) { // Corrected the for loop syntax
    const matchArray = matches[k];
    if (matchArray != null) { // Corrected matchArray spelling
      const matchData = await getDoc(doc(db1, "Users", matchArray));
      addNotification("You have a new match!", "You have matched with: " + matchData.get("fullname"));
//      matched = true
    }
  }
//  confetti()
}

//function confetti() {
//  for (let i = 0; i < 10; i++) {
//    const confetti = document.createElement('div');
//    confetti.classList.add('confetti');
//    document.body.appendChild(confetti);
//  }
//
//  // Remove confetti elements after 5 seconds
//  setTimeout(() => {
//    const confettiElements = document.querySelectorAll('.confetti');
//    confettiElements.forEach(confetti => {
//      confetti.remove();
//    });
//  }, 5000);
//}
//
//confetti()


const userData = await getDoc(doc(db1, "Users", userUID));
const matches = userData.get('matches');
let notificationCount = matches.length;

const notificationCountElement = document.getElementById('notificationCount');

if (notificationCount === 0) {
    notificationCountElement.style.display = 'none';
} else {
    notificationCountElement.textContent = notificationCount;
}

window.addEventListener('beforeunload', function(event) {
  localStorage.setItem('userUID', null);
});

function setActiveTab() {
  // Query all content elements and tabs
  const contents = document.querySelectorAll('.content');
  const tabs = document.querySelectorAll('.tab');

  // Loop through all content elements to find the one that's currently active
  contents.forEach((content, index) => {
    if (content.style.display === 'block' || content.classList.contains('active')) {
      // Remove 'tab-active' class from all tabs
      tabs.forEach(tab => tab.classList.remove('tab-active'));
      
      // Add 'tab-active' class to the corresponding tab
      if (tabs[index]) {
        tabs[index].classList.add('tab-active');
      }
    }
  });
}

// Add event listeners to tabs for switching content and setting active tab
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Hide all content elements
    contents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none'; // Assuming you use this to hide content
    });

    // Show the clicked tab's content
    contents[index].classList.add('active');
    contents[index].style.display = 'block'; // Assuming you use this to show content

    // Update which tab is highlighted as active
    setActiveTab();
  });
});

// Run setActiveTab on page load to highlight the correct initial tab
document.addEventListener('DOMContentLoaded', setActiveTab);

tabs[0].classList.add('tab-active');

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




