import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    favoriteExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "exercises-db" }],
    height: {
      type: Number, // Height in feet
      default: null,
    },
    weight: {
      type: Number, // Weight in kilograms
      default: null,
    },
    goal:{
      type: String,
      require:false,
      default: "Stay Fit"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
