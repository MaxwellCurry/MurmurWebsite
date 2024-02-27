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


var uid = "ETHnsnES8vYUgZmsoR87CBsfU8J3"

let userSchool = "";
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
  console.log(userSchool);
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
  document.getElementById("nameInput").value = profileData.name;
}


async function setValues() {
  const nameInput = document.getElementById("nameInput");
  const nameInputValue = nameInput.value.trim();
  const schoolInput = document.getElementById("schoolInput");
  const schoolInputValue = schoolInput.value.trim();
  const userData = await getDoc(doc(db1, userSchool, uid));
  
  const nestedUserData = {
    fullname: nameInputValue,
    crushList: userData.get("crushList"),
    email: userData.get("email"),
  };

  const docRef = doc(db1, schoolInputValue, uid);
  const result = await setDoc(docRef, nestedUserData, { merge: true });
  
  
  const crushList = userData.get("crushList");
  const profileData = {
    fullname: nameInputValue,
    email: userData.get("email")
  };

  if (crushList !== undefined) {
    profileData.crushList = crushList;
  }
  
  const deleteResult = await deleteDoc(doc(db1, userSchool, uid));

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










