// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = { //eventually move to config.js file -> temporary for now
  apiKey: "AIzaSyCyqYSgE4lza8qMRAgA4QD_ktre6t9BnQc",
  authDomain: "murmurwebsite.firebaseapp.com",
  projectId: "murmurwebsite",
  storageBucket: "murmurwebsite.appspot.com",
  messagingSenderId: "499595493997",
  appId: "1:499595493997:web:5295c99c3e07d9f7dd7564",
  measurementId: "G-P59KESGR07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.language = 'en'; 

// Shortcuts to DOM Elements.
//const signInButton = document.getElementById('signup-button'); //dont worry for now
const googleLogIn = document.getElementById("google-login-button");
googleLogIn.addEventListener("click", function(){
  // Check if user is already signed in
  if (auth.currentUser) {
    // If user is signed in, perform sign-out
    signOut(auth)
      .then(() => {
        // Change button text and behavior to sign in
        googleLogIn.textContent = "Link";
        googleLogIn.removeEventListener("click", googleLogOutHandler);
        googleLogIn.addEventListener("click", googleLogInHandler);
        // Remove email display
        const userEmailDisplay = document.querySelector('p');
        if (userEmailDisplay) {
          userEmailDisplay.remove();
        }
      })
      .catch((error) => {
        console.error('Sign out failed: ', error);
      });
  } else {
    // If user is not signed in, perform sign-in
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // Display user's email next to the button
        const userEmailDisplay = document.createElement('p');
        userEmailDisplay.textContent = `Signed in as: ${user.email}`;
        userEmailDisplay.style.marginTop = '45px';
        document.body.appendChild(userEmailDisplay);

        // Change button text and behavior to sign out
        googleLogIn.textContent = "Sign Out";
        googleLogIn.removeEventListener("click", googleLogInHandler);
        googleLogIn.addEventListener("click", googleLogOutHandler);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
});

// Handler for sign-out functionality
function googleLogOutHandler() {
  signOut(auth)
    .then(() => {
      // Change button text and behavior to sign in
      googleLogIn.textContent = "Link";
      googleLogIn.removeEventListener("click", googleLogOutHandler);
      googleLogIn.addEventListener("click", googleLogInHandler);
      // Remove email display
      const userEmailDisplay = document.querySelector('p');
      if (userEmailDisplay) {
        userEmailDisplay.remove();
      }
    })
    .catch((error) => {
      console.error('Sign out failed: ', error);
    });
}

// Handler for sign-in functionality
function googleLogInHandler() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Display user's email next to the button
      const userEmailDisplay = document.createElement('p');
      userEmailDisplay.textContent = `Signed in as: ${user.email}`;
      userEmailDisplay.style.marginTop = '45px';
      document.body.appendChild(userEmailDisplay);

      // Change button text and behavior to sign out
      googleLogIn.textContent = "Sign Out";
      googleLogIn.removeEventListener("click", googleLogInHandler);
      googleLogIn.addEventListener("click", googleLogOutHandler);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}





