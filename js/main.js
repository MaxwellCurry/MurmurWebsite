// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app); //database
auth.language = 'en'; 
let currentUser = null;

const googleLogIn = document.getElementById("google-login-button");
let toggle = false; // Initialize toggle variable
let login = false;

let emailDisplay = "Signed in as: ${user.email}"
const originalButtonContent = {
};


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
				school: userData.school,
				crushList: Object.fromEntries(userData.crushList) 
			}
//			const ref = doc(collection(db, "users"))
//			await setDoc(ref, nestedUserData);
			const docRef = doc(db, 'users', userUID)
			const result = await setDoc(docRef, nestedUserData)
		}
};

if (window.location.href.includes("signup.html")) {
  login = true;
}
