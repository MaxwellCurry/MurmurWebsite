// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.language = 'en'; 

const googleLogIn = document.getElementById("google-login-button");
let toggle = false; // Initialize toggle variable
let login = false;

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
        
          if(login){
            userEmailDisplay = document.createElement('p');
            userEmailDisplay.textContent = `Signed in as: ${user.email}`;
            userEmailDisplay.style.marginTop = '45px';
            document.body.appendChild(userEmailDisplay);
            toggle=true;
            googleLogIn.textContent = "Sign Out";
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
      googleLogIn.innerHTML = 'Link' + originalButtonContent.html; 
    }
  }
});

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('User is signed in:', user);
  } else {
    // No user is signed in.
    console.log('No user is signed in.');
  }
});

if (window.location.href.includes("signup.html")) {
  login = true;
}
