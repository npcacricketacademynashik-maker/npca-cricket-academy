import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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


const registerBtn =
document.getElementById("registerBtn");

registerBtn.addEventListener(
"click",

async () => {

const name =
document.getElementById("name").value;

const parent =
document.getElementById("parent").value;

const photo =
document.getElementById(
"photo"
).files[0];

const reader =
new FileReader();

const dob =
document.getElementById("dob").value;

const mobile =
document.getElementById("mobile").value;

const address =
document.getElementById("address").value;

const role =
document.getElementById("role").value;

const batch =
document.getElementById("batch").value;
const birthDate =
new Date(dob);

const today =
new Date();

let age =
today.getFullYear() -
birthDate.getFullYear();

if (

today.getMonth() <
birthDate.getMonth()

||

(

today.getMonth() ===
birthDate.getMonth()

&&

today.getDate() <
birthDate.getDate()

)

){

age--;

}

let fee = 1200;

if(age >= 10){

fee = 1600;

}
try {
reader.readAsDataURL(photo);

reader.onload =
async ()=>{

const photoURL =
reader.result;
await addDoc(
}
collection(db, "students"),

{

name,
parent,
dob,
mobile,
address,
role,
batch,
fee,
age,
photoURL
}

);

alert(
"Student Registered Successfully"
);

}

catch(error){

alert(error);

}

});
const languageSelect =
document.getElementById(
"languageSelect"
);

languageSelect.addEventListener(
"change",

()=>{

const lang =
languageSelect.value;

if(lang === "mr"){

document.getElementById(
"mainTitle"
).innerHTML =

"🏏 एनपीसीए क्रिकेट अकॅडमी";

}

else{

document.getElementById(
"mainTitle"
).innerHTML =

"🏏 NPCA Cricket Academy";

}

});
.banner{

margin:15px;
padding:30px;
border-radius:20px;
text-align:center;
background:linear-gradient(
135deg,
#0b2347,
#163d77
);

box-shadow:0 0 15px black;

}

.banner h2{

font-size:28px;
color:gold;

}

.banner p{

font-size:18px;
margin-top:10px;

}