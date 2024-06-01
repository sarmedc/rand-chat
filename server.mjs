import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  let socketId;

  io.on("connection", (socket) => {
    socketId = socket.id;

    socket.on("joinNewRoom", (room) => {
      console.log("new room: ", room);
      socket.join(room);
      socket.emit("newChatRoom", room);
    });
    socket.on("joinRoom", (room) => {
      console.log("room: ", room);
      socket.join(room);
      socket.emit("chatRoom", room);
    });
    socket.on("leaveRoom", (room) => {
      console.log("room: ", room);
      socket.leave(room);
      socket.emit("leftChatRoom", room);
    });
    socket.on("sendMessage", (roomId, message, userId) => {
      console.log("id: ", roomId, "message: ", message, "userId: ", userId);
      io.in(roomId).emit("newMessage", roomId, message, userId);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
