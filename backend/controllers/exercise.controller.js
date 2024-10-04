// import Exercise from '../models/exercise.model.js'; // Import the Exercise model

import ExercisePlan from '../models/exercise.model.js'; // Import the ExercisePlan model

export const getExercisePlan = async (req, res) => {
  const { exercisePlanName } = req.query; // Get the exercise plan name from query params
  console.log(exercisePlanName)
  try {
    // Assuming each document has keys like lowerBodyExercisePlan, fullBodyExercisePlan, etc.
    const exercisePlan = await ExercisePlan.findOne({ [exercisePlanName]: { $exists: true } }); // Search for a plan by the key

    if (exercisePlan && exercisePlan[exercisePlanName]) {
      // Return the specific exercise plan by key
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
    const { targetedArea, equipmentAvailable, difficulty } = req.body;
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
        

        Format:
        {
            "warmUp": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes in array", "reps": "Based on difficulty" } ],
            "primary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "secondary": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ],
            "coolDown": [ { "name": "Exercise", "instruction": "Brief instruction", "common_mistakes": "3 mistakes", "reps": "Based on difficulty" } ]
        }
        
        Provide 1 warm-up, 3 primary, 2 secondary, and 1 cooldown exercise. Only return the JSON and nothing else.
        **If Equipment: None or  empty, ensure that all exercises suggested do not require any equipment.**

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


