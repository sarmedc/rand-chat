import { api } from "./helper";

export const getUser = async (email: String) => {
  return api(
    `http://localhost:3000/api/users/${email}`,
    {},
    "Failed to fetch user"
  );
};

export const addUser = async (user: {
  name: String;
  email: String;
  role: String;
}) => {
  return api(
    `http://localhost:3000/api/users`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    },
    "Failed to add user"
  );
};
