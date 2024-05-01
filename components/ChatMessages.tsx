"use client";
import { useParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "../socket";

const getChatMessages = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats/${id}`, {});

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading user: ", error);
  }
};

const updateMessages = async (roomId, newMessage, newUser) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newUser,
        newMessage,
        isNewUser: false,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update chat room");
    }

    return res.json();
  } catch (error) {
    console.error("Error updating chat room: ", error);
  }
};

const constructMessages = (a, b) => {
  return [];
};

const ChatMessages = ({ session }) => {
  const { id } = useParams();
  if (!session) {
    redirect(`/signin?callbackUrl=/chat/${id}`);
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(id);

    async function getMessages(id) {
      const {
        chatRoom: { messages },
      } = await getChatMessages(id);
      const users = Object.keys(messages);
      const userMsgA = messages[users[0]];
      const userMsgB = messages[users[1]];

      setMessages(constructMessages(userMsgA, userMsgB));
    }
  }, [id]);

  const handleNewMessage = async (roomId, msg) => {
    await updateMessages(roomId, msg);
    setMessages([...messages, msg]);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      socket.emit("sendMessage", id.toString(), {
        message: e.target.value,
        timestamp: new Date().toISOString(),
      });
    }
  };

  socket.on("newMessage", (roomId, msg) => {
    if (roomId === id) handleNewMessage(roomId, msg);
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
