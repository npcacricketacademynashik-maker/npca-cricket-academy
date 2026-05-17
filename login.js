import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
query,
where,
getDocs

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaHa4ppEE8XYTDObzaTwOivfyPKG5b1BY",
  authDomain: "npca-cricket.firebaseapp.com",
  projectId: "npca-cricket",
  storageBucket: "npca-cricket.firebasestorage.app",
  messagingSenderId: "718683217018",
  appId: "1:718683217018:web:58b6d22f09a492fa386fc3",
  measurementId: "G-Y6NCKNPSXD"
};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener(
"click",

async ()=>{

const mobile =
document.getElementById(
"loginMobile"
).value;

const q =
query(

collection(db,"students"),

where("mobile","==",mobile)

);

const querySnapshot =
await getDocs(q);

if(querySnapshot.empty){

alert(
"New Student Please Register"
);

window.location.href =
"index.html";

}

else{

alert(
"Login Successful"
);
localStorage.setItem(
"studentMobile",
mobile
);
window.location.href =
"dashboard.html";

}

});