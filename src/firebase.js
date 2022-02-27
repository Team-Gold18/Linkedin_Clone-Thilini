import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAXNkqYaOlCQCH3-HBUjLkovdnAeDSvyl4",
    authDomain: "linkedin-clone-8e9c4.firebaseapp.com",
    projectId: "linkedin-clone-8e9c4",
    storageBucket: "linkedin-clone-8e9c4.appspot.com",
    messagingSenderId: "644052247520",
    appId: "1:644052247520:web:eea26fa73f4d47dc700185"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db;