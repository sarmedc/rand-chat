"use client";
import { socket } from "../socket";
import { useRouter } from "next/navigation";

const createNewRoom = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create chat room");
    }

    return res.json();
  } catch (error) {
    console.error("Error creating chat room: ", error);
  }
};

const updateRoom = async (userId, roomId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newUser: userId,
        newMessage: [],
        isNewUser: true,
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

const findAvailableChat = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats`);

    if (!res.ok) {
      throw new Error("Failed to find chat rooms");
    }

    return res.json();
  } catch (error) {
    console.error("Error finding chat rooms: ", error);
  }
};

const findAvailableRoom = (rooms, id) => {
  return rooms.find(
    (room) => room.users.length < 2 && !room.users.includes(id)
  );
};

const StartChatButton = ({ session, userId }) => {
  const router = useRouter();

  const handleCreateChat = async () => {
    const { chatRooms } = await findAvailableChat();
    const availableRoom = await findAvailableRoom(chatRooms, userId);
    let newRoom;

    if (availableRoom) newRoom = await updateRoom(userId, availableRoom?._id);
    else newRoom = await createNewRoom(userId);
    socket.emit("joinRoom", newRoom?.id);
  };

  socket.on("newChatRoom", (room) => {
    console.log("Received new room:", room);
    router.push(`/chat/${room}`);
  });

  // useEffect(() => {
  // }, []);

  return (
    <>
      {session && <button onClick={handleCreateChat}>Start Random Chat</button>}
    </>
  );
};

export default StartChatButton;
