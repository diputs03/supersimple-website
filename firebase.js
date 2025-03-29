import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
require('dotenv').config();

console.log(process.env)

const firebaseConfig = {
    apiKey: process.env.FIRE_BASE_API_KEY,
    authDomain: process.env.FIRE_BASE_PROJECT_ID+".firebaseapp.com",
    projectId: process.env.FIRE_BASE_PROJECT_ID,
    storageBucket: process.env.FIRE_BASE_PROJECT_ID+".appspot.com",
    messagingSenderId: process.env.FIRE_BASE_MESSENGER_ID,
    appId: process.env.FIRE_BASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// **Sign Up Function**
async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date().toISOString()
        });

        alert("Signup successful! You can now log in.");
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered. Please log in.");
        } else {
            console.error("Signup Error:", error.message);
            alert(error.message);
        }
    }
}

// **Login Function**
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
    } catch (error) {
        if (error.code === "auth/wrong-password") {
            alert("Incorrect password.");
        } else if (error.code === "auth/user-not-found") {
            alert("No user found with this email. Please sign up.");
        } else {
            console.error("Login Error:", error.message);
            alert(error.message);
        }
    }
}

// **Guest Function**
async function guest() {
    await NaN;
    alert("Viewing as guest!");
}

// **Logout Function**
async function logout() {
    await signOut(auth);
    alert("Logged out successfully.");
}

// **Check Login State**
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById("login-btn");
    if (user) {
        loginBtn.textContent = user.email+" Logout";
        loginBtn.addEventListener("click", logout);
    } else {
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", () => {
            document.getElementById("auth-modal").style.display = "flex";
        });
    }
});

// **Export Functions**
export { signUp, login, logout };
