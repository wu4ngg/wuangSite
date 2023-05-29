import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore'
import Project from '../src/model/project'
import Desc from '../src/model/desc'
import User from '../src/model/user'
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
export async function convertInfo(id){
    const e = await getSingleProject(id)
    let list = []
    list.push(new Desc('Front-end Technologies: '+e.frontend, "ri-code-s-slash-line"))
    list.push(new Desc('Back-end Technologies: '+e.backend, "ri-code-s-slash-line"))
    list.push(new Desc('Goal: ' + e.goal, "ri-focus-3-line"))
    list.push(new Desc('Status: ' + e.status, getStatusIcon(e.status)))
    return list
}
function getStatusIcon(status){
    switch(status){
        case "Failed":
            return "ri-close-circle-line"
        case "Completed":
            return "ri-check-line";
        case "WIP":
            return "ri-loader-line"
        default:
            return "ri-question-mark"
                
    }
}
export async function getCredits(id){
    let list
    let res = []
    const col = collection(db, 'projects', id, 'credits')
    const snap = await getDocs(col)
    list = snap.docs.map(e => e.data())
    console.log(list)  
    for await (const el of list){
        let e = await getUser(el.id)
        res.push(new Desc(e.fullname + `, Roles: ${el.role}`, 'ri-user-line', e.github))
    }
    
    return res
        
}
async function getUser(id){
    const data = doc(db, 'users', id)
    const snap = await getDoc(data)
    console.log(snap.data())
    return snap.data()
}