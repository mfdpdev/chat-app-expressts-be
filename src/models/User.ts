import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default: "default-profile.jpeg",
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

userSchema.virtual("profileImageUrl").get(function () {
  if (!this.profileImage) return null;

  const baseUrl = process.env.APP_URL || "http://localhost:8000";
  
  // Kalau masih default
  if (this.profileImage === "default-profile.jpeg") {
    return `${baseUrl}/images/default-profile.jpeg`;
  }

  // Kalau sudah upload custom
  return `${baseUrl}/uploads/profiles/${this.profileImage}`;
});

const User = mongoose.model('User', userSchema);
export default User;
