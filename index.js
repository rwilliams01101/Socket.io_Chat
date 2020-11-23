var app = require("express")();
var express = require("express");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.conn.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
