import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
getDocs,
deleteDoc

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

async function loadStudents(){

const querySnapshot =
await getDocs(
collection(db,"students")
);

querySnapshot.forEach((doc)=>{

const data = doc.data();

const div =
document.createElement("div");

div.innerHTML =

`

<hr>
<img
src="${data.photoURL}"
width="80"
height="80"
style="border-radius:50%;
object-fit:cover;">
<h3>${data.name}</h3>

<p>Mobile : ${data.mobile}</p>

<p>Role : ${data.role}</p>

<p>Batch : ${data.batch}</p>

<p>Fee : ₹${data.fee}</p>
<button onclick="deleteStudent(
'${doc.id}'
)">

Delete Student

</button>
`;

document.getElementById(
"studentList"
).appendChild(div);

});

}

loadStudents();
const searchBtn =
document.getElementById(
"searchBtn"
);

searchBtn.addEventListener(
"click",

async ()=>{

const searchValue =
document.getElementById(
"search"
).value
.toLowerCase();

document.getElementById(
"studentList"
).innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"students")
);

querySnapshot.forEach((doc)=>{

const data = doc.data();

if(

data.name
.toLowerCase()
.includes(searchValue)

){

const div =
document.createElement("div");

div.innerHTML =

`

<hr>
<img
src="${data.photoURL}"
width="80"
height="80"
style="border-radius:50%;
object-fit:cover;">
<h3>${data.name}</h3>

<p>Mobile : ${data.mobile}</p>

<p>Role : ${data.role}</p>

<p>Batch : ${data.batch}</p>

<p>Fee : ₹${data.fee}</p>
<button onclick="deleteStudent(
'${doc.id}'
)">

Delete Student

</button>
`;

document.getElementById(
"studentList"
).appendChild(div);

}

});

});
const filterBtn =
document.getElementById(
"filterBtn"
);

filterBtn.addEventListener(
"click",

async ()=>{

const batchValue =
document.getElementById(
"batchFilter"
).value;

document.getElementById(
"studentList"
).innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"students")
);
let totalStudents = 0;
let morningCount = 0;

let eveningCount = 0;
querySnapshot.forEach((doc)=>{

const data = doc.data();
totalStudents++;
if(
data.batch ===
"Morning Batch"
){

morningCount++;

}

else{

eveningCount++;

}
if(

batchValue === "all"

||

data.batch === batchValue

){
document.getElementById(
"totalStudents"
).innerHTML =

"Total Students : " +
totalStudents;
document.getElementById(
"morningCount"
).innerHTML =

"Morning Students : " +
morningCount;

document.getElementById(
"eveningCount"
).innerHTML =

"Evening Students : " +
eveningCount;
const div =
document.createElement("div");

div.innerHTML =

`

<hr>
<img
src="${data.photoURL}"
width="80"
height="80"
style="border-radius:50%;
object-fit:cover;">
<h3>${data.name}</h3>

<p>Mobile : ${data.mobile}</p>

<p>Role : ${data.role}</p>

<p>Batch : ${data.batch}</p>

<p>Fee : ₹${data.fee}</p>
<button onclick="deleteStudent(
'${doc.id}'
)">

Delete Student

</button>
`;

document.getElementById(
"studentList"
).appendChild(div);

}

});

});
async function loadFeeStats(){

let paid = 0;
let pending = 0;

const feeSnapshot =
await getDocs(
collection(db,"fees")
);

feeSnapshot.forEach((doc)=>{

const data = doc.data();

if(data.status === "Paid"){

paid++;

}

else{

pending++;

}

});

document.getElementById(
"paidFees"
).innerHTML =

"Paid Fees : " + paid;

document.getElementById(
"pendingFees"
).innerHTML =

"Pending Fees : " + pending;

}

loadFeeStats();
window.deleteStudent =
async function(id){

const confirmDelete =
confirm(
"Delete Student?"
);

if(confirmDelete){

await deleteDoc(
doc(db,"students",id)
);

alert(
"Student Deleted"
);

location.reload();

}

}