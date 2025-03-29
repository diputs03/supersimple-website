import { signOut } from "firebase/auth";
import { auth } from "firebase.js";

document.getElementById("logout-btn").addEventListener("click", function() {
    // Logout logic (Firebase authentication)
    
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout error: ", error);
    });
});

// Edit Profile
document.getElementById("edit-profile").addEventListener("click", function() {
    document.getElementById("edit-form").classList.toggle("hidden");
});

document.getElementById("save-profile").addEventListener("click", function() {
    const newUsername = document.getElementById("new-username").value;
    const newBio = document.getElementById("new-bio").value;
    
    document.getElementById("username").textContent = newUsername;
    document.getElementById("user-bio").textContent = newBio;
    
    document.getElementById("edit-form").classList.add("hidden");
});

// Load Recent Activities
function loadActivities() {
    const activities = [
        "Posted a new discussion",
        "Commented on a tutorial",
        "Uploaded a new origami creation"
    ];
    
    const activityList = document.getElementById("activity-list");
    activityList.innerHTML = "";
    activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = activity;
        activityList.appendChild(li);
    });
}

export { loadActivities };