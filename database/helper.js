import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore'
import Project from '../src/model/project'
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
export async function getProjects() {
    var l = [];
    const infoCollection = collection(db, 'projects')
    const snapshot = await getDocs(infoCollection)
    const catelist = snapshot.docs.map(doc => doc.id)
    const list = snapshot.docs.map(doc => doc.data())
    list.forEach(e => {
        l.push(new Project(e.image, e.desc, e.name))
    })
    console.log(l)
    return l;
}
export async function getFeaturedProjects(){
    var l = []
    const col = collection(db, 'projects')
    const q = query(col, where('isfeatured', '==', true))
    const snap = await getDocs(q)
    const list = snap.docs.map(doc => doc.data())
    const idList = snap.docs.map(doc => doc.id)
    list.forEach((e, index) => {
        l.push(new Project(e.image, e.desc, e.name, idList[index]))
    })
    console.log(list)
    return l
}
export async function getSingleProject(id){
    const col = collection(db, 'projects')
    const data = await getDoc(doc(db, 'projects', id))
    console.log(data.data())
    return data.data()
}