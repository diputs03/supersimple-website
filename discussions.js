import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Discussion Submission
document.getElementById("discussion-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("discussion-title").value.trim();
    const content = document.getElementById("discussion-content").value.trim();

    if (!title || !content) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        await addDoc(collection(db, "discussions"), {
            title: title,
            content: content,
            timestamp: new Date().toISOString()
        });
        alert("Discussion added!");
        document.getElementById("discussion-form").reset();
        loadDiscussions(); // Reload discussions
    } catch (error) {
        console.error("Error adding discussion:", error);
    }
});

// Load Discussions from Firestore
async function loadDiscussions() {
    const discussionsContainer = document.getElementById("discussions-container");
    discussionsContainer.innerHTML = ""; // Clear before loading

    const q = query(collection(db, "discussions"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
        const discussion = docSnap.data();
        const discussionElement = document.createElement("div");
        discussionElement.classList.add("discussion");
        discussionElement.innerHTML = `
            <h3>${discussion.title}</h3>
            <p>${discussion.content}</p>
            <small>Posted on ${new Date(discussion.timestamp).toLocaleString()}</small>
            <div class="comments-section" data-id="${docSnap.id}">
                <h4>Comments</h4>
                <div class="comments-list"></div>
                <input type="text" class="comment-input" placeholder="Write a comment...">
                <button class="comment-btn">Post Comment</button>
            </div>
        `;
        discussionsContainer.appendChild(discussionElement);

        // Load comments for this discussion
        loadComments(docSnap.id);

        // Handle comment submission
        discussionElement.querySelector(".comment-btn").addEventListener("click", async () => {
            const commentInput = discussionElement.querySelector(".comment-input");
            const commentText = commentInput.value.trim();
            if (commentText) {
                await addComment(docSnap.id, commentText);
                commentInput.value = ""; // Clear input
            }
        });
    });
}

// Function to add a comment
async function addComment(discussionId, commentText) {
    try {
        await addDoc(collection(db, `discussions/${discussionId}/comments`), {
            text: commentText,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

// Function to load comments in real-time
function loadComments(discussionId) {
    const commentsList = document.querySelector(`.comments-section[data-id="${discussionId}"] .comments-list`);
    if (!commentsList) return;

    const q = query(collection(db, `discussions/${discussionId}/comments`), orderBy("timestamp", "asc"));
    
    onSnapshot(q, (querySnapshot) => {
        commentsList.innerHTML = ""; // Clear existing comments
        querySnapshot.forEach((docSnap) => {
            const comment = docSnap.data();
            const commentElement = document.createElement("p");
            commentElement.textContent = comment.text;
            commentsList.appendChild(commentElement);
        });
    });
}

// Load discussions on page load
loadDiscussions();
