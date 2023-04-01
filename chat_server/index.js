const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  let { roomId } = socket.handshake.query;
  await socket.join(roomId);
  // console.log("new client connected", socket.id, "to room", roomId);

  socket.on("user_join", (name, room) => {
    // console.log("A user joined " + roomId + " their name is " + name);
    socket.to(roomId).emit("user_join", name);
  });

  socket.on("message", ({ name, message }, room) => {
    // console.log(name, message, socket.id, roomId);
    io.to(roomId).to(socket.id).emit("message", { name, message });
  });

  socket.on("user_leave", (name, room) => {
    socket.to(roomId).emit("user_leave", name);
    // socket.leave(roomId);
  });

  socket.on("disconnect", (reason, name) => {
    // io.to(roomId).emit("user_leave", name);
    socket.leave(roomId);
    console.log("Disconnected from " + roomId);
  });
});

let PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log(`Chat server listening on Port: ${PORT}`);
});
