import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import "./config/mongo.js";
import chatRoomRoutes from "./routes/chatRoom.js";
import chatMessageRoutes from "./routes/chatMessage.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// API Endpoint
app.use("/uploads", express.static("uploads"));
app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);
app.use("/api/user", userRoutes);

// Server Port
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Client Port

// Uncomment this to run on local server
// const originURL = "http://localhost:3000";

// Uncomment this to run on render.com
const originURL = "https://chathub-client.onrender.com";

const io = new Server(server, {
  cors: {
    origin: originURL,
    credentials: true,
  },
});

global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
    socket.emit("getUsers", Array.from(onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, message, image }) => {
    const sendUserSocket = onlineUsers.get(receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("getMessage", {
        senderId,
        message,
        image,
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(getKey(onlineUsers, socket.id));
    socket.emit("getUsers", Array.from(onlineUsers));
  });
});
