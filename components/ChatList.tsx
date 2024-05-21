"use client";
import Link from "next/link";
import { socket } from "../socket";

const ChatList = ({ chatRooms }) => {
  const handleChatLink = (id) => {
    socket.emit("joinRoom", id);
  };

  return (
    <div>
      {chatRooms.map((chat, i) => (
        <li key={i}>
          <Link
            href={`/chat/${chat._id}`}
            onClick={() => handleChatLink(chat._id)}
          >
            {chat._id}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default ChatList;
