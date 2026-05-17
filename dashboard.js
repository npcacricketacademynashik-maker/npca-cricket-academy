if(

!localStorage.getItem(
"studentMobile"
)

){

window.location.href =
"login.html";

}
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
query,
where,
getDocs,
doc,
updateDoc

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

const mobile =
localStorage.getItem(
"studentMobile"
);

async function loadStudent(){

const q =
query(

collection(db,"students"),

const studentName =
document.getElementById(
"studentName"
).innerHTML
.replace("Name : ","")
.trim()
.toLowerCase();

const attendanceQuery =
query(

collection(db,"attendance"),

where("name","==",studentName)

);

const querySnapshot =
await getDocs(q);

querySnapshot.forEach((doc)=>{

const data = doc.data();

document.getElementById(
"studentName"
).innerHTML =
"Name : " + data.name;

document.getElementById(
"studentMobile"
).innerHTML =
"Mobile : " + data.mobile;

document.getElementById(
"studentBatch"
).innerHTML =
"Batch : " + data.batch;

document.getElementById(
"studentRole"
).innerHTML =
"Role : " + data.role;

document.getElementById(
"studentFee"
).innerHTML =
const dobDate =
new Date(data.dob);

const currentDate =
new Date();

let age =
currentDate.getFullYear() -
dobDate.getFullYear();

let updatedFee = 1600;

if(age < 10){

updatedFee = 1200;

}

document.getElementById(
"studentFee"
).innerHTML =

"Monthly Fee : ₹" +
updatedFee;

});

loadStudent();
async function loadAttendance(){

const attendanceQuery =
query(

collection(db,"attendance"),

where("name","==",
document.getElementById(
"studentName"
).innerHTML.replace("Name : ","")
)

);

const attendanceSnapshot =
await getDocs(attendanceQuery);

attendanceSnapshot.forEach((doc)=>{

const data = doc.data();

const div =
document.createElement("div");

div.innerHTML =

data.date +
" - " +
data.status;

document.getElementById(
"attendanceList"
).appendChild(div);

});

}

setTimeout(()=>{

loadAttendance();

},1000);
async function loadFees(){

const studentName =
document.getElementById(
"studentName"
).innerHTML
.replace("Name : ","")
.trim();

const feeQuery =
query(

collection(db,"fees"),

where("name","==",studentName)

);

const feeSnapshot =
await getDocs(feeQuery);

feeSnapshot.forEach((doc)=>{

const data = doc.data();

const div =
document.createElement("div");

div.innerHTML =

`

<hr>

<p>Month : ${data.month}</p>

<p>Amount : ₹${data.amount}</p>

<p>Status : ${data.status}</p>

`;

document.getElementById(
"feeHistory"
).appendChild(div);

});

}
setTimeout(()=>{

loadFees();

},1000);
const logoutBtn =
document.getElementById(
"logoutBtn"
);

logoutBtn.addEventListener(
"click",

()=>{

localStorage.removeItem(
"studentMobile"
);

window.location.href =
"login.html";

});
const updateBtn =
document.getElementById(
"updateBtn"
);

updateBtn.addEventListener(
"click",

async ()=>{

const newAddress =
document.getElementById(
"editAddress"
).value;

const newRole =
document.getElementById(
"editRole"
).value;

const querySnapshot =
await getDocs(
collection(db,"students")
);

querySnapshot.forEach(
async (studentDoc)=>{

const data =
studentDoc.data();

if(
data.mobile === mobile
){

const studentRef =
doc(
db,
"students",
studentDoc.id
);

await updateDoc(
studentRef,
{

address:newAddress,
role:newRole

}
);

alert(
"Profile Updated"
);

location.reload();

}

});

});