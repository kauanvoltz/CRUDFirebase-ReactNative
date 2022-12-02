import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc,getDocs ,doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdy7GZPS7cwZGhGXtXkkv01jXTN2OCmks",
  authDomain: "shopping-app-yt-16d42.firebaseapp.com",
  projectId: "shopping-app-yt-16d42",
  storageBucket: "shopping-app-yt-16d42.appspot.com",
  messagingSenderId: "369449406903",
  appId: "1:369449406903:web:a2d77c8fd6528126471832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app,db, getFirestore,collection, addDoc,getDocs,doc, updateDoc }
