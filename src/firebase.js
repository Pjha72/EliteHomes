// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBotXtGrOQRkiDRtgSFf4fgXOQeNo88-M0",
    authDomain: "realtor-clone-react-28908.firebaseapp.com",
    projectId: "realtor-clone-react-28908",
    storageBucket: "realtor-clone-react-28908.appspot.com",
    messagingSenderId: "783435303506",
    appId: "1:783435303506:web:9ec89855a884bca32ded8b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()