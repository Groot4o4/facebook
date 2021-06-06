import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAx_SRGIsgpsxwecon-t5CteqOw7rbPXF4",
    authDomain: "facebook-531b2.firebaseapp.com",
    projectId: "facebook-531b2",
    storageBucket: "facebook-531b2.appspot.com",
    messagingSenderId: "880705101794",
    appId: "1:880705101794:web:950c0260cdf7066b80e3bb"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };