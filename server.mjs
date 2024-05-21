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
  const rooms = {};
  let socketId;

  const roomSetup = (socket, socketId, room, emitName) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }
    if (!rooms[room].includes(socketId)) {
      rooms[room].push(socketId);
      socket.join(room);
      socket.emit(emitName, room);
    } else socket.emit("alreadyJoinedRoom");
  };

  io.on("connection", (socket) => {
    socketId = socket.id;

    socket.on("joinNewRoom", (room) => {
      console.log("room: ", room);
      roomSetup(socket, socketId, room, "newChatRoom");
    });
    socket.on("joinRoom", (room) => {
      console.log("room: ", room);
      roomSetup(socket, socketId, room, "chatRoom");
    });
    socket.on("sendMessage", (roomId, message, userId) => {
      console.log("id: ", roomId, "message: ", message, "userId: ", userId);
      socket.to(roomId).emit("newMessage", roomId, message, userId);
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
