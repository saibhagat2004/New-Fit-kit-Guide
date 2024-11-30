// import Exercise from '../models/exercise.model.js'; // Import the Exercise model

import ExercisePlan from '../models/exercise.model.js'; // Import the ExercisePlan model

export const getExercisePlan = async (req, res) => {
  const { exercisePlanName } = req.query; // Get the exercise plan name from query params
  console.log(exercisePlanName)
  try {
    // Assuming each document has keys like lowerBodyExercisePlan, fullBodyExercisePlan, etc.
    const exercisePlan = await ExercisePlan.findOne({ [exercisePlanName]: { $exists: true } }); // Search for a plan by the key
    console.log(exercisePlan)
    console.log({ [exercisePlanName]: { $exists: true } });
    console.log( exercisePlan[exercisePlanName])
    if (exercisePlan) {
      console.log(Object.keys(exercisePlan)); // Logs the keys of the exercisePlan object
    }
    console.log(exercisePlan.absExercisePlan); // Directly check for the property

    if (exercisePlan && exercisePlan[exercisePlanName]) {
      // Return the specific exercise plan by key'
      // console.log(exercisePlan[exercisePlanName])
      res.status(200).json(exercisePlan[exercisePlanName]);
    } else {
      res.status(404).json({ message: "Exercise Plan Not Found" });
    }
  } catch (error) {
    console.error("Error in getExercisePlan controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



import { GoogleGenerativeAI } from "@google/generative-ai";

export const FilterExercise = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Destructure values from req.body and ensure they are arrays
    console.log(req.body)
    const { targetedArea, equipmentAvailable, difficulty, age } = req.body;
    console.log(targetedArea, equipmentAvailable, difficulty)

    // Validate that targetedArea and equipmentAvailable are arrays
    if (!Array.isArray(targetedArea) || !Array.isArray(equipmentAvailable)) {
      return res.status(400).json({ error: "targetedArea and equipmentAvailable should be arrays." });
    }
    const prompt = `
        You are a fitness assistant. Generate an exercise plan in JSON format using these parameters:
        - Targeted Body Parts: ${JSON.stringify(targetedArea)}
        - Equipment: ${JSON.stringify(equipmentAvailable)}
        - Difficulty: ${JSON.stringify(difficulty)}
        - Age : ${JSON.stringify(age)}
         
        Suggest exercises based on the available equipment, including those that require the equipment and those that require no equipment. For users of older age, recommend exercises that are safe and minimize risk of injury due to weak bones.
        Format:
        {
            "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes in array", "reps": "Based on difficulty" } ],
            "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
        }
        
        Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON and nothing else.
        **If Equipment: None or No or  empty, ensure that all exercises suggested do not require any equipment.**
        
    `;

    // Generate content from the model
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found in the response.");
    }

    const jsonString = responseText.slice(jsonStart, jsonEnd);
    const exercisePlan = JSON.parse(jsonString);

    // Send the generated exercise plan to the client
    res.status(200).json(exercisePlan);

  } catch (error) {
    console.error("Error generating exercise plan:", error);
    res.status(500).json({ error: "Failed to generate exercise plan." });
  }
};



export const getAllExercises = async (req, res) => {
  try {
    // Fetch all documents from the ExercisePlan collection
    const exercisePlans = await ExercisePlan.find({}); 

    if (exercisePlans.length > 0) {
      // Return all exercise plans
      res.status(200).json(exercisePlans);
    } else {
      res.status(404).json({ message: "No Exercise Plans Found" });
    }
  } catch (error) {
    console.error("Error in getAllExercises controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



import UserActivity from '../models/userActivitySchema.model.js';

// Controller to handle storing exercise activity
const storeUserActivity = async (req, res) => {
  try {
    const { exercisePlanName, date, count } = req.body;

    // Ensure all fields are provided
    if (!exercisePlanName || !date || !count) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new UserActivity entry
    const newActivity = new UserActivity({
      exercisePlanName,
      date: new Date(date),  // Store as Date object
      count,
    });

    // Save the activity in the database
    await newActivity.save();

    return res.status(201).json({ message: 'Activity stored successfully' });
  } catch (error) {
    console.error('Error storing activity:', error);
    return res.status(500).json({ error: 'Server error while storing activity' });
  }
};

export { storeUserActivity };


const getUserActivities = async (req, res) => {
  try {
    const userActivities = await UserActivity.find({}, { date: 1 }); // Only return the date field
    res.status(200).json(userActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user activities.' });
  }
};

export { getUserActivities };

