import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCchsHSeDd3_-VVNrOVcSBKbx3i9q-PJaI",
    authDomain: "strangers-chat-c7f74.firebaseapp.com",
    projectId: "strangers-chat-c7f74",
    storageBucket: "strangers-chat-c7f74.appspot.com",
    messagingSenderId: "808991953130",
    appId: "1:808991953130:web:7de94e46d9b420d2124793"
  };

// if(firebase.app.length === 0) {
//     // Initialize Firebase
// }
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;