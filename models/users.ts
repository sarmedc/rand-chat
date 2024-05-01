import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  role: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
