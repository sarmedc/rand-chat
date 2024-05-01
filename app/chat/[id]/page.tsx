import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import ChatMessages from "@/components/ChatMessages";

const Chat = async () => {
  const session = await getServerSession(authOptions);

  return <div>{session && <ChatMessages session={session} />}</div>;
};

export default Chat;
