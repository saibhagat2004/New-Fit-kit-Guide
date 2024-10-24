import  mongoose from 'mongoose'

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
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
