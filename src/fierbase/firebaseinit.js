import firebase from 'firebase/compat/app'
//import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/messaging'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAD3yLpJxg9iwpanxNybDbSX2hKq0Z2ou8",
    authDomain: "selinjobs.firebaseapp.com",
    databaseURL: "https://selinjobs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "selinjobs",
    storageBucket: "selinjobs.appspot.com",
    messagingSenderId: "9389977769",
    appId: "1:9389977769:web:7fb70644d3fc639ba539b8",
    measurementId: "${config.measurementId}"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
    //console.log(firebaseApp);
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { timestamp }

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export default firebaseApp.firestore()