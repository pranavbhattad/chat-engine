// Importing Google Firebase OAuth and Creds
import firebase from 'firebase/app';
import "firebase/auth";

// My Personal Firebase Credentials with function auth()
export const auth = firebase.initializeApp ({
// Your Credential from Firebase.com
// From apiKey to Measurement I only, dont copy other things
  }).auth();