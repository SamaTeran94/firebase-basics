// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDijXGvAIfljJt8WZ6xpsHUznO72eLqbr4",
    authDomain: "fir-course-35716.firebaseapp.com",
    projectId: "fir-course-35716",
    storageBucket: "fir-course-35716.appspot.com",
    messagingSenderId: "935815918600",
    appId: "1:935815918600:web:5e4a683717ba8146ca8dbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)