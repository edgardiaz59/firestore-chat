// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1uDPmTH3OZmSdRYLwtdwuq_Tjsf0dYrg",
  authDomain: "mcc2134-firestore-ediaz.firebaseapp.com",
  projectId: "mcc2134-firestore-ediaz",
  storageBucket: "mcc2134-firestore-ediaz.appspot.com",
  messagingSenderId: "37022920466",
  appId: "1:37022920466:web:a4b9db2e9fbf7daa7d4dcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}