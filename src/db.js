import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBsl7xp7oD7KOK0O0kZpQuqSfH9Uy3WEC4',
  authDomain: 'banalite.firebaseapp.com',
  projectId: 'banalite',
  storageBucket: 'banalite.appspot.com',
  messagingSenderId: '785951693710',
  appId: '1:785951693710:web:ff3e1f73d59bd73dace2df',
};

const db = firebase.initializeApp(config);
export default db;
