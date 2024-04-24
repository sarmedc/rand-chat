import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  role: String,
  activeRooms: [String],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
