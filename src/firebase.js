import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASAdbFXinZsuvoDnTBvz8Gu2Mm0sBNYuM",
  authDomain: "tesla-clone-1aed0.firebaseapp.com",
  projectId: "tesla-clone-1aed0",
  storageBucket: "tesla-clone-1aed0.appspot.com",
  messagingSenderId: "572406183071",
  appId: "1:572406183071:web:2d43c1c9d4c5bbb8eb9eaa",
  measurementId: "G-N3H5R2TVEW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;