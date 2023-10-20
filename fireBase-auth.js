// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7vpXCunpiy8HB-xgWzTl9N_SeelpKODw",
  authDomain: "db-firebase-4faba.firebaseapp.com",
  projectId: "db-firebase-4faba",
  storageBucket: "db-firebase-4faba.appspot.com",
  messagingSenderId: "89013722391",
  appId: "1:89013722391:web:491210a3afc04845eceb52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
};
