// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import {getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCgyGSxc-CSvZt8EeOskOT3SeG7yPEr8Hk",
    authDomain: "blog-9b1eb.firebaseapp.com",
    projectId: "blog-9b1eb",
    storageBucket: "blog-9b1eb.firebasestorage.app",
    messagingSenderId: "88359153105",
    appId: "1:88359153105:web:c18dad27658169cb4404f0",
    measurementId: "G-QCG3C3W64T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  export{
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    signOut,
    onAuthStateChanged
  }