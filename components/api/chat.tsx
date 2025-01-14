import { api } from "./helper";

export const getChatMessages = async ({ id, isMulti, chatId }) => {
  return await api(
    `http://localhost:3000/api/chats?id=${id}&chatId=${chatId}&isMulti=${isMulti}`,
    {},
    "Failed to fetch chats"
  );
};

export const createNewRoom = async (id) => {
  return await api(
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
  return await api(
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
  return await api(
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
  return await api(
    `http://localhost:3000/api/chats`,
    {},
    "Failed to find chat rooms"
  );
};
