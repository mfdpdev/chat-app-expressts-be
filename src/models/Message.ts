import mongoose, { Schema } from "mongoose";

enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

const messageSchema: Schema = new Schema({
  conversation_id: { type: String, required: true },
  sender_id: { type: String, required: true },
  content: { type: String, required: true },
  sent_at: { type: Date, default: Date.now },
  read_status: { type: String, enum: MessageStatus, default: MessageStatus.SENT }
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
