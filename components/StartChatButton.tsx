"use client";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { socket } from "../socket";
import { redirect } from "next/navigation";

const createNewRoom = async (user) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create chat room");
    }

    return res.json();
  } catch (error) {
    console.log("Error creating chat room: ", error);
  }
};

const findAvailableChat = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats`);

    if (!res.ok) {
      throw new Error("Failed to find chat rooms");
    }

    return res.json();
  } catch (error) {
    console.log("Error finding chat rooms: ", error);
  }
};

const findAvailableRoom = (rooms) => {
  return rooms.find((room) => room.users.length < 2);
};

const StartChatButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleCreateChat = async () => {
    const { chatRooms } = await findAvailableChat();
    const availableRoom = await findAvailableRoom(chatRooms);

    let newRoom;
    if (availableRoom && session?.user?.id !== availableRoom.id)
      newRoom = availableRoom.id;
    else newRoom = await createNewRoom(session?.user);
    socket.emit("createChat", newRoom);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Replace with your server URL

    socket.on("newChatRoom", (room) => {
      console.log("Received new room:", room);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      {session && <button onClick={handleCreateChat}>Start Random Chat</button>}
    </>
  );
};

export default StartChatButton;
