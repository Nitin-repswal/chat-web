import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZv9cr4dl1GkdMI6uzrJnY76jNoIY_jXw",
    authDomain: "chat-website-6c6ab.firebaseapp.com",
    databaseURL: "https://chat-website-6c6ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-website-6c6ab",
    storageBucket: "chat-website-6c6ab.appspot.com",
    messagingSenderId: "408547256158",
    appId: "1:408547256158:web:8ec43bd2a88654855491cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "messages");

// Secret Key (Change This)
const secretKey = "friend123"; 

// Function to check access
window.checkAccess = function () {
    const enteredKey = document.getElementById("secret-key").value.trim();
    if (enteredKey === secretKey) {
        document.getElementById("access-section").style.display = "none";
        document.getElementById("chat-container").style.display = "block";
    } else {
        alert("Access Denied! Wrong secret key.");
    }
};

// Get or Set Username
let username = localStorage.getItem("chat_username") || "";

// Function to Save Username
window.saveUsername = function () {
    const usernameInput = document.getElementById("username").value.trim();
    if (usernameInput) {
        username = usernameInput;
        localStorage.setItem("chat_username", username);
        document.getElementById("username-section").style.display = "none";
    }
};

// Hide Username Input If Already Set
if (username) {
    document.getElementById("username-section").style.display = "none";
}

// Send Message
window.sendMessage = function () {
    if (!username) {
        alert("Please set a username first!");
        return;
    }

    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();

    if (message) {
        push(dbRef, { user: username, text: message, timestamp: new Date().toLocaleTimeString() })
            .then(() => console.log("Message sent!"))
            .catch(error => console.error("Error sending message:", error));

        messageInput.value = "";
    }
};

// Display Messages
onChildAdded(dbRef, (snapshot) => {
    const msgData = snapshot.val();
    const chatBox = document.getElementById("chat-box");

    // Create a message div
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");

    // Determine if the message is from the user or a friend
    if (msgData.user === username) {
        msgDiv.classList.add("user");
    } else {
        msgDiv.classList.add("friend");
    }

    // Set message text
    msgDiv.innerHTML = `<strong>${msgData.user}</strong>: ${msgData.text} <span class="timestamp">${msgData.timestamp}</span>`;



    // Append to chat box
    chatBox.appendChild(msgDiv);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});
