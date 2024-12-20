import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

//real time message code
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};
const users = {};
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("hello", users);
  }

  io.emit("getOnline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

export { app, io, httpServer as server };
