import firebase from "firebase";
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCKSCH6Ncws9kPSEMap0PUdTFGjlwv6QjA",
    authDomain: "fir-de97f.firebaseapp.com",
    projectId: "fir-de97f",
    storageBucket: "fir-de97f.appspot.com",
    messagingSenderId: "371919461750",
    appId: "1:371919461750:web:4abb1e62e07b448133ee57"
})
export const auth = app.auth();
export default app;