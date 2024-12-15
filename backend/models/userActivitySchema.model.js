

import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  exercisePlanName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;

