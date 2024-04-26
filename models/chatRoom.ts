import mongoose, { Schema } from "mongoose";

const chatRoomSchema = new Schema({
  id: String,
  users: [String],
  messages: {
    type: mongoose.Schema.Types.Mixed, // Or mongoose.Schema.Types.Object
    default: {}, // Initialize as an empty object
  },
});

const ChatRoom =
  mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
