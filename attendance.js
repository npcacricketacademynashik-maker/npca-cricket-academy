import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
addDoc

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

const markBtn =
document.getElementById("markBtn");

markBtn.addEventListener(
"click",

async ()=>{

const name =
document.getElementById(
"studentName"
).value.trim().toLowerCase();

const status =
document.getElementById(
"status"
).value;

const today =
new Date().toLocaleDateString();

await addDoc(
collection(db,"attendance"),

{

name,
status,
date:today

}

);

alert(
"Attendance Marked"
);

});