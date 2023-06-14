// database/firebaseDb.js

import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAeDDin5i0LuS0YetUbl8kjEj9lysJL4oU",
  authDomain: "dbpurple-a676a.firebaseapp.com",
  projectId: "dbpurple-a676a",
  storageBucket: "dbpurple-a676a.appspot.com",
  messagingSenderId: "545423791058",
  appId: "1:545423791058:web:1ab1daf552b7cebc66ee0b"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;