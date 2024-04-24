import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

const getUser = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users?id=${id}`, {
      //cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json() || { users: [] };
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
        id: user.id,
        role: user.role,
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
  const userRes = await getUser(session.user.id);
  console.log(userRes);
  const { users } = userRes;
  console.log("SESSION: ", session, "users:", users);
  if (users.length === 0 && session.user) {
    await addUser(session.user);
  }

  // const handleCreateChat = () => {
  //   const chat = {
  //     id: uuidv4(),
  //     topic: "test",
  //     users: ['1'],
  //     messages: [],
  //   };
  //   setChats((chats) => [...chats, chat]);
  // };
  return (
    <div>
      <h1>Rand Chat</h1>
      <button>Start a random chat</button>
    </div>
  );
};

export default Home;
