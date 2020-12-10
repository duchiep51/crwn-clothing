import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBuh_XUVFzU3_6ZzaOeBpu2i9cBahPWbGU",
    authDomain: "clwn-clothing-8618c.firebaseapp.com",
    databaseURL: "https://clwn-clothing-8618c.firebaseio.com",
    projectId: "clwn-clothing-8618c",
    storageBucket: "clwn-clothing-8618c.appspot.com",
    messagingSenderId: "130253109164",
    appId: "1:130253109164:web:6aa8666e8619d11b67ec09"
  };

  export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        });

      } catch(error) {
        console.log('error createing user: ' + error.message);
      }
    }
    
    return userRef;
  } 
  
  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;