// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app); //database
const db1 = getFirestore(app); 
auth.language = 'en'; 
let currentUser = null;

const googleLogIn = document.getElementById("google-login-button");
let toggle = false; // Initialize toggle variable
let login = false;

let emailDisplay = "Signed in as: ${user.email}"
const originalButtonContent = {
};

var userEmail = "";




googleLogIn.addEventListener("click", function(event){
  if(event.target === googleLogIn){
    if(!toggle){
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          var dynamicVariableSpan = document.getElementById("dynamicVariable");
        
        
          if(login){
            userEmailDisplay = document.createElement('p');
            dynamicVariableSpan.textContent = `Linked with: ${user.email}`;
            toggle = true;
            originalButtonContent.html = googleLogIn.innerHTML;
            googleLogIn.style.backgroundImage = "url('/images/unlink.png')"; 
            toggleSignUpButton(); // Call toggleSignUpButton after sign-in
          }
          else{
            window.location.href = "/html/new.html";
          }
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } else {
      if (userEmailDisplay) {
        userEmailDisplay.remove();
      }
      toggle = false;
      googleLogIn.style.backgroundImage = "url('/images/link.png')";
      toggleSignUpButton(); // Call toggleSignUpButton after sign-out
      auth.signOut().then(() => {
      }).catch((error) => {
        
      });
    }
  }
});


let userUID = ""
auth.onAuthStateChanged(function(user) {
  if (user) {
		userUID = user.uid
    // User is signed in.
    console.log('User is signed in:', user);
    currentUser = user;
    // Enable the signup button
    signUpButton.disabled = false;
    signUpButton.classList.remove('disabled');
    userEmail=user.email;
  } else {
    var dynamicVariableSpan = document.getElementById("dynamicVariable");
    console.log('No user is signed in.');
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
    userEmail = null;
    dynamicVariableSpan.textContent = '';
  }
	
});

window.globalFunctions = {
  submitData: async function(userData) {
      const nestedUserData = {
          fullname: userData.name,
          crushList: Object.fromEntries(userData.crushList), 
          email: userEmail
      }

      const docRef = doc(db, userData.school, userUID)
      const schoolList = doc(db, "Schools", "School List"); 
      const schoolListSnap = await getDoc(schoolList); 

      const schoolListArray = schoolListSnap.get("Schools"); 
      console.log(Array.isArray(schoolListArray)); 
      if (schoolListArray.includes(userData.school) == false) { 
        await updateDoc(schoolList, {
            Schools: arrayUnion(userData.school)
        });
      }

      const result = await setDoc(docRef, nestedUserData); 
  }
  
  
  ,getUser: async function() {
    try {
      const test = doc(db1, "Overwrite", "eNmGQtRx7JONl7njLGNoqaj1rvO2");
      const test1 = await getDoc(test);
      const hippo = test1.get("crushList");
      console.log(hippo);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }
};



if (window.location.href.includes("signup.html")) {
  login = true;
}

