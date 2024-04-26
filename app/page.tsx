import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StartChatButton from "@components/StartChatButton";

const getUser = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      //cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading user: ", error);
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
        id: user.id,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add user");
    }

    return res.json();
  } catch (error) {
    console.log("Error adding user: ", error);
  }
};

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin?callbackUrl=/");
  }

  const { user } = await getUser(session.user.id);
  // const chatRes = await getChats();

  if (session.user && !user) {
    await addUser(session.user);
  }

  return (
    <div>
      <h1>Rand Chat</h1>
      <StartChatButton />
    </div>
  );
};

export default Home;
