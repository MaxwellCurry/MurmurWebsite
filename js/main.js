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
var userExists = false;


const googleLogIn = document.getElementById("google-login-button");
let toggle = false; // Initialize toggle variable
let login = false;

let emailDisplay = "Signed in as: ${user.email}"
const originalButtonContent = {
};

var userEmail = "";
var superDuper = "";

async function findSchool(uid) {
  const schoolDoc = await getDoc(doc(db1, "Schools", "School List"));
  const schoolArray = schoolDoc.get("Schools");
  
  for (let i = 0; i < schoolArray.length; i++) {
    const schoolDoc = await getDoc(doc(db1, schoolArray[i], uid));
    if (schoolDoc.exists()) {
      console.log("stooopid");
      userExists = true;
      console.log(userExists);
      break;
    }
  }
}



googleLogIn.addEventListener("click", function(event){
  if(event.target === googleLogIn){
    if(!toggle){
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          var dynamicVariableSpan = document.getElementById("dynamicVariable");
          findSchool(user.uid);
        
        
          if(login){
            userEmailDisplay = document.createElement('p');
            toggle = true;
            originalButtonContent.html = googleLogIn.innerHTML;
            googleLogIn.style.backgroundImage = "url('/images/unlink.png')"; 
            toggleSignUpButton(); // Call toggleSignUpButton after sign-in
            findSchool(user.uid);
            dynamicVariableSpan.textContent = `Linked with: ${user.email}`;
          }
          else{
            window.globalFunctions.nextPageLog(user.uid);
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
    if(!userExists){
      userUID = user.uid
      // User is signed in.
      console.log('User is signed in:', user);
      currentUser = user;
      // Enable the signup button
      signUpButton.disabled = false;
      signUpButton.classList.remove('disabled');
      userEmail=user.email;
      superDuper=user.uid;
    }
    else{
//      dynamicVariableSpan.textContent = "";
      console.log('Do not duplicate', user);
    }
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
  ,nextPage: async function(){
      var url = "/html/new.html?userEmail=" + encodeURIComponent("ETHnsnES8vYUgZmsoR87CBsfU8J3"); // Make sure to encode the parameter value

      setTimeout(function() {
        window.location.href = url;
      }, 1000);
  }
  ,nextPageLog: async function(uid){
      var url = "/html/new.html?userEmail=" + encodeURIComponent(uid); // Make sure to encode the parameter value

      setTimeout(function() {
        window.location.href = url;
      }, 1000);
  }

};



if (window.location.href.includes("signup.html")) {
  login = true;
}

