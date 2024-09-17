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
		dateOfBirth: {
			type: Date,
		},
		phoneNumber: {
			type: String,
		},
		
		lastLogin: {
			type: Date,
		},
		preferences: {
			theme: { type: String, enum: ["light", "dark"], default: "light" },
			notifications: { type: Boolean, default: true },
		},
		bio: {
			type: String,
			maxLength: 200,
		},
		socialLinks: {
			facebook: { type: String },
			twitter: { type: String },
			instagram: { type: String },
			linkedIn: { type: String },
		},
		favoriteExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "exercises-db" }],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
