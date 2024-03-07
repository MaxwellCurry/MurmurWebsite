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
  const schoolDoc = await getDoc(doc(db1, "Users", uid));
  if (schoolDoc.exists()) {
    console.log("stooopid");
    userExists = true;
    console.log(userExists);
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
//            if (result.additionalUserInfo.isNewUser) {
//              console.log("exists");
//              userExists = true;
//            } else {
//              console.log("DNE");
//              userExists = false;
//            }
          findSchool(user.uid);
          var dynamicVariableSpan = document.getElementById("dynamicVariable");
        
        
          if(login){
            
            
            setTimeout(function() {
            
            if(!userExists){
                userEmailDisplay = document.createElement('p');
                toggle = true;
                originalButtonContent.html = googleLogIn.innerHTML;
                googleLogIn.style.backgroundImage = "url('/images/unlink.png')"; 
                toggleSignUpButton(); // Call toggleSignUpButton after sign-in
                findSchool(user.uid);
                dynamicVariableSpan.textContent = `Linked with: ${user.email}`;
                var academic = document.getElementById("");
                
              }
              else{
                alert("YOUVE ALREADY REGISTERED DUMBO");
              }
            
            }, 1000);
            
          }
          else{
            setTimeout(function() {
              if(userExists){
                const uid = user.uid;
                localStorage.setItem('userUID', uid);
                window.location.href = "/html/new.html";
              }
              else{
                alert("You need to register!");
              }
            }, 1000);
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


auth.onAuthStateChanged(function(user) {
  if (user) {
    setTimeout(function() {
      if(!userExists){
        userUID = user.uid;
        // User is signed in.
        console.log('User is signed in:', user);
        currentUser = user;
        userEmail=user.email;
        superDuper=user.uid;
        
        const uid = user.uid;
        localStorage.setItem('userUID', uid);
      }
      else{
      }
    }, 2000);
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
        email: userEmail,
        school: userData.school
      }

      const docRef = doc(db, "Users", userUID)
      const result = await setDoc(docRef, nestedUserData); 

  }
  ,nextPageLog: async function(uid){
//      var url = "/html/new.html?userEmail=" + encodeURIComponent(uid);
//
//      setTimeout(function() {
//        window.location.href = url;
//      }, 1000);
  }

};



if (window.location.href.includes("signup.html")) {
  login = true;
}

