const express = require("express");
const http = require("http");
const helmet = require("helmet");
const morgon = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const socket = require("socket.io");

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const conversationRoute = require("./routes/conversationoutes");
const messageRoute = require("./routes/messageRoutes");

dotenv.config({ path: "./config.env" });
require("./db/config");

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type,userid");
  res.set("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
// app.use(helmet());
// app.use(morgon("combined"));
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);
app.use("/api/v1/", conversationRoute);
app.use("/api/v1", messageRoute);

const server = http.createServer(app);
let users = [];

const addNewuser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((ele) => ele.userId === receiverId);
};

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user is connected to backend socket server");
  socket.on("addUser", (userId) => {
    addNewuser(userId, socket.id);
    console.log("home", users);
    io.emit("getAllUsers", users);

    socket.on("disconnect", () => {
      console.log("a user is disconnected");
      removeUser(socket.id);
    });

    socket.on("sendmessage", ({ senderId, receiverId, text }, callback) => {
      const user = getUser(receiverId);
      console.log(text);
      io.to(user.socketId).emit("getmessages", {
        senderId,
        text,
      });
      callback("message delivered");
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log(process.env.PORT + " is running");
});

module.exports = server;
