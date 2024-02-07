// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.language = 'en'; 

// Shortcuts to DOM Elements.
//const signInButton = document.getElementById('signup-button');
const googleLogIn = document.getElementById("google-login-button");
let toggle = false; // Initialize toggle variable

let emailDisplay = "Signed in as: ${user.email}"
const originalButtonContent = {
  text: "Link",
  html: `<img src="/images/google.png" alt="Google Logo" id="google-logo">`
};

googleLogIn.addEventListener("click", function(event){
  if(event.target === googleLogIn){
    if(!toggle){
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        
          userEmailDisplay = document.createElement('p');
          userEmailDisplay.textContent = `Signed in as: ${user.email}`;
          userEmailDisplay.style.marginTop = '45px';
          document.body.appendChild(userEmailDisplay);
          toggle=true;
          googleLogIn.textContent = "Sign Out";
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
      googleLogIn.innerHTML = 'Link' + originalButtonContent.html; 
    }
  }
});







