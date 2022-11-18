import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  iat: {
    default: Date.now(),
    type: Number,
  },
});

export const User = mongoose.model("User", UserSchema);
