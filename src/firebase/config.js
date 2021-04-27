import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAN8w4ObNYQEXSgVjsDkmqSYlFhxv7jW2k",
  authDomain: "countrycity-8c815.firebaseapp.com",
  projectId: "countrycity-8c815",
  storageBucket: "countrycity-8c815.appspot.com",
  messagingSenderId: "640303431218",
  appId: "1:640303431218:web:5710681311e7205602c62b",
  measurementId: "G-P0TZ0ZC70L",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const firestore = firebase.firestore();

export { database, firestore };
