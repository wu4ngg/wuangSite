import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAhhsiDOMxInV6W4UzW9L37095VwrNtQxg",

    authDomain: "quangsite-5361e.firebaseapp.com",

    projectId: "quangsite-5361e",

    storageBucket: "quangsite-5361e.appspot.com",

    messagingSenderId: "519154210929",

    appId: "1:519154210929:web:88a26e40a37bc83ec123d0",

    measurementId: "G-G35ZZHWQE8"
})
export const db = getFirestore(firebaseApp)