import mongoose, { Schema } from "mongoose";

const conversationSchema: Schema = new Schema({
  participants: { type: [String], required: true },
}, {
  timestamps: true,
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
