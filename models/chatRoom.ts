import mongoose, { Schema } from "mongoose";

const chatRoomSchema = new Schema({
  users: [String],
  messages: [{ user: String, message: String, timestamp: Date }],
});

const ChatRoom =
  mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
