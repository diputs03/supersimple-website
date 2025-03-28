import { signUp, login } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("auth-modal");
    const loginBtn = document.getElementById("login-btn");
    const closeModal = document.querySelector(".close");

    // Open modal when clicking Login
    loginBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent page from jumping to top
        modal.style.display = "flex";
    });

    // Close modal when clicking the 'X' button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the content box
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Signup Event
    document.getElementById("signup-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        try {
            await signUp(email, password);
            alert("Signup successful!");
            modal.style.display = "none"; // Close modal on successful signup
        } catch (error) {
            alert(error.message);
        }
    });

    // Login Event
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            await login(email, password);
            alert("Login successful!");
            modal.style.display = "none"; // Close modal on successful login
        } catch (error) {
            alert(error.message);
        }
    });
});
