import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCTQFfDc26pz9-wRQfrIs33pJBGhxEfZlg",
    authDomain: "kouple-8b7f5.firebaseapp.com",
    databaseURL: "https://kouple-8b7f5.firebaseio.com",
    projectId: "kouple-8b7f5",
    storageBucket: "kouple-8b7f5.appspot.com",
    messagingSenderId: "450444838321",
    appId: "1:450444838321:web:126c699eafcf388008a990",
    measurementId: "G-T4SC3PW60E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
