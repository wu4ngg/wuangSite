import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, getDocs, query, where, getDoc, setDoc, addDoc, deleteDoc, doc, collection } from 'firebase/firestore'
import Project from '../src/model/project'
import Desc from '../src/model/desc'
import User from '../src/model/user'
import { getStorage, ref, getDownloadURL, uploadString, uploadBytesResumable, deleteObject } from 'firebase/storage'
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAhhsiDOMxInV6W4UzW9L37095VwrNtQxg",

    authDomain: "quangsite-5361e.firebaseapp.com",

    projectId: "quangsite-5361e",

    storageBucket: "quangsite-5361e.appspot.com",

    messagingSenderId: "519154210929",

    appId: "1:519154210929:web:88a26e40a37bc83ec123d0",

    measurementId: "G-G35ZZHWQE8"
})
export const auth = getAuth()
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
    const q = query(col, where('isFeatured', '==', true))
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
    var lang_frontend = [];
    for(var l of e.lang_frontend){
        lang_frontend.push(l.name)
    }
    var lang_backend = [];
    for(var l1 in e.lang_backend){
        lang_backend.push(l.name)
    }
    lang_backend = lang_backend.join(", ")
    lang_frontend = lang_frontend.join(", ")
    let list = []
    list.push(new Desc('Front-end Technologies: '+lang_frontend, "ri-code-s-slash-line"))
    list.push(new Desc('Back-end Technologies: '+lang_backend, "ri-code-s-slash-line"))
    list.push(new Desc('Goal: ' + e.goal, "ri-focus-3-line"))
    list.push(new Desc('Status: ' + e.status, getStatusIcon(e.status)))
    console.log(list)
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
    const p = await getSingleProject(id)
    list = p.credits
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
/*
creds = {
    email: String,
    password: String
}
*/
export async function login(creds){
    return await signInWithEmailAndPassword(auth, creds.email, creds.password)
}
export async function getUsers(){
    let res = []
    const col = collection(db, 'users')
    const snap = await getDocs(col)
    res = snap.docs.map(e => e.data())
    return res;
}
export async function getUsersWithId(){
    let res = []
    const col = collection(db, 'users')
    const snap = await getDocs(col)
    snap.forEach((e) => {
        res.push({
            id: e.id,
            fullname: e.data().fullname,
            github: e.data().github,
            nickname: e.data().nickname
        })
    })
    return res
}
export async function logOut(){
    return await signOut(auth)
}
function getType(type, value){
    switch(type){
            case "edu":
                return value;
            case "eng":
                return "IELTS Band: " + value;
            case "goal":
                return "Goal: " + value;
            default:
                return "Interests: " + value;
        }
}
function getIcon(type){
    switch(type){
        case "edu":
            return "ri-graduation-cap-line";
        case "eng":
            return "ri-global-line";
        case "goal":
            return "ri-flag-2-line";
        default:
            return "ri-thumb-up-line";
    }
}
export async function GetInfo(){
    var l = [];
    const infoCollection = collection(db, 'info')
    const snapshot = await getDocs(infoCollection)
    const catelist = snapshot.docs.map(doc => doc.id)
    const list = snapshot.docs.map(doc => doc.data())
    for(var i = 0; i < list.length; i++){
        l.push(new Desc(getType(catelist[i], list[i].value), getIcon(catelist[i])))
    }
    console.log(l)
    return l;
}
export async function updateInfo(arr){
    for await (var i of arr){
        console.log(i.id)
        if(i.id != ''){
            await setDoc(doc(db, 'info', i.id), {
                value: i.editable
            })
        }
        
    }
}
export const storage = getStorage()
export async function uploadFile(url, callback, complete_callback){
    var dl_url;
    var date = new Date()
    
    var name = date.getTime()
    var filename = url.name.split('.')
    var extension = "." + filename[filename.length - 1]
    console.log(extension)
    name = name + extension
    const sto = ref(storage, 'images/'+String(name))
    const task = uploadBytesResumable(sto, url)
    const res = await task.on('state_changed', callback, e => {
        console.log('error')
    }, () => {
        getDownloadURL(task.snapshot.ref).then(e => {
            console.log('Completed with url: ' + e)
            dl_url = e
            return dl_url
        })
    })
    
    return task
}
export async function uploadLang(obj){
    var col = collection(db, 'prog_languages')
    return await addDoc(col, obj)
}
export async function getLang(type){
    var l = []
    var col = collection(db, 'prog_languages')
    var snap = await getDocs(col)
    snap.forEach(e => {
        l.push({
            id: e.id,
            img: e.data().img,
            name: e.data().name,
            type: e.data().type,
            file_name: e.data().file_name,
            isBeingDeleted: false,
            isSelected: false,
        })
    })
    return l
}
export async function delLang(id){
    var docu = doc(db, 'prog_languages', id)
    return await deleteDoc(docu)
}
export async function delFile(name){
    var refer = ref(storage, 'images/'+name)
    return await deleteObject(refer)
}
export async function insertProject(obj){
    var col = collection(db, 'projects')
    addDoc(col, obj)
}