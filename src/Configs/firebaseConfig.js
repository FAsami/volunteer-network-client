import 'firebase/storage'
import * as firebase from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCUvyR_eXWA1BL5ODNzcXw9TRgz2NfTmPU",
    authDomain: "volunteer-network-fasami.firebaseapp.com",
    databaseURL: "https://volunteer-network-fasami.firebaseio.com",
    projectId: "volunteer-network-fasami",
    storageBucket: "volunteer-network-fasami.appspot.com",
    messagingSenderId: "796366799146",
    appId: "1:796366799146:web:c027c10500081de6d0de53"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();