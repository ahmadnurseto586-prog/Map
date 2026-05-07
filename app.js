import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCLedUFy6P5s4hjIQ3hnPWKSiisnBNFY5c",
  authDomain: "ihir-a8304.firebaseapp.com",
  projectId: "ihir-a8304",
  storageBucket: "ihir-a8304.firebasestorage.app",
  messagingSenderId: "610938888136",
  appId: "1:610938888136:web:a38e726bcc4af672b8aafd",
  measurementId: "G-JKVE71X25J"
};

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// EMAIL YANG BOLEH
const allowedEmail = "isroyani18@gmail.com";

// LOGIN
window.login = async function(){

  const email = document.getElementById("email").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const nomor = document.getElementById("nomor").value.trim();

  if(!email || !nama || !nomor){
    alert("Lengkapi data");
    return;
  }

  // VALIDASI EMAIL
  if(email !== allowedEmail){
    alert("Email tidak memiliki akses");
    return;
  }

  try{

    // KIRIM KE FIRESTORE
    await addDoc(collection(db, "visitor_data"), {
      email: email,
      nama: nama,
      nomor: nomor,
      waktu: new Date().toISOString()
    });

    // SIMPAN SESSION
    localStorage.setItem("login","true");

    // PINDAH
    document.getElementById("loginPage")
    .classList.add("hidden");

    document.getElementById("actionPage")
    .classList.remove("hidden");

  }catch(err){

    console.error(err);

    alert("Gagal menghubungkan Firebase");
  }
};

// SHOW MAP
window.showLocation = function(){

  document.getElementById("actionPage")
  .classList.add("hidden");

  document.getElementById("loadingScreen")
  .classList.remove("hidden");

  setTimeout(()=>{

    document.getElementById("loadingScreen")
    .classList.add("hidden");

    document.getElementById("mapPage")
    .classList.remove("hidden");

  },3000);
};

// AUTO LOGIN
// RESET SESSION SETIAP WEB DIBUKA
window.onload = ()=>{

  localStorage.clear();

  document.getElementById("loginPage")
  .classList.remove("hidden");

  document.getElementById("actionPage")
  .classList.add("hidden");

  document.getElementById("mapPage")
  .classList.add("hidden");
};

window.toggleNomor = function(){

  const input = document.getElementById("nama");
  const eyeIcon = document.getElementById("eyeIcon");

  if(input.type === "password"){

    input.type = "text";

    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.91 21.91 0 0 1-2.16 3.19"/>
      <path d="M1 1l22 22"/>
    `;

  }else{

    input.type = "password";

    eyeIcon.innerHTML = `
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
};