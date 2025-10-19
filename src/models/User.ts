import mongoose, { Schema } from "mongoose";

enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: UserStatus, default: UserStatus.OFFLINE },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
