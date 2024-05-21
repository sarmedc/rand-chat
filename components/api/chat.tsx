import { api } from "./helper";

export const getChatMessages = async (id, isMulti = false) => {
  return api(
    `http://localhost:3000/api/chats?id=${id}&isMulti=${isMulti}`,
    {},
    "Failed to fetch chats"
  );
};

export const createNewRoom = async (id) => {
  return api(
    `http://localhost:3000/api/chats`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    },
    "Failed to create new chat room"
  );
};

export const updateRoom = async (userId, roomId) => {
  return api(
    `http://localhost:3000/api/chats/${roomId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newUser: userId,
        newMessage: [],
        isNewUser: true,
      }),
    },
    "Failed to update chat room"
  );
};

export const updateMessages = async (roomId, newMessage, newUser) => {
  console.log("update messages");
  return api(
    `http://localhost:3000/api/chats/${roomId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newUser,
        newMessage,
        isNewUser: false,
      }),
    },
    "Failed to update chat room"
  );
};

export const findAvailableChat = async () => {
  return api(
    `http://localhost:3000/api/chats`,
    {},
    "Failed to find chat rooms"
  );
};
