// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZv9cr4dl1GkdMI6uzrJnY76jNoIY_jXw",
    authDomain: "chat-website-6c6ab.firebaseapp.com",
    databaseURL: "https://chat-website-6c6ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-website-6c6ab",
    storageBucket: "chat-website-6c6ab.firebasestorage.app",
    messagingSenderId: "408547256158",
    appId: "1:408547256158:web:8ec43bd2a88654855491cf"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("messages");

function sendMessage() {
    const message = document.getElementById("message").value;
    if (message.trim()) {
        db.push().set({ text: message });
        document.getElementById("message").value = "";
    }
}

db.on("child_added", snapshot => {
    const msg = snapshot.val().text;
    const chatBox = document.getElementById("chat-box");
    const p = document.createElement("p");
    p.textContent = msg;
    chatBox.appendChild(p);
});
