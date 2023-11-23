const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const gameRooms = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} joined room ${data} `);
  });

  socket.on("make_move", ({ index, symbol, room }) => {
    // Broadcast the move to all clients in the room
    io.to(room).emit("move_made", { index, symbol });
  });

  socket.on("restart_game", ({ room }) => {
    // Broadcast the restart event to all clients in the room
    io.to(room).emit("game_restart");
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    // socket.broadcast.emit("receive_message",data)
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
