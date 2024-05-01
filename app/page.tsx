import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StartChatButton from "@components/StartChatButton";
import ChatList from "@/components/ChatList";

const getUser = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${email}`, {});

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading user: ", error);
  }
};

const getChats = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/chats?id=${id}`, {});

    if (!res.ok) {
      throw new Error("Failed to fetch chats");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading chats: ", error);
  }
};

const addUser = async (user) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add user");
    }

    return res.json();
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { user } = await getUser(session.user.email);
  const { chatRooms } = await getChats(user._id);

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
