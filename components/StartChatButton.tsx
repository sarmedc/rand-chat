"use client";
import { socket } from "../socket";
import { useRouter } from "next/navigation";
import {
  createNewRoom,
  updateRoom,
  findAvailableChat,
} from "@/components/api/chat";

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

    socket.emit("joinNewRoom", newRoom?.id);
  };

  socket.on("newChatRoom", (room) => {
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
