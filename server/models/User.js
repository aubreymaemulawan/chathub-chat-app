import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: String,
    username: String,
    photoURL: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
