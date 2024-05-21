"use client";
import { useParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { getChatMessages, updateMessages } from "@components/api/chat";

const constructMessages = (a, b) => {
  let i = 0,
    j = 0;
  let res = [];

  while (i < a.length && j < b.length) {
    let tsA = new Date(a[i].timestamp),
      tsB = new Date(b[j].timestamp);
    res.push(tsA <= tsB ? a[i++] : b[j++]);
  }

  while (i < a.length) {
    res.push(a[i++]);
  }

  while (j < b.length) {
    res.push(b[j++]);
  }

  return res;
};

const ChatMessages = ({ session, userId }) => {
  const { id } = useParams();
  if (!session) {
    redirect(`/signin?callbackUrl=/chat/${id}`);
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", id);
  }, [id]);

  useEffect(() => {
    getMessages(userId);

    async function getMessages(userId) {
      const {
        chatRooms: { messages },
      } = await getChatMessages(userId);
      console.log(messages);
      const users = Object.keys(messages);
      const userMsgA = messages[users[0]];
      const userMsgB = messages[users[1]];

      setMessages(constructMessages(userMsgA, userMsgB));
    }
  }, [userId]);

  const handleNewMessage = async (roomId, msg, userId) => {
    console.log("handle new message");
    await updateMessages(roomId, msg, userId);
    setMessages([...messages, msg]);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      socket.emit(
        "sendMessage",
        id.toString(),
        {
          message: e.target.value,
          timestamp: new Date().toISOString(),
        },
        userId.toString()
      );
    }
  };

  socket.on("newMessage", (roomId, msg, userId) => {
    console.log(roomId, id);
    if (roomId === id) handleNewMessage(roomId, msg, userId);
  });

  return (
    <div>
      <h1>Room: {id}</h1>
      {messages.map((msg, i) => (
        <div key={i}>{msg.message}</div>
      ))}
      <input type="text" placeholder="Chat" onKeyDown={handleSubmit} />
    </div>
  );
};

export default ChatMessages;
