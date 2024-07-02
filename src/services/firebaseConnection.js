// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB74SNvrhXgvh_l1Nu_R07TixtsG6TIgTA",
    authDomain: "labarberia-eacac.firebaseapp.com",
    projectId: "labarberia-eacac",
    storageBucket: "labarberia-eacac.appspot.com",
    messagingSenderId: "108878747338",
    appId: "1:108878747338:web:ac69bccd7f3be8632ec633",
    measurementId: "G-XJK9P6LW0C"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };