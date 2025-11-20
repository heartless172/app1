const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msgObj) => {
    // Add server timestamp
    msgObj.time = new Date().toLocaleTimeString();
    io.emit("chat message", msgObj);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
