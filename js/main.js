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

googleLogIn.addEventListener("click", async function(event){
  if(event.target === googleLogIn){
    if(!toggle){
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          
          await findSchool(user.uid); // Wait for findSchool to complete
          var dynamicVariableSpan = document.getElementById("dynamicVariable");
        
          if(login){
            if(!userExists){
              userEmailDisplay = document.createElement('p');
              toggle = true;
              originalButtonContent.html = googleLogIn.innerHTML;
              googleLogIn.style.backgroundImage = "url('/images/unlink.png')"; 
              toggleSignUpButton(); // Call toggleSignUpButton after sign-in
              dynamicVariableSpan.textContent = `Linked with: ${user.email}`;
              var academic = document.getElementById("");
              userEmail=user.email;
              localStorage.setItem('userUID', user.uid);
            }
            else{
              alert("YOU'VE ALREADY REGISTERED DUMBO");
            }
          }
          else{
            if(userExists){
              const uid = user.uid;
              localStorage.setItem('userUID', uid);
              window.location.href = "/html/new.html";
            }
            else{
              alert("You need to register!");
            }
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
    if(!userExists){
      userUID = user.uid;
    }
    else{
    }
  } else {
    var dynamicVariableSpan = document.getElementById("dynamicVariable");
    console.log('No user is signed in.');
    signUpButton.disabled = true;
    signUpButton.classList.add('disabled');
    userEmail = null;
    dynamicVariableSpan.textContent = '';
    localStorage.setItem('userUID', null);
  }
	
});

window.globalFunctions = {
  submitData: async function(userData) {
    
    const nestedUserData = {
      fullname: userData.name,
      crushList: Object.fromEntries(userData.crushList), 
      email: userEmail,
      school: userData.school,
      matches: [null, null, null]
    };

    const docRef = doc(db, "Users", userUID);
    await setDoc(docRef, nestedUserData);
  }
};




if (window.location.href.includes("signup.html")) {
  login = true;
}

