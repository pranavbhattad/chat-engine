// Importing Google Firebase OAuth and Creds
import firebase from 'firebase/app';
import "firebase/auth";

// My Personal Firebase Credentials with function auth()
export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyCqlEQJSpoQ6-o5HQ85ppyE-yZ_4AvDKyo",
    authDomain: "chat-engine-737d5.firebaseapp.com",
    projectId: "chat-engine-737d5",
    storageBucket: "chat-engine-737d5.appspot.com",
    messagingSenderId: "492131493972",
    appId: "1:492131493972:web:aa2d0145fc39c5f659e5c1",
    measurementId: "G-JN0QZ4CFCF"
  }).auth();