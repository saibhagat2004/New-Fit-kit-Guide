import mongoose from 'mongoose';

const exercisePlanSchema = new mongoose.Schema({
  lowerBodyExercisePlan: Object, // Define schema for different exercise plans
  fullBodyExercisePlan: Object,
  upperBodyExercisePlan: Object,
  backPainReliefExercisePlan: Object,
  absExercisePlan:Object,
  kneePainReliefExercisePlan:Object,

});

const ExercisePlan=mongoose.model('ExercisePlan', exercisePlanSchema);

export default ExercisePlan;
