import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr3EB5UT4yGzDtt5zOfN1DghRkparwwqE",
    authDomain: "video-6aa42.firebaseapp.com",
    projectId: "video-6aa42",
    storageBucket: "video-6aa42.appspot.com",
    messagingSenderId: "23583398874",
    appId: "1:23583398874:web:ae0580de1f2c2cf6037ee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;