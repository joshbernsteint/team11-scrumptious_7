const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("New WS Connection...");
});

const PORT = 3000 || process.env.PORT;

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
