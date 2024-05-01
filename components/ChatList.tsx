"use client";

import Link from "next/link";

const ChatList = ({ chatRooms }) => {
  return (
    <div>
      {chatRooms.map((chat, i) => (
        <li key={i}>
          <Link href={`/chat/${chat._id}`}>{chat._id}</Link>
        </li>
      ))}
    </div>
  );
};

export default ChatList;
