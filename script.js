// Import Firebase modules (Firebase v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your Firebase Configuration
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

// Send Message
window.sendMessage = function () {
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
    if (message) {
        push(dbRef, { text: message })
            .then(() => console.log("Message sent!"))
            .catch(error => console.error("Error sending message:", error));
        messageInput.value = "";
    }
};

// Display Messages
onChildAdded(dbRef, (snapshot) => {
    const msg = snapshot.val().text;
    const chatBox = document.getElementById("chat-box");
    const p = document.createElement("p");
    p.textContent = msg;
    chatBox.appendChild(p);
});
