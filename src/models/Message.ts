import mongoose, { Schema } from "mongoose";

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

// const messageSchema: Schema = new Schema({
//   conversationId: { type: String, required: true },
//   senderId: { type: String, required: true },
//   content: { type: String, required: true },
//   readStatus: { type: String, enum: MessageStatus, default: MessageStatus.SENT }
// }, {
//   timestamps: true
// });

const messageSchema: Schema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
