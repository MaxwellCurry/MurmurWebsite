import { getFirestore, doc, getDoc, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app); 
const db1 = getFirestore(app); 
auth.languageCode = 'en'; 
var uid = "";


// Get the query parameters from the URL
const queryString = window.location.search;

// Create a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'userEmail' parameter
const userEmail = urlParams.get('userEmail');

//console.log(userEmail); 
if(userEmail === null){
  window.location.href = "../index.html"; 
}

uid = userEmail;


let userSchool = "";
let email = "";
async function findSchool() {
  const schoolDoc = await getDoc(doc(db1, "Schools", "School List"));
  const schoolArray = schoolDoc.get("Schools");
  
  for (let i = 0; i < schoolArray.length; i++) {
    const schoolDoc = await getDoc(doc(db1, schoolArray[i], uid));
    if (schoolDoc.exists()) {
      userSchool = schoolArray[i];
      break;
    }
  }
//  console.log(userSchool);
  document.getElementById("schoolInput").value = userSchool;
  getUser();
}
findSchool();

var profileData = {
  name: "",
  school: "",
  email: "",
  crushMap: new Map()
};
async function getUser() {
  const userData = await getDoc(doc(db1, userSchool, uid));
  profileData.name = userData.get("fullname");
  profileData.school = userData.get("email");
  profileData.crushMap = userData.get("crushList");
//  console.log(profileData.school);
  document.getElementById("nameInput").value = profileData.name;
  
  const schoolElement = document.getElementById("schoolDisplay");
  schoolElement.innerHTML = "Signed in as: " + profileData.school;
  schoolElement.classList.add("pastel-crayon-font");

  
  
  let crushNames = [];
  let crushEmails = [];

  for (let email in profileData.crushMap) {
      if (Object.prototype.hasOwnProperty.call(profileData.crushMap, email)) {
          let crushName = profileData.crushMap[email];
          crushNames.push(crushName);
          crushEmails.push(email);
      }
  }
  
  document.getElementById('crush1').value = crushNames[0];
  document.getElementById('crush2').value = crushNames[1];
  document.getElementById('crush3').value = crushNames[2];
  document.getElementById('crush1email').value = crushEmails[0];
  document.getElementById('crush2email').value = crushEmails[1];
  document.getElementById('crush3email').value = crushEmails[2];
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
  
  const crushList = {
    [crush1email]: crush1,
    [crush2email]: crush2,
    [crush3email]: crush3
  };

  const userData = await getDoc(doc(db1, userSchool, uid));
  const profileData = {
    fullname: nameInputValue,
    crushList: crushList,
    email: userData.get("email"),
  };

  const docRef = doc(db1, schoolInputValue, uid);
  const result = await setDoc(docRef, profileData);

  const deleteResult = await deleteDoc(doc(db1, userSchool, uid));
  userSchool = schoolInputValue;

  const newDocRef = doc(db1, schoolInputValue, uid); 
  const setResult = await setDoc(newDocRef, profileData);
}




document.getElementById("editButton").addEventListener("click", function() {
  setValues();
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
      await deleteDoc(doc(db1, userSchool, uid));
      console.log("Document successfully deleted!");
        window.location.href = "../index.html";
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
});

document.getElementById("signButton").addEventListener("click", function() {
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

document.addEventListener('DOMContentLoaded', function() {
    addNotification('You have a new match!', 'You have matched with: Emaan Heidari, 100023288@mvla.net');
    addNotification('You have a new match!', 'You have matched with: Garv Virginkar, 100025488@mvla.net');
});

const notificationCount = 2; // Set your notification count here
const notificationCountElement = document.getElementById('notificationCount');

if (notificationCount === 0) {
    notificationCountElement.style.display = 'none';
} else {
    notificationCountElement.textContent = notificationCount;
}












