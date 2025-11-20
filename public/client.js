const socket = io();

// Startup Animation (3 seconds)
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("startup").style.display = "none";
    document.getElementById("profile-setup").style.display = "block";
  }, 3000);
});

let username = "User";
let avatar = "default-avatar.png";

// Profile setup
document.getElementById("start-btn").addEventListener("click", () => {
  const nameInput = document.getElementById("username-input").value.trim();
  const avatarInput = document.getElementById("avatar-input").value.trim();
  if(nameInput) username = nameInput;
  if(avatarInput) avatar = avatarInput;

  document.getElementById("profile-img").src = avatar;
  document.getElementById("username").textContent = username;

  document.getElementById("profile-setup").style.display = "none";
  document.getElementById("chat-app").style.display = "block";
});

// Chat elements
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if(text){
    const msgObj = { user: username, avatar: avatar, text };
    socket.emit("chat message", msgObj);
    input.value = "";
  }
});

// Receive message
socket.on("chat message", (msgObj) => {
  const li = document.createElement("li");

  li.innerHTML = `<strong>${msgObj.user}</strong> <span class="meta">[${msgObj.time}]</span>: ${msgObj.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
