import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBp-SxTtmzgxgpE3T7VvT9vLxnwNPBRGZE",
    authDomain: "fir-9-lessons-12847.firebaseapp.com",
    projectId: "fir-9-lessons-12847",
    storageBucket: "fir-9-lessons-12847.appspot.com",
    messagingSenderId: "600069869007",
    appId: "1:600069869007:web:5ded73986f61b023b956ba"
};

// init firebase app
initializeApp( firebaseConfig );

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// Queries
const q = query(colRef, orderBy("createdAt"))

// realtime collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log( books )
}, (error) => {
    console.log( error )
})

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    })
    .then(() => {
        addBookForm.reset();
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
})