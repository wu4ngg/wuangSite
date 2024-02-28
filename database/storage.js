import { ref, uploadString } from "firebase/storage";
import { firebaseApp } from "./helper";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
const app = initializeApp({
    apiKey: "",

    authDomain: "quangsite-5361e.firebaseapp.com",

    projectId: "quangsite-5361e",

    storageBucket: "quangsite-5361e.appspot.com",

    messagingSenderId: "519154210929",

    appId: "",

    measurementId: ""
})
