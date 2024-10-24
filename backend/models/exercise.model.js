// import mongoose from 'mongoose';
// const exerciseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, required: true }, // e.g., "Warm-up", "Primary", "Secondary", "Cooldown"
//   equipment_need: { type: String, required: true }, // e.g., "None", "Barbell", "Dumbbell"
//   body_part_target: [{ type: String, required: true }], // e.g., ["Legs", "Glutes"]
//   repetitions: { type: String, required: true }, // e.g., "3 sets of 12 reps"
//   instruction: { type: String, required: true }, // brief instruction for the exercise
//   common_mistakes: [{ type: String, required: true }], // list of common mistakes
//   media_url: { type: String, required: true }, // e.g., "https://example.com/exercise.gif"
// });

// // You can define a custom method to find exercises based on filters.
// exerciseSchema.statics.findByTypeAndEquipment = function (type, equipment, callback) {
//   return this.find({ type: type, equipment_need: equipment }, callback);
// };

// const Exercise = mongoose.model('Exercise', exerciseSchema);

// export default Exercise;


import mongoose from 'mongoose';

const exercisePlanSchema = new mongoose.Schema({
  lowerBodyExercisePlan: Object, // Define schema for different exercise plans
  fullBodyExercisePlan: Object,
  upperBodyExercisePlan: Object,
  backPainReliefExercisePlan: Object,
  absExercisePlan:Object,
  kneePainReliefExercisePlan:Object,

  // Add more plans as needed
});

const ExercisePlan=mongoose.model('ExercisePlan', exercisePlanSchema);

export default ExercisePlan;
