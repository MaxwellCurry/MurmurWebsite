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
	signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
		console.log(user)
		//window.location.href = ""; //change location to like logged or something IDK LMFAOO
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

})