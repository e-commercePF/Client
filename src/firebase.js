import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyA5LzpimzTuJaqe8-D4RnwiCUeDALk0sBo",
  authDomain: "e-commerce2-a7f7f.firebaseapp.com",
  projectId: "e-commerce2-a7f7f",
  storageBucket: "e-commerce2-a7f7f.appspot.com",
  messagingSenderId: "491792627403",
  appId: "1:491792627403:web:68b31f03bedc0baaf4cd4e",
  measurementId: "G-9464G9LTEP"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth


  const provider = new firebase.auth.GoogleAuthProvider()


  export {auth, provider} 