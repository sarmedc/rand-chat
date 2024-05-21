import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import ChatMessages from "@/components/ChatMessages";
import { getUser } from "@/components/api/user";
import { redirect } from "next/navigation";

const Chat = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { user } = await getUser(session.user.email);

  return (
    <div>
      {session && <ChatMessages session={session} userId={user?._id} />}
    </div>
  );
};

export default Chat;
