import { signUp, login } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("auth-modal");
    const loginBtn = document.getElementById("login-btn");
    const closeModal = document.querySelector(".close");

    // Open modal when clicking Login
    loginBtn.addEventListener("click", (event) => {
        event.preventDefault();
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

        await signUp(email, password);
        modal.style.display = "none";
    });

    // Login Event
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        await login(email, password);
        modal.style.display = "none";
    });

    // Guesting Event
    document.getElementsByTagName("guest").addEventListener("submit", async (event) => {
        event.preventDefault();

        await guest();
        modal.style.display = "none";
    })
});
