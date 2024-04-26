import { useParams } from "next/navigation";

const Chat = async () => {
  const { tag, item } = useParams<{ tag: string; item: string }>();

  return (
    <div>
      <h1>Room: ${item}</h1>
    </div>
  );
};

export default Chat;
