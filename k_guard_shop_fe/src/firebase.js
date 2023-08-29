// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUxkwPA5w_kN0OoaH6kmewJoqtT9T3bOA",
    authDomain: "k-guard-shop.firebaseapp.com",
    projectId: "k-guard-shop",
    storageBucket: "k-guard-shop.appspot.com",
    messagingSenderId: "169693170233",
    appId: "1:169693170233:web:4deb9195817206ff925be8",
    measurementId: "G-PFB1N3BV6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);