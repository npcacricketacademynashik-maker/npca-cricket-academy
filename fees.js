import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,
collection,
addDoc,
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

const saveFeeBtn =
document.getElementById(
"saveFeeBtn"
);

saveFeeBtn.addEventListener(
"click",

async ()=>{

const name =
document.getElementById(
"studentName"
).value;

const amount =
document.getElementById(
"amount"
).value;
const month =
document.getElementById(
"month"
).value;
const status =
document.getElementById(
"feeStatus"
).value;

await addDoc(
collection(db,"fees"),

{

name,
amount,
month,
status

}

);

alert(
"Fee Saved"
);

loadFees();

});

async function loadFees(){

document.getElementById(
"feeList"
).innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"fees")
);

querySnapshot.forEach((doc)=>{

const data = doc.data();
if(data.status === "Paid"){

totalIncome +=
Number(data.amount);

if(data.month === currentMonth){

monthlyCollection +=
Number(data.amount);

}

}
const div =
document.createElement("div");

div.innerHTML =

`

<hr>

<h3>${data.name}</h3>

<p>Amount : ₹${data.amount}</p>
<p>Month : ${data.month}</p>
<p style="color:
${data.status === 'Paid'
? 'lime'
: 'red'}">

Status : ${data.status}

</p>
<button onclick="toggleFee(
'${doc.id}',
'${data.status}'
)">

Change Status

</button>
`;

document.getElementById(
"feeList"
).appendChild(div);
let totalIncome = 0;

let monthlyCollection = 0;

const currentMonth =
new Date().toLocaleString(
"default",
{ month: "long" }
);
});

}

loadFees();
window.toggleFee =
async function(id,currentStatus){

let newStatus =
"Paid";

if(currentStatus === "Paid"){

newStatus = "Pending";

}

const feeRef =
doc(db,"fees",id);

await updateDoc(feeRef,{

status:newStatus

});

alert(
"Fee Status Updated"
);

location.reload();

}
document.getElementById(
"monthlyCollection"
).innerHTML =

"Monthly Collection : ₹" +
monthlyCollection;

document.getElementById(
"totalIncome"
).innerHTML =

"Total Income : ₹" +
totalIncome;