import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StartChatButton from "@components/StartChatButton";
import ChatList from "@/components/ChatList";
import { getUser, addUser } from "@/components/api/user";
import { getChatMessages } from "@/components/api/chat";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { user } = await getUser(session.user.email);
  const { chatRooms } = await getChatMessages({ id: user._id, isMulti: true });

  if (session.user && !user) {
    await addUser(session.user);
  }

  return (
    <div>
      <h1>Rand Chat</h1>
      <StartChatButton session={session} userId={user?._id} />
      <ChatList chatRooms={chatRooms} />
    </div>
  );
};

export default Home;
