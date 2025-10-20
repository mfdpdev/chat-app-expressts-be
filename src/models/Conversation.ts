import mongoose, { Schema } from "mongoose";

const conversationSchema: Schema = new Schema({
  participants: { type: [String], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
