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
    getDoc,
    updateDoc,
} from 'firebase/firestore'

import { 
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBp-SxTtmzgxgpE3T7VvT9vLxnwNPBRGZE",
    authDomain: "fir-9-lessons-12847.firebaseapp.com",
    projectId: "fir-9-lessons-12847",
    storageBucket: "fir-9-lessons-12847.appspot.com",
    messagingSenderId: "600069869007",
    appId: "1:600069869007:web:5ded73986f61b023b956ba"
};

// init firebase app
const app = initializeApp( firebaseConfig );

// init services
const db = getFirestore(app)
const auth = getAuth(app)

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

// Updating documents
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateBookForm.id.value)

    updateDoc(docRef, {
        title: updateBookForm.title.value
    }).then(() => {
        updateBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, 'books', 'pwnEFZzMBmzJ0j12JbnC')

getDoc(docRef)
    .then((doc) => {
        console.log( doc.data(), doc.id )
    })

onSnapshot(docRef, (snapshot) => {
    console.log( snapshot.data(), snapshot.id )
}, (error) => {
    console.log( error )
})

// create a new user
const createUserForm = document.querySelector('.user')
createUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let email = createUserForm.email.value
    let password = createUserForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log( 'User Created: ', cred.user )
            createUserForm.reset()
        })
        .catch((error) => {
            console.log( error.message )
        })
})

// Login a user
const loginUserForm = document.querySelector(".login")
loginUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginUserForm.email.value
    const password = loginUserForm.password.value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Logged In', userCredential.user)
        })
        .catch(error => {
            console.log( error.code )
            console.log( error.message )
        })
})


// Logout a User
const logoutUserBtn = document.querySelector('.logout')
logoutUserBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('The User Signed out')
        })
        .catch((error) => {
            console.log( error.code )
            console.log( error.message )
        })
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User: ', user)
    } else {
        console.log('User: ', user)
    }
})